from pathlib import Path
import json, urllib.request
root=Path(__file__).resolve().parents[1]
dest=root/'data'; dest.mkdir(exist_ok=True)
for locale in ['enUS','zhCN']:
    request=urllib.request.Request(f'https://api.hearthstonejson.com/v1/latest/{locale}/cards.json',headers={'User-Agent':'hearthstone-ai-coach/0.1'})
    with urllib.request.urlopen(request,timeout=90) as response:
        data=response.read(100*1024*1024+1)
    if len(data)>100*1024*1024: raise ValueError('Card data too large')
    cards=json.loads(data)
    if not isinstance(cards,list): raise ValueError('Expected cards array')
    (dest/f'cards.{locale}.json').write_bytes(data)
    print(locale, len(cards), 'cards cached')
