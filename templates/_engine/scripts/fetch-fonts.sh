#!/bin/bash
# Installs the open CJK fonts used from template 13 on (SIL Open Font License 1.1, Google Fonts):
# Noto Sans SC and Noto Serif SC variable fonts (weights 100–900 / 200–900). Not stored in the repo.
set -e
D=${FONT_DIR:-$HOME/.local/share/fonts/oflcjk}; mkdir -p "$D"
[ -s "$D/NotoSansSC-VF.ttf" ] || curl -sL -o "$D/NotoSansSC-VF.ttf" "https://github.com/google/fonts/raw/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf"
[ -s "$D/NotoSerifSC-VF.ttf" ] || curl -sL -o "$D/NotoSerifSC-VF.ttf" "https://github.com/google/fonts/raw/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf"
fc-cache -f "$D" >/dev/null && fc-list | grep -c "Noto S[a-z]* SC" | xargs echo "fonts installed:"
