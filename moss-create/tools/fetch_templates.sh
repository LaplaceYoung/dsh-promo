#!/bin/bash
# Re-download the community template covers / preview clips the film uses, from the public home page.
# These are user-made works hosted by create.moss.cn and are NOT redistributed in this repo.
# The page embeds short-lived signed URLs, so this must be run fresh; templates rotate over time —
# if an id below is gone, pick another from covers/ and edit COVERS / PORT / the v/ ids in remotion/src/Film.tsx.
set -e
cd "$(dirname "$0")/.."
mkdir -p site remotion/public/c remotion/public/v /tmp/mc-tpl
curl -sL https://mossland.studio -o site/index.html          # 302 → https://create.moss.cn
grep -o 'https://img.mosi.cn/template/20[0-9]*/\(cover\|preview\)/[^"\\ ]*' site/index.html | sed 's/\\u0026/\&/g;s/&amp;/\&/g' | sort -u |
while read -r u; do
  n=$(echo "$u" | sed -E 's#.*/(cover|preview)/([a-z0-9]+)\.(png|jpg|mp4).*#\1_\2.\3#')
  curl -s -m 60 -o "/tmp/mc-tpl/$n" "$u" || true
done
for f in /tmp/mc-tpl/cover_*; do id=$(basename "$f" | sed -E 's/cover_([a-z0-9]+)\..*/\1/'); python3 -c "from PIL import Image;Image.open('$f').convert('RGB').save('remotion/public/c/$id.jpg',quality=90)" 2>/dev/null || echo "skip $f"; done
for f in /tmp/mc-tpl/preview_*.mp4; do id=$(basename "$f" .mp4 | sed 's/preview_//')
  ffmpeg -v error -y -i "$f" -an -vf "scale='if(gt(iw,ih),min(1600,iw),-2)':'if(gt(iw,ih),-2,min(1600,ih))'" -c:v libx264 -crf 18 -preset fast -g 24 -pix_fmt yuv420p "remotion/public/v/$id.mp4" || echo "skip $f"; done
rm -rf /tmp/mc-tpl
echo "covers: $(ls remotion/public/c | wc -l)  previews: $(ls remotion/public/v | wc -l)"
