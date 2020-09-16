const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
// mongodb+srv://FrancisLau:<password>@cluster0.qy515.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://FrancisLau:S37mwfjAOixwklQl@cluster0.qy515.mongodb.net/<dbname>?retryWrites=true&w=majority
  'mongodb+srv://FrancisLau:S37mwfjAOixwklQl@cluster0.qy515.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
