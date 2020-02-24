const mongoose = require('mongoose');

const politicoschema = mongoose.Schema({
  titulo : String,
  descripcion : String,
  contenido : String,
  pifias : Array,
  imagenes : Array
}, {
    timestamps: true
});


module.exports = mongoose.model('politicos', politicoschema);
