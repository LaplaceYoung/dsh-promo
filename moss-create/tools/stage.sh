#!/bin/bash
# Copy captured footage + screenshots into remotion/public after running the capture scripts.
set -e
cd "$(dirname "$0")/.."
mkdir -p remotion/public/f remotion/public/s
for c in home_chip gallery mossimage voice synth theme home_scroll; do cp "footage/$c.mp4" remotion/public/f/; done
cp site/r-auto-menu.png remotion/public/s/home-clean.png   # clean home page (record.mjs, home_auto clip)
cp site/p-agents.png site/p-synth.png site/p-home-dark.png remotion/public/s/   # pages.mjs
# s/menu.png (the Auto/专家/均衡/快速 menu) is committed: it was cropped from site/i-auto-menu.png at (586,212,876,454)
echo staged
