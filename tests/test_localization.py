import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'hearthstone-tracker'))
from hstracker.cards import HeroClassResolver, localized_snapshot
from hstracker.choices import write_locale, write_mode
class LocalizationTests(unittest.TestCase):
    def test_display_translation_preserves_matching_names(self):
        with tempfile.TemporaryDirectory() as d:
            f=Path(d)/'zh.json'; f.write_text(json.dumps([{'id':'TEST_1','name':'测试卡','text':'测试效果'}]),encoding='utf-8')
            with patch.dict(os.environ,{'HS_CARD_LOCALE_FILE':str(f)}):
                resolver=HeroClassResolver(allow_fetch=False)
            snap={'me':{'hand':[{'id':'TEST_1','name':'Test Card'}]},'opp':{'hand_hidden':4}}
            result=localized_snapshot(snap,resolver)
            self.assertEqual(result['localized_cards']['TEST_1']['name'],'测试卡')
            self.assertEqual(result['me']['hand'][0]['name'],'Test Card')
            self.assertNotIn('hand',result['opp'])
    def test_language_and_choices_survive_each_other(self):
        with tempfile.TemporaryDirectory() as d:
            write_mode(d,'both');write_locale(d,'enUS');write_mode(d,'coach')
            settings=json.loads((Path(d)/'settings.json').read_text())
            self.assertEqual(settings['locale'],'enUS')
            self.assertEqual(settings['choices'],'coach')
            with self.assertRaises(ValueError):write_locale(d,'bad')
