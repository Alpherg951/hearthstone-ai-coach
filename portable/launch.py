import os, sys, subprocess, webbrowser
from pathlib import Path
root=Path(__file__).resolve().parents[1]
data=root/'data'; data.mkdir(exist_ok=True)
os.environ['PYTHONPATH']=str(root/'hearthstone-tracker')
os.environ['HS_OVERLAY_DIR']=str(data/'overlay')
os.environ['HS_COACH_GATED']='1'
os.environ.setdefault('HS_LOCALE', 'zhCN')
os.environ['HS_CARD_LOCALE_FILE']=str(data/'cards.zhCN.json')
os.environ['HS_CARD_EN_FILE']=str(data/'cards.enUS.json')
mode=sys.argv[1] if len(sys.argv)>1 else 'panel'
if mode=='panel':
    webbrowser.open('http://localhost:8420')
    args=[str(root/'hearthstone-overlay/serve.py'),'--overlay-dir',str(data/'overlay')]
elif mode=='live':
    logs=sys.argv[2] if len(sys.argv)>2 else input('请输入炉石 Logs 文件夹完整路径： ').strip().strip(chr(34))
    if not Path(logs).is_dir(): raise SystemExit('日志文件夹不存在，请检查路径。')
    args=['-m','hstracker','--db',str(data/'games.db'),'live','--logs-root',logs,'--json-file',str(data/'live.json'),'--overlay-dir',str(data/'overlay')]
else:
    args=['-m','hstracker','--db',str(data/'games.db')]+sys.argv[1:]
raise SystemExit(subprocess.call([sys.executable]+args,env=os.environ))
