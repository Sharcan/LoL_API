const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
  if (!err) {
    console.log('MongoDB connection succeeded');
  } else {
    console.log('Error in MongoDB connection : ' + JSON.stringify(err));
  }
});

require('../models/account.models');