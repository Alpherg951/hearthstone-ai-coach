const {test} = require('node:test');
const assert = require('node:assert/strict');
const i18n = require('./renderer/i18n.js');
test('Chinese defaults, dynamic counters, class names and English fallback', () => {
  i18n.setLocale('zhCN');
  assert.equal(i18n.t('LIVE COACH'),'实时教练');
  assert.equal(i18n.t('OPPONENT · MAGE'),'对手 · 法师');
  assert.equal(i18n.t('4 in hand · 20 in deck · 2 secrets'),'手牌 4 · 牌库 20 · 2 个奥秘');
  assert.equal(i18n.t('turn 3 · your turn'),'回合 3 · 你的回合');
  assert.equal(i18n.t('Overall: 6–4 · 60% over 10 games'),'总计：6 胜 4 负 · 胜率 60% · 10 场');
  assert.equal(i18n.t('Untranslated user deck'),'Untranslated user deck');
  i18n.setLocale('enUS');
  assert.equal(i18n.t('LIVE COACH'),'LIVE COACH');
  i18n.setLocale('bad');
  assert.equal(i18n.getLocale(),'zhCN');
});
