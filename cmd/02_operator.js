// memo
// pretty()で整形して表示
// db.books.find().pretty()

// 関係演算子
// 等しい $eq , 等しくない $ne , より大きい $gt , より大きいか等しい $gte , より小さい $lt , より小さいか等しい $lte
// 配列の中に含まれる $in, 配列の中に含まれない $nin
// { field: { $eq: value } }

// 等しい
db.books.find({ publisher: { $eq: 'A出版' } });
// 等しくない
db.books.find({ publisher: { $ne: 'A出版' } });
// より大きい
db.books.find({ price: { $gt: 1000 } });
// より大きいか等しい
db.books.find({ price: { $gte: 1000 } });
// より小さい
db.books.find({ price: { $lt: 1000 } });
// より小さいか等しい
db.books.find({ price: { $lte: 1000 } });
// 配列の中に含まれる
db.books.find({ publisher: { $in: ['A出版', 'B出版'] } });
// 配列の中に含まれない
db.books.find({ publisher: { $nin: ['A出版', 'B出版'] } });
// 2023年1月1日より後
db.books.find({ launch: { $gt: ISOData('2023-01-01T00:00:00+09:00') } });

// 論理演算子
// and $and, or $or, not $not, nor $nor
// 配列で記載
// { $and: [ { field1: value1 }, { field2: value2 } ] }

// and
db.books.find({ $and: [{ publisher: 'A出版' }, { price: { $gt: 300 } }] });
// or
db.books.find({ $or: [{ publisher: 'A出版' }, { publisher: 'B出版' }] });
// not
db.books.find({ $not: { publisher: 'A出版' } });

// 評価演算子
// 正規表現 $regex, アグリゲーション $expr
// { field: { $regex: /pattern/ } }

// 正規表現
db.books.find({ publisher: { $regex: /社/ } });
// 正規表現 $regexは省略可能
db.books.find({ publisher: /社/g });

// 要素演算子
// 存在 $exists, 型 $type
// { field: { $exists: true } }

// 存在
db.books.find({ dob: { $exists: true } });
// 型
db.books.find({ dob: { $type: 'string' } });
// dobが存在し、日付ではない
db.books.find({
  $and: [{ dob: { $exists: true } }, { dob: { $not: { $type: 'date' } } }],
});

// 配列演算子
// 配列の中の要素 $elemMatch, 要素数 $size,
// { field: { $elemMatch: { field: value } } }

// カテゴリ(配列)の中に日本文学
db.books.find({ categories: { $elemMatch: { $eq: '日本文学' } } });
db.books.find({ categories: '日本文学' }); // これでもOK
// 2018年2月1日以降に本を読み終わっているユーザー
db.users.find({
  bookshelf: {
    $elemMatch: {
      status: '読了',
      readed: { $gt: ISODate('2018-02-01T00:00:00+09:00') },
    },
  },
});
// 読了だけであれば
db.users.find({ 'bookshelf.status': '読了' });
// カテゴリー登録が3件
db.books.find({ categories: { $size: 3 } });
// カテゴリが1件より多く登録されている
db.books.find({ $expr: { $gt: [{ $size: '$categories' }, 1] } });
