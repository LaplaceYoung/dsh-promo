#!/usr/bin/env bash
# loudnorm.sh in.wav out.wav [target_LUFS]  — -14 LUFS (±0.5 LU) and <= -1.5 dBTP measured after AAC encoding (see master.py)
set -euo pipefail
python3 "$(dirname "$0")/master.py" "$1" "$2" "${3:--14}"
