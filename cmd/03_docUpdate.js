// ドキュメント更新周りの演算子

// フィールドの更新
// $set
// db.<target>.update(<query>, <update>, <option>)
// option = { multi: <boolean>, upsert: <boolean>, arrayFilters: <array> }

// 与謝野晶子の誕生日を更新
db.authors.update(
  { name: '与謝野晶子' },
  { $set: { dob: ISOData('1878-12-07T00:00:00+09:00') } }
);

// フィールドの削除
// $unset
// 空更新: フィールド自体は残っているが、値が空になる, $set: { field: '' }
// フィールド削除: フィールド自体が削除される, $unset: { field: '' }

// 正岡子規の誕生日をnullで更新
db.authors.update({ name: '正岡子規' }, { $set: { dob: null } });
// 正岡子規の誕生日を削除
db.authors.update({ name: '正岡子規' }, { $unset: { dob: '' } });

// フィールドのリネーム
// $rename
// db.<target>.update(<query>, { $rename: { <old>: <new> } })

// sexをgenderにリネーム
db.users.update({}, { $rename: { sex: 'gender' } }, { multi: true });

// フィールドを現在日時で更新
// $currentDate
// { $currentDate: { <field>: <type> } }

// 田中太郎のパスワードを更新して、更新日時を記録
db.users.update(
  { name: '田中太郎' },
  {
    $set: { password: 'new_password' },
    $currentDate: { updated: true },
  }
);

// フィールドを加算/乗算して更新
// 加算:$inc, 乗算:$mul

// 加算
db.reviews.update({}, { $inc: { score: 1 } }, { multi: true });
// 減算
db.reviews.update({}, { $inc: { score: -1 } }, { multi: true });
// 乗算
db.reviews.update({}, { $mul: { score: 2 } }, { multi: true });
// 除算
db.reviews.update({}, { $mul: { score: 0.5 } }, { multi: true });

// 配列要素の追加
// $push
// { $push: { <field>: <value> } }
// 修飾子: $each, $sort, $slice, $position
// { $push: { <field>: { $each: [<value1>, <value2>], $sort: 1, $slice: 3, $position: 0 } } }

// 1件追加
db.users.update(
  { name: '田中太郎' },
  { $push: { bookshelf: { book: '新書', registered: ISOData() } } }
);
// 2件追加
db.users.update(
  { name: '田中太郎' },
  {
    $push: {
      bookshelf: {
        $each: [
          { book: '新書2', registered: ISOData('2018-07-12T12:00:00+09:00') },
          { book: '新書3', registered: ISOData('2018-06-28T12:00:00+09:00') },
        ],
      },
    },
  }
);
// 登録日が新しい順にソート
db.users.update(
  { name: '田中太郎' },
  { $push: { bookshelf: { $each: [], $sort: { registered: -1 } } } }
);
// 5件だけに削減
db.users.update(
  { name: '田中太郎' },
  { $push: { bookshelf: { $each: [], $slice: 5 } } }
);
// 先頭に1件追加
db.users.update(
  { name: '田中太郎' },
  { $push: { bookshelf: { $each: [], $position: 0 } } }
);
// 2件追加して登録日が新しい順にソート、上位5件に絞り込み
db.users.update(
  { name: '田中太郎' },
  {
    $push: {
      bookshelf: {
        $each: [
          { book: '新書4', registered: ISOData('2018-07-12T12:00:00+09:00') },
          { book: '新書5', registered: ISOData('2018-06-28T12:00:00+09:00') },
        ],
        $sort: { registered: -1 },
        $slice: 5,
      },
    },
  }
);

// 配列要素の更新
// $set
// { $set: { 'field.$[<identifier>].<field>': <value> } }
// { arrayFilters: [ { <identifier>: <condition> } ] }

// 田中太郎のbookshelfのstatusを更新
db.users.update(
  { name: '田中太郎' },
  { $set: { 'bookshelf.$[item].status': '読了' } },
  { arrayFilters: [{ 'item.book': ObjectId('xxxxxxxxxx') }] }
);
// 田中太郎のbookshelfのstatusを更新&&readedを更新
db.users.update(
  { name: '田中太郎' },
  {
    $set: {
      'bookshelf.$[item].status': '読了',
      'bookshelf.$[item].readed': ISOData(),
    },
  },
  { arrayFilters: [{ 'item.book': ObjectId('xxxxxxxxxx') }] }
);

// 配列要素の削除
// 先頭から1件削除: $pop, 末尾から1件削除: $pop, 指定した値を削除: $pull
// { $pop: { <field>: <1 or -1> } }
// { $pull: { <field>: <value> } }

// 末尾から1件削除
db.users.update({ name: '田中太郎' }, { $pop: { bookshelf: 1 } });
// 読了した本を削除
db.users.update(
  { name: '田中太郎' },
  { $pull: { bookshelf: { status: '読了' } } }
);
