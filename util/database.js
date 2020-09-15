const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://FrancisLau:S37mwfjAOixwklQl@cluster0.qy515.mongodb.net/<dbname>?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected!');
    callback(client);
  })
  .catch(err => {console.log(err)
   });
};

module.exports = mongoConnect;




// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;
