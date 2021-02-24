var MongoClient = require('mongodb').MongoClient;

const config = require('./config.json');

MongoClient.connect(config.development.MONGO_URI, function(err, db) {
  if (!err) {
    console.log('MongoDB connection succeeded');
  } else {
    console.log('Error in MongoDB connection : ' + JSON.stringify(err));
  }
});
