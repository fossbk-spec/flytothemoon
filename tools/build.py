"""Build index.html from src/index.src.html + src/assets.json (inlines {{ASSET:n}} data URIs)."""
import re, json
src = open('src/index.src.html', encoding='utf8', newline='').read()
assets = json.load(open('src/assets.json', encoding='utf8'))
out = re.sub(r'\{\{ASSET:(\d+)\}\}', lambda m: assets[int(m.group(1))], src)
open('index.html', 'w', encoding='utf8', newline='').write(out)
print('built index.html', len(out))
