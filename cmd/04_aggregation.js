// 動画の視聴だけ、コマンドの記載はしない

// MongoDBの集計処理
// aggregate([<STAGE1>, ...])

// ステージ
// 集計処理の各手順
// パイプライン処理ともいう

// オペレーター
// 各ステージ中で利用可能な補助的な処理

// matchだけやる
db.books.aggregate([
  {
    $match: {
      publisher: 'A出版',
    },
  },
]);
