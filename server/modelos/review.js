const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
  user: {
    type: String,
    required: [true, "El user es necesario"]
  },
  curso: {
    type: String,
    required: [true, "El nombre del curso es necesario"]
  },
  calificacion: {
    type: Number,
    required: [true, "La calificacion del curso es necesario"]
  },
  comentario: {
    type: String,
    required: [true, "El comentario del curso es necesario"]
  },
  img: {
    type: String,
    required: false
  },
  estado: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model("Review", cursoSchema);