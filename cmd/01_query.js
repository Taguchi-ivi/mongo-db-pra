// mongo
// collection追加
db.users.insert({
  email: 'test@test.com',
  password: 'pass',
  name: 'test 太郎',
});

// collection更新
// 第一引数: 更新対象の条件, 第二引数: 更新内容, 第三引数: オプション(複数更新する場合はmulti: true)
db.users.update({ email: 'test@test.com' }, { $set: { name: 'test 太郎2' } });

// where的な検索
db.users.find({ email: 'test@test.com' });

// 削除 複数削除する場合はmulti: true
db.users.remove({ email: 'test@test.com' });

// 件数取得
db.books.count();

// whereと件数取得
db.books.count({ publisher: 'A出版' }); // db.books.find({ publisher: 'A出版' }).count()と同じ;
// or
db.books.count({ $or: [{ publisher: 'A出版' }, { publisher: 'B出版' }] });

// sort
db.books.find(); // カーソルというものが返ってくる それに対してsortなどのメソッドを使う
db.books.find().sort({ price: 1 }); // 昇順
db.books.find().sort({ price: -1 }); // 降順
db.books.find({ publisher: 'A出版' }).sort({ price: 1 }); // publisherがA出版のものをpriceの昇順で取得

// 検索結果の制限
db.books.find().limit(3); // 3件取得
db.books.find().skip(3); // 先頭から3件スキップ
db.books.find().limit(3).skip(3); // 3件取得して3件スキップ
db.books.find().limit(3).skip(3).sort({ price: 1 }); // 3件取得して3件スキップしてpriceの昇順

// indexの作成/確認/削除
db.users.createIndex({ email: 1 }, { name: 'IX_EMAIL' }); // emailにindexを作成
db.users.getIndexes(); // indexの確認
db.users.dropIndex('IX_EMAIL'); // indexの削除

// 一意制約 ユニーク制約
db.users.createIndex({ email: 1 }, { name: 'IX_EMAIL', unique: true }); // emailにindexを作成してユニーク制約をつける
