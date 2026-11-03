#!/bin/bash
# Installs the open CJK fonts used from template 13 on (SIL Open Font License 1.1, Google Fonts):
# Noto Sans SC and Noto Serif SC variable fonts (weights 100–900 / 200–900). Not stored in the repo.
set -e
D=${FONT_DIR:-$HOME/.local/share/fonts/oflcjk}; mkdir -p "$D"
[ -s "$D/NotoSansSC-VF.ttf" ] || curl -sL -o "$D/NotoSansSC-VF.ttf" "https://github.com/google/fonts/raw/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf"
[ -s "$D/NotoSerifSC-VF.ttf" ] || curl -sL -o "$D/NotoSerifSC-VF.ttf" "https://github.com/google/fonts/raw/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf"
# Fusion Pixel 12px (zh_hans, SIL OFL 1.1, github.com/TakWolf/fusion-pixel-font) — pixel lettering from template 46 on.
FP=fusion-pixel-12px-proportional-zh_hans.otf
[ -s "$D/$FP" ] || { curl -sL -o /tmp/fp12.zip "https://github.com/TakWolf/fusion-pixel-font/releases/download/2026.10.25/fusion-pixel-font-12px-proportional-otf-v2026.10.25.zip" && unzip -o -q -j /tmp/fp12.zip "$FP" -d "$D" && rm -f /tmp/fp12.zip; }
fc-cache -f "$D" >/dev/null && fc-list | grep -c -E "Noto S[a-z]* SC|Fusion Pixel" | xargs echo "fonts installed:"
