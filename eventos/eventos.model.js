const mongoose = require('mongoose');

const eventoschema = mongoose.Schema({
  course : String,
  start : Date,
  end : Date,
  title : String,
  color : Array,
  actions : Array,
  allDay : Boolean,
  resizable : Array,
  draggable : Boolean
}, {
    timestamps: true
});


module.exports = mongoose.model('eventos', eventoschema);
