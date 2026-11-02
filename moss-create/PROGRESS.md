# MOSS Create 片子：重建步骤

所有命令都在 `moss-create/` 目录下执行。先按 `assets/README.md` 把录屏、截图和模板素材抓回来，仓库里没带这些。

```bash
# 0. 抓素材（不登录，只访问公开页面）
cd tools && npm i && npx playwright install chromium
node pages.mjs && node interact.mjs && node texts.mjs   # 截图和页面文字 → ../site/
node record.mjs                                         # 录屏 → ../footage/（ONLY=gallery node record.mjs 只录一段）
cd .. && tools/fetch_templates.sh && tools/stage.sh

# 1. 时间线
python3 build/timeline.py && cp build/timeline.json remotion/src/

# 2. 配乐和音效（同 MosMos 的两遍 loudnorm）
cd audio && python3 audio.py
ffmpeg -y -i mix_raw.wav -af "alimiter=limit=0.5:level=false,loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json" -f null - 2>&1 | sed -n '/{/,/}/p' > ln.json
python3 -c "import json,subprocess;j=json.load(open('ln.json'));subprocess.run(['ffmpeg','-y','-i','mix_raw.wav','-af',f\"alimiter=limit=0.5:level=false,loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true\",'-ar','48000','mix.wav'])"
cd ..

# 3. 画面：横版 Moss（1920×1080）和竖版 MossV（1080×1920），每个约 7 分钟
cd remotion && npm i
node stills.mjs && COMP=MossV node stills.mjs
npx remotion render src/index.ts Moss  ../build/silent.mp4  --codec h264 --crf 17 --concurrency 7 --gl=swangle --muted
npx remotion render src/index.ts MossV ../build/silentV.mp4 --codec h264 --crf 18 --concurrency 7 --gl=swangle --muted
cd ..

# 4. 合成（设置 REF_VIDEO=参考片路径 时会额外生成左右对比视频）
build/finish.sh
python3 build/shotlist.py
python3 build/qa.py build/stills /tmp/qa 4    # 静帧拼图检查
```
