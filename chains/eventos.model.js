const mongoose = require('mongoose');

const chainschema = mongoose.Schema({
  course : String,
  creator: String,
  chain : String,
  responses : Number,
  date: Date
}, {
    timestamps: true
});


module.exports = mongoose.model('chains', chainschema);
