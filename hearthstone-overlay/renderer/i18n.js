(function(root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.OverlayI18n = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  const zh = {"Mulligan (Jev)":"起手留牌（Jev）", "cost last time: ":"上次代价：", "LIVE COACH": "实时教练", "Waiting for live coach": "等待教练连接", "turn —": "回合 —", "Start <code>hst live</code> and publish advice to populate this panel.": "启动追踪器并连接 AI 教练后显示建议。", "Advice may be stale — waiting for current-turn instructions.": "建议可能已过期，正在等待本回合建议。", "loading…": "加载中…", "click-through": "鼠标穿透", "Deck left": "剩余牌库", "No deck list yet.": "暂无卡组信息。", "OPPONENT": "对手", "— in hand · — in deck": "手牌 — · 牌库 —", "Played / revealed": "已打出 / 已揭示", "No reveals yet.": "暂无已揭示卡牌。", "Coaching lessons": "对局经验", "No lessons recorded yet.": "暂无经验记录。", "Deck stats": "卡组战绩", "No games recorded yet.": "暂无对局记录。", "Who answers mulligans and Discovers (click to change; Ctrl+Shift+J in the app)": "留牌与发现建议来源（点击切换；应用内 Ctrl+Shift+J）", "Who answers mulligans and Discovers: Jev / Coach / Both / Off (Ctrl+Shift+J)": "建议来源：Jev / 教练 / 两者 / 关闭（Ctrl+Shift+J）", "Move / lock panels (Ctrl+Shift+F)": "移动 / 锁定面板（Ctrl+Shift+F）", "Quit overlay": "退出面板", "generated / shuffled": "生成 / 洗入", "LETHAL": "斩杀", "Do this now": "当前行动建议", "Waiting for the current turn plan.": "等待本回合出牌建议。", "LETHAL — do not trade first.": "可以斩杀，请先确认伤害。", "KEEP": "保留", "TOSS": "换掉", "Coach": "教练", "Both": "两者", "Off": "关闭", "Default": "默认", "first recorded game with this deck": "该卡组的首场记录", "last 10, newest first": "最近 10 场，最新在前", "Hearthstone Coach Overlay": "炉石 AI 教练", "idle": "等待", "TURN": "回合建议", "MULLIGAN": "起手留牌", "UPDATE": "局面更新", "GAMEOVER": "对局结束", "WARRIOR": "战士", "SHAMAN": "萨满祭司", "ROGUE": "潜行者", "PALADIN": "圣骑士", "HUNTER": "猎人", "DRUID": "德鲁伊", "WARLOCK": "术士", "MAGE": "法师", "PRIEST": "牧师", "DEMONHUNTER": "恶魔猎手", "DEATHKNIGHT": "死亡骑士", "NEUTRAL": "中立"};
  let locale = 'zhCN';
  function setLocale(value) { locale = value === 'enUS' ? 'enUS' : 'zhCN'; return locale; }
  function t(value) {
    const s = String(value ?? '');
    if (locale === 'enUS') return s;
    if (Object.hasOwn(zh, s)) return zh[s];
    return s.replace(/^OPPONENT · (.*)$/, (_, c) => `对手 · ${t(c)}`)
      .replace(/^(\d+) cards$/, '$1 张')
      .replace(/^(\d+) in hand · (.*?) in deck/, '手牌 $1 · 牌库 $2')
      .replace(/ · (\d+) secrets$/, ' · $1 个奥秘')
      .replace(/^turn (.*?)( · (your turn|opponent))?$/, (_, n, part, who) => `回合 ${n}${part ? ` · ${who === 'your turn' ? '你的回合' : '对手回合'}` : ''}`)
      .replace(/^LETHAL: /, '斩杀：').replace(/^PICK: /, '选择：')
      .replace(/^choices: (.*)$/, (_, m) => `建议来源：${t(m)}`)
      .replace(/^(Overall: )?(\d+)–(\d+) · (.*?)% over (\d+) games$/, (_, all, w,l,rate,n) => `${all ? '总计：' : ''}${w} 胜 ${l} 负 · 胜率 ${rate}% · ${n} 场`)
      .replace(/^click-through · /, '鼠标穿透 · ').replace(/^move\/resize · /, '移动 / 调整大小 · ')
      .replace(/ · coach: /, ' · 教练：').replace(/cost last time: /g, '上次代价：');
  }
  return {t, setLocale, getLocale: () => locale};
});
