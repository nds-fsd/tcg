const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://nuclio-tcg:Bootcamp10*@cluster0.5tmnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
);

const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
  console.log('connected to database');
});

module.exports = mongo;
