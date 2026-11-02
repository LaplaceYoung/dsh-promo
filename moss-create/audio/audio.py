# Original soundtrack + UI foley for the MOSS Create promo (fuller arrangement than MosMos). 110 BPM, all synthesized (numpy/scipy), no samples.
import os; ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # project root
import json, numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, fftconvolve
TL=json.load(open(ROOT+'/build/timeline.json'))
SR=48000; D=TL['end']+0.0; N=int(SR*D); rng=np.random.default_rng(23)
B=60/TL['bpm']; E8=B/2; BAR=4*B
T={s['id']:s for s in TL['shots']}
mus=np.zeros((N,2)); fx=np.zeros((N,2))
def add(buf,sig,t,g=1.0,pan=0.0):
    i=int(round(t*SR)); 
    if i>=N: return
    if sig.ndim==1: sig=np.stack([sig*(1-max(pan,0)),sig*(1+min(pan,0))],1)
    n=min(len(sig),N-i); 
    if i<0: sig=sig[-i:]; n=min(len(sig),N); i=0
    buf[i:i+n]+=sig[:n]*g
def env(n,a,d): t=np.arange(n)/SR; return np.minimum(t/max(a,1e-5),1)*np.exp(-t/d)
lp=lambda x,f,o=2: sosfilt(butter(o,f,'lp',fs=SR,output='sos'),x)
hp=lambda x,f,o=2: sosfilt(butter(o,f,'hp',fs=SR,output='sos'),x)
bp=lambda x,a,b,o=2: sosfilt(butter(o,[a,b],'bp',fs=SR,output='sos'),x)
def kick(g=1.0):
    n=int(0.42*SR); t=np.arange(n)/SR; f=46+150*np.exp(-t*34); ph=2*np.pi*np.cumsum(f)/SR
    return np.tanh(1.8*np.sin(ph)*env(n,0.0008,0.17))*g + bp(rng.standard_normal(n),2000,6000)*env(n,0.0002,0.004)*0.3
def clap():
    n=int(0.3*SR); x=bp(rng.standard_normal(n),900,4200); e=np.zeros(n)
    for k,o in enumerate([0,0.009,0.019,0.028]): i=int(o*SR); e[i:]+=env(n-i,0.0003,0.01 if k<3 else 0.11)
    return x*e*1.1
def hat(op=False):
    n=int((0.25 if op else 0.07)*SR); x=hp(rng.standard_normal(n),7500,4); return x*env(n,0.0004,0.09 if op else 0.014)*0.45
def saw(f,n,det=0.0):
    t=np.arange(n)/SR; out=0
    for d in (-det,0,det): ph=(f*(1+d)*t)%1; out=out+(2*ph-1)
    return out/3
def bass(f,dur):
    n=int(dur*SR); x=saw(f,n,0.004)*0.7+np.sin(2*np.pi*f*np.arange(n)/SR)*0.6
    dk=np.exp(-np.arange(n)/SR*18); x=lp(x,1300)*dk+lp(x,360)*(1-dk); return np.tanh(1.4*x)*env(n,0.003,dur*0.8)*0.55
def pluck(f,dur=0.3):
    n=int(dur*SR); x=saw(f,n,0.006); dk=np.exp(-np.arange(n)/SR*25); x=lp(x,5500)*dk+lp(x,1800)*(1-dk); return x*env(n,0.002,0.12)*0.28
def pad(freqs,dur,bright=1200):
    n=int(dur*SR); t=np.arange(n)/SR; x=0
    for f in freqs: x=x+saw(f,n,0.008)
    x=lp(x/len(freqs),bright); e=np.minimum(t/0.6,1)*np.clip((dur-t)/0.8,0,1); return x*e*0.22
def noise_riser(dur,f0=300,f1=9000):
    n=int(dur*SR); x=rng.standard_normal(n); out=np.zeros(n); blk=1024
    for b in range(0,n,blk):
        p=b/n; fc=f0*(f1/f0)**p; out[b:b+blk]=bp(x[b:b+blk],max(fc*0.5,40),min(fc*1.5,20000))
    return out*np.linspace(0,1,n)**2*0.5
