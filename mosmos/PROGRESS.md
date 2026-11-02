# MosMos 片子：重建步骤

所有命令都在 `mosmos/` 目录下执行。

```bash
# 1. 时间线（画面和声音共用的唯一数据源）
python3 build/timeline.py && cp build/timeline.json remotion/src/

# 2. 配乐和音效 → audio/mix_raw.wav，然后限幅 + 两遍 loudnorm 到 -14 LUFS → audio/mix.wav
cd audio && python3 audio.py
ffmpeg -y -i mix_raw.wav -af "alimiter=limit=0.5:level=false,loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json" -f null - 2>&1 | sed -n '/{/,/}/p' > ln.json
python3 -c "import json,subprocess;j=json.load(open('ln.json'));subprocess.run(['ffmpeg','-y','-i','mix_raw.wav','-af',f\"alimiter=limit=0.5:level=false,loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true\",'-ar','48000','mix.wav'])"
cd ..

# 3. 画面
cd remotion && npm ci
node stills.mjs            # 每个镜头抽一张静帧做检查 → ../build/stills
npx remotion render src/index.ts Mosmos ../build/silent.mp4 --codec h264 --crf 17 --concurrency 7 --gl=swangle --muted
cd ..

# 4. 合成：混音、竖版（finish.sh 还会在本地生成一张镜头缩略图，仓库里不放）
build/finish.sh
python3 build/shotlist.py
```

注意：MosMos 的竖版（finish.sh 里生成）只是把横版居中，上下垫放大模糊的同一帧。MOSS Create 那部的竖版才是重新排版的。
