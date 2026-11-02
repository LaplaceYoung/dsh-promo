#!/usr/bin/env python3
"""register.py NN-slug — add a template's Film + meta to src/Root.tsx (idempotent)."""
import sys, os, json, re
E = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); slug = sys.argv[1]; n = slug[:2]
p = f'{E}/src/Root.tsx'; s = open(p).read()
if f'as F{n} ' in s: sys.exit(0)
imp = f'import {{ Film as F{n} }} from "../../{slug}/Film"\nimport M{n} from "../../{slug}/meta.json"\n'
s = s.replace('\nconst T = [', '\n' + imp + '\nconst T = [', 1).replace('\n\n' + imp, '\n' + imp)
s = re.sub(r'\] as const', f', [F{n}, M{n}]] as const', s, 1)
open(p, 'w').write(s)
