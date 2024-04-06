## NoSQL 勉強

mongo についてのコマンドと勉強の軌跡

下記 udemy 参考

- [MongoDB 入門 ー演習しながら学ぶクエリ操作ー](https://www.udemy.com/course/introductory-mongodb/learn/lecture/11544412?start=75#questions)

### そもそもの起動について

- スタート

```bash
brew services start mongodb-community
```

- mongo と対話(操作などのスクリプトモードへ)
  - ※ サーバー起動してないとエラーになるお

```bash
mongo
```

- ストップ

```bash
brew services start mongodb-community
```

- データを触るエディタなど
  - MongoDB Compass