IR_n=int(2.2*SR); IR=rng.standard_normal((IR_n,2))*np.exp(-np.arange(IR_n)/SR/0.55)[:,None]; IR/=np.abs(IR).sum(0)*0.04
def verb(x,mix=0.3):
    if x.ndim==1: x=np.stack([x,x],1)
    w=np.stack([fftconvolve(x[:,c],IR[:,c])[:len(x)+IR_n//2] for c in (0,1)],1)
    out=np.zeros_like(w); out[:len(x)]+=x*(1-mix); out+=w*mix; return out
# --- harmony: Am F C G (A minor), one chord per bar
ROOTS=[43.65,49.0,41.2,55.0]; CH=[[174.6,220,261.6,329.6],[196,246.9,293.7,392],[164.8,196,246.9,329.6],[220,261.6,329.6,392]]
ARP=[[349.2,440,523.3,659.3],[392,493.9,587.3,784],[329.6,392,493.9,659.3],[440,523.3,659.3,784]]
def chord(t): return int(np.floor(t/BAR))%4
KPAT=[0,3,6]          # 3-3-2 kick on eighths
BPAT=[(0,3),(3,3),(6,2)]
def groove(a,b,arp=True,full=True,clapg=0.7):
    k0=int(np.ceil(a/E8-1e-6)); k1=int(np.floor(b/E8-1e-6))
    for k in range(k0,k1+1):
        t=k*E8; pos=k%8; c=chord(t)
        if pos in KPAT: add(mus,kick(),t,0.95)
        for p,l in BPAT:
            if pos==p: add(mus,bass(ROOTS[c],l*E8*0.95),t,0.8)
        if pos in (2,6): add(mus,clap(),t,clapg)
        if full: add(mus,hat(),t+E8/2,0.5,0.25); add(mus,hat(),t,0.22,-0.25)
        if full and pos==7: add(mus,hat(True),t+E8/2,0.25,0.3)
        if arp:
            for h in (0,1):
                n=ARP[c][(k*2+h)%4]
                add(mus,pluck(n),t+h*E8/2,0.55,0.35 if (k+h)%2 else -0.35)
def halftime(a,b):
    k0=int(np.ceil(a/E8-1e-6)); k1=int(np.floor(b/E8-1e-6))
    for k in range(k0,k1+1):
        t=k*E8; pos=k%16; c=chord(t)
        if pos in (0,6,10): add(mus,kick(0.9),t,0.9)
        if pos in (8,): add(mus,clap(),t,0.75)
        if pos in (0,6,10): add(mus,bass(ROOTS[c],5*E8*0.9 if pos==0 else 3*E8),t,0.65)
        add(mus,hat(),t,0.18 if k%2 else 0.3,0.2)
        if pos%4==0:
            n=ARP[c][(k//4)%4]; add(mus,pluck(n*0.5,0.6),t,0.5,-0.2)

def sub(f,dur):
    n=int(dur*SR); t=np.arange(n)/SR; return np.sin(2*np.pi*f*t)*env(n,0.004,dur*0.9)*0.5
def shaker():
    n=int(0.06*SR); x=bp(rng.standard_normal(n),5000,12000); t=np.arange(n)/SR; return x*np.minimum(t/0.012,1)*np.exp(-t/0.02)*0.3
def tom(f=110):
    n=int(0.35*SR); t=np.arange(n)/SR; return np.tanh(1.5*np.sin(2*np.pi*np.cumsum(f+f*0.8*np.exp(-t*25))/SR)*env(n,0.001,0.14))*0.8
def crash(dur=2.2):
    n=int(dur*SR); x=hp(rng.standard_normal(n),3500,2); return x*env(n,0.001,0.6)*0.35
def lead(f,dur):
    n=int(dur*SR); t=np.arange(n)/SR; vib=1+0.004*np.sin(2*np.pi*5.5*t)*np.minimum(t/0.25,1)
    ph=np.cumsum(f*vib)/SR; x=(np.sign(np.sin(2*np.pi*ph))*0.5+ (2*(ph%1)-1)*0.5)
    dk=np.exp(-t*6); x=lp(x,4000)*dk+lp(x,2400)*(1-dk); return x*env(n,0.01,dur*0.7)*np.clip((dur-t)/0.05,0,1)*0.16
# 2-bar hook in C/A minor over F G Em Am (eighth index, semitone from A4=440, length in eighths)
HOOK=[(0,-2,2),(2,0,1),(3,3,2),(5,0,1),(6,-2,2),(8,-4,3),(11,-2,1),(12,-5,2),(14,-4,2),
      (16,-2,2),(18,0,1),(19,3,2),(21,5,1),(22,3,2),(24,0,3),(27,-2,1),(28,0,4)]
def hook(a,b,g=1.0,oct=1.0):
    t=np.ceil(a/(2*BAR))*2*BAR
    while t+2*BAR<=b+1e-6:
        for k,st,l in HOOK:
            tt=t+k*E8
            if tt<b: add(mus,lead(440*oct*2**(st/12),l*E8*0.92),tt,g,0.12)
        t+=2*BAR
def perc(a,b,g=1.0):
    k0=int(np.ceil(a/(E8/2)-1e-6)); k1=int(np.floor(b/(E8/2)-1e-6))
    for k in range(k0,k1+1): add(mus,shaker(),k*E8/2,g*(0.55 if k%2 else 0.3),0.35*(1 if k%4<2 else -1))
def subline(a,b,g=1.0):
    t=np.floor(a/BAR)*BAR
    while t<b:
        s0=max(t,a); e=min(t+BAR,b); add(mus,sub(ROOTS[chord(t+0.01)],e-s0),s0,g); t+=BAR
def fill(t_end,g=0.8):
    for i,f in enumerate([180,150,120,95]): add(mus,tom(f),t_end-(4-i)*E8/2,g)
# --- sections
pads=np.zeros((N,2))
def padsec(a,b,bright=1200,g=1.0):
    t=np.floor(a/BAR)*BAR
    while t<b:
        s=max(t,a); e=min(t+BAR,b); c=chord(t+0.01)
        add(pads,pad(CH[c],e-s+0.6,bright),s,g)
        t+=BAR
padsec(0.3,6.0,700,1.1)
add(mus,bass(ROOTS[0]/2,3.0)*0.6,0.55,0.7)
add(mus,kick(),TL['typing'][0]['t0'],0.7)              # pickup under 「认识一下」
add(mus,noise_riser(1.3),6.0-1.3,0.6)
groove(6.0,T['agents']['t0']-1e-3)
padsec(6.0,T['agents']['t0'],1400,0.55)
halftime(T['agents']['t0'],T['typedel']['t0']-1e-3)
padsec(T['agents']['t0'],T['typedel']['t0'],900,0.9)
# build: snare roll into orbit impact, then riser into montage
a=T['typedel']['t0']; b=T['orbit']['t0']
for k in range(int(np.ceil(a/E8)),int(np.floor(b/E8))):
    t=k*E8; add(mus,kick(0.7),t,0.6) if k%2==0 else None
for i,t in enumerate(np.arange(b-BAR/2,b,E8/2)): add(mus,clap(),t,0.25+0.5*i/16)
add(mus,noise_riser(T['typedel']['t1']-a,200,8000),a,0.7)
padsec(a,b,600+0,0.8)
add(mus,noise_riser(T['orbit']['t1']-b,400,12000),b,0.8)
padsec(b,T['orbit']['t1'],2000,0.7)
groove(T['m1']['t0'],T['tagline']['t0']-1e-3,clapg=0.8)
padsec(T['m1']['t0'],T['tagline']['t0'],2200,0.6)
# tagline: thin out — pad + soft pulse only
padsec(T['tagline']['t0'],T['outro']['t0']+0.5,800,1.0)
for k in range(int(np.ceil(T['tagline']['t0']/B)),int(np.floor(T['tagline']['t1']/B))): add(mus,lp(kick(0.5),300),k*B,0.45)
# outro: final chord swell
add(pads,pad([220,277.2,329.6,440],3.4,1600),T['outro']['t0'],1.1)

G0,G1=6.0,T['agents']['t0']; H0,H1=T['agents']['t0'],T['typedel']['t0']; M0,M1=T['m1']['t0'],T['tagline']['t0']
perc(G0+BAR,G1,0.9); perc(M0,M1,1.0); perc(H0,H1,0.45)
subline(G0,G1,0.8); subline(H0,H1,0.9); subline(M0,M1,0.9)
hook(T['card2']['t0'],G1,0.9); hook(M0,M1,1.0,2.0)
for tt in (G0,T['card2']['t0'],T['q_more']['t0'],H0,M0): add(mus,crash(),tt,0.5)
for tt in (T['card2']['t0'],T['q_more']['t0'],H0,M0): fill(tt,0.7)
# sidechain pump on pads from every kick time (3-3-2 in groove, half-time in H)
pump=np.ones(N)
def duck(t,depth=0.6,rel=0.22):
    i=int(t*SR); n=int(rel*SR*1.5); 
    if i>=N: return
    c=1-depth*np.exp(-np.arange(min(n,N-i))/SR/rel*2.2); pump[i:i+len(c)]=np.minimum(pump[i:i+len(c)],c)
for a,b,pat,L in ((G0,G1,(0,3,6),8),(M0,M1,(0,3,6),8),(H0,H1,(0,6,10),16)):
    for k in range(int(np.ceil(a/E8)),int(np.floor(b/E8))+1):
        if k%L in pat: duck(k*E8)
pads*=pump[:,None]
# stereo widen pads (Haas 12 ms on right)
d=int(0.012*SR); pads[d:,1]=0.6*pads[d:,1]+0.4*pads[:-d,1]
mus+=pads
mus=verb(mus,0.18)[:N]
# --- foley
def key():
    n=int(0.045*SR); x=bp(rng.standard_normal(n),1800+rng.uniform(-300,500),7000); t=np.arange(n)/SR
    body=np.sin(2*np.pi*rng.uniform(380,520)*t)*env(n,0.0003,0.006)
    return (x*env(n,0.0002,0.0045)*1.3+body*0.6)
def bksp():
    n=int(0.05*SR); x=bp(rng.standard_normal(n),1100,5000); return x*env(n,0.0002,0.006)*1.3
def click():
    n=int(0.05*SR); t=np.arange(n)/SR; x=bp(rng.standard_normal(n),2000,8000)*env(n,0.0001,0.003)*2
    return x+np.sin(2*np.pi*3100*t)*env(n,0.0002,0.005)*0.5
def keycap():
    n=int(0.12*SR); t=np.arange(n)/SR; body=np.sin(2*np.pi*(180+120*np.exp(-t*60))*t)*env(n,0.0005,0.03)
    return body*0.9+bp(rng.standard_normal(n),900,5000)*env(n,0.0002,0.008)*1.2
def swish(dur=0.42):
    n=int(dur*SR); x=rng.standard_normal(n); out=np.zeros(n); blk=512
    for b in range(0,n,blk):
        p=b/n; fc=800+5000*np.sin(np.pi*p); out[b:b+blk]=bp(x[b:b+blk],fc*0.6,min(fc*1.6,20000))
    return out*np.sin(np.pi*np.linspace(0,1,n))**2*0.9
def glitch():
    n=int(0.16*SR); x=rng.standard_normal(n); step=int(SR/900); x=np.repeat(x[::step],step)[:n]
    x=np.round(x*3)/3; return bp(x,300,9000)*env(n,0.001,0.06)*0.8
def pop():
    n=int(0.1*SR); t=np.arange(n)/SR; return np.sin(2*np.pi*(600+900*np.exp(-t*50))*t)*env(n,0.0005,0.03)*0.8
def bell(f,dur=2.5,idx=2.0):
    n=int(dur*SR); t=np.arange(n)/SR; m=np.sin(2*np.pi*f*1.4*t)*idx*np.exp(-t*3)
    return np.sin(2*np.pi*f*t+m)*env(n,0.001,0.7)
def impact():
    n=int(1.8*SR); t=np.arange(n)/SR; boom=np.sin(2*np.pi*np.cumsum(34+110*np.exp(-t*10))/SR)*env(n,0.001,0.55)
    nz=lp(rng.standard_normal(n),3000)*env(n,0.001,0.22)*0.6; return np.tanh(1.4*(boom+nz))
def hit():
    n=int(0.3*SR); t=np.arange(n)/SR; return np.tanh(2*np.sin(2*np.pi*(90+200*np.exp(-t*40))*t)*env(n,0.0005,0.08))*0.8+bp(rng.standard_normal(n),1500,6000)*env(n,0.0002,0.02)*0.5
def tick():
    n=int(0.03*SR); return hp(rng.standard_normal(n),5000)*env(n,0.0002,0.004)*0.6
for e in TL['events']:
    k,t,g=e['kind'],e['t'],e['g']
    if g<=0: continue
    pan=rng.uniform(-0.25,0.25)
    if k=='key': add(fx,key(),t,0.55*g,pan)
    elif k=='bksp': add(fx,bksp(),t,0.55*g,pan)
    elif k=='click': add(fx,click(),t,0.7*g,0.15)
    elif k=='keycap': add(fx,keycap(),t,0.9*g)
    elif k=='swish': add(fx,swish(),t-0.12,0.55*g)
    elif k=='glitch': add(fx,glitch(),t,0.6*g)
    elif k=='pop': add(fx,pop(),t,0.5*g)
    elif k=='chime': add(fx,verb(bell(1318.5,1.2,1.0)*0.25,0.4)[:int(1.2*SR)],t,g)
    elif k=='impact': add(fx,impact(),t,0.75*g)
    elif k=='hit': add(fx,hit(),t,0.6*g)
    elif k=='select': add(fx,click(),t,0.6*g)
    elif k=='ding': add(fx,verb(bell(1046.5,3.0,1.6)*0.55+bell(2093,3.0,0.8)*0.15,0.45)[:int(3.0*SR)],t,g)
    elif k=='cut': add(fx,tick(),t,0.25*g)
mix=mus*0.62+fx*2.2
fade=np.ones(N); nf=int(0.7*SR); fade[-nf:]=np.linspace(1,0,nf)**1.5; mix*=fade[:,None]
mix=np.tanh(mix*0.9); mix/=np.max(np.abs(mix))/0.9
wavfile.write(ROOT+'/audio/mix_raw.wav',SR,(mix*32767).astype(np.int16))
print('ok',D)
