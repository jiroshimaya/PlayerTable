# PlayerTable
やきゅうたの選手表を替え歌歌詞から作るシステム

# メンテナンス
- 新規の野球選手表からcsvファイルを作成（Soramimicのリポジトリ参照）
- py/make_reference_json.pyでcsvからjsonを作成し、中身をreference/baseball.csvにコピー

```sh
git clone [url]
cd PlayerTable/py
uv run make_reference_json.py [csv_path]
mv output.json ../reference/baseball.json
```