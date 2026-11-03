# Windows x64 便携版

双击 Start-Panel.cmd 打开浏览器面板，保持窗口运行。
双击 Start-Tracker.cmd，输入炉石安装目录下 Logs 文件夹的完整路径。需要先开启 Power 和 Decks 日志并重新启动炉石。
运行时数据保存在 data 文件夹；迁移整个解压目录即可保留数据。发布包默认不包含 data、密钥或 Git 凭据。

程序包含 Python 3.12 和已安装依赖，无需安装 Python、Node 或 WSL。适用于兼容 Python 3.12 的 Windows x64。浏览器正常使用需要系统提供浏览器；首次卡牌数据及卡图下载需要网络。

AI 教练需要另行连接能读取项目及运行命令的 AI 助手，参考 hearthstone-live-coach/SKILL.md。面板本身不自动调用 AI。Jev 可选，通过环境变量 TYPESAFE_API_KEY 配置，不要写入发布包。

开发目录重新打包：runtime\python.exe portable\build.py。打包不会包含 .git；开发仓库仍以 Alpherg951 分叉库为 origin。

验证命令：runtime\python.exe -m unittest discover -s tests


## 中文版

界面默认简体中文，在建议面板底部可切换 English。选择保存在 data/overlay/settings.json，迁移整个目录可保留。Electron 鼠标穿透时先按 Ctrl+Shift+F 解锁操作。

便携包带有官方 enUS 和 zhCN 卡牌缓存，通过卡牌 ID 对应中文名称和描述。中文描述可在卡牌名称上悬停查看。缺少中文时回退英文；日志与内部规则继续使用英文标识。历史英文经验不自动翻译。

AI 助手应重新阅读 hearthstone-live-coach/SKILL.md 或 hearthstone-post-game-coach/SKILL.md，新增建议与复盘默认输出中文。界面切换只影响面板，教练会话语言请直接向 AI 指定；不会自动重写之前的建议。原始程序日志、底层诊断和命令参数仍保留英文。

刷新卡牌缓存：runtime\python.exe portable\prepare_cards.py（需要网络）。
重新打包：runtime\python.exe portable\build.py，每次生成新的暂存目录并更新 dist/hearthstone-ai-coach-windows-x64-zhCN.zip。发布包只包含公开卡牌缓存，不包含个人战绩、经验或 API 密钥。

验证：Python 测试从项目根目录运行；界面测试在 hearthstone-overlay 中运行 node --test。
