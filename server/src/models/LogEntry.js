const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logEntrySchema = new Schema({
  title:  {
      type: String,
      required: true,
  },
  description: String,
  comments: String,
  rating:  {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  image: String,
  latitude: Number,
  longitude: Number,
  visitDate: {
    required: false,
    type: Date,
  },
},{
  timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = LogEntry;