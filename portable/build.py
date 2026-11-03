from pathlib import Path
import shutil, subprocess
from datetime import datetime
root=Path(__file__).resolve().parents[1]
stage=root/'dist'/('hearthstone-ai-coach-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
stage.mkdir(parents=True)
for name in ['hearthstone-tracker','hearthstone-overlay','hearthstone-live-coach','hearthstone-post-game-coach','hearthstone-deck-builder','hearthstone-deck-recommender','hearthstone-deck-cleaner','docs','examples','tests','portable','runtime']:
    shutil.copytree(root/name,stage/name,ignore=shutil.ignore_patterns('__pycache__','*.log','config.json','node_modules'))
for name in ['Start-Panel.cmd','Start-Tracker.cmd','PORTABLE.md','README.md','LICENSE','hsdecks.py']:
    shutil.copy2(root/name,stage/name)
subprocess.run([str(stage/'runtime/python.exe'),'-c','import hslog,pydantic; print("Portable dependencies OK")'],check=True)
(stage/'data').mkdir(exist_ok=True)
for locale in ['enUS','zhCN']:
    cached=root/'data'/f'cards.{locale}.json'
    if cached.exists(): shutil.copy2(cached,stage/'data'/cached.name)
shutil.make_archive(str(root/'dist'/'hearthstone-ai-coach-windows-x64-zhCN'),'zip',stage.parent,stage.name)
print('Package created in dist (personal data and Git credentials excluded).')
