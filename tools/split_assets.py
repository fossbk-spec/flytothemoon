"""One-off: split index.html into src/index.src.html (assets replaced by {{ASSET:n}}) + src/assets.json."""
import re, json, sys
s = open('index.html', encoding='utf8', newline='').read()
pat = re.compile(r'data:[a-z/+\-]+;base64,[A-Za-z0-9+/=]{200,}')
assets = []
def sub(m):
    u = m.group()
    if u not in assets: assets.append(u)
    return '{{ASSET:%d}}' % assets.index(u)
out = pat.sub(sub, s)
open('src/index.src.html', 'w', encoding='utf8', newline='').write(out)
json.dump(assets, open('src/assets.json', 'w', encoding='utf8'))
print(len(out), len(assets))
