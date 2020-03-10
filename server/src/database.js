const mongoose = require('mongoose');

require('dotenv').config();

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


mongoose.connect(process.env.DATABASE_URL, options);

const conn = mongoose.connection;

conn.on('error', function (err) {
    console.log('Mongoose: Error: ' + err);
});
conn.on('open', function() {
    console.log('Mongoose: Connection established');
});