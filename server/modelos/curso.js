const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let nivelesValidos = {
  values: ["Basico", "Intermedio", "Avanzado"],
  message: "{VALUE} no es un nivel válido",
};

const cursoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"]
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es necesaria"]
  },
  cupo: {
    type: Number,
    required: false,
  },
  duracion: {
    type: Number,
    required: false,
  },
  nivel: {
    type: String,
    enum: nivelesValidos,
    trim: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  img: {
    type: String,
    required: [true, "La Imagen es necesaria"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  contacto: {
    type: String,
    required: [true, "El Contacto es necesario"],
  },
});

module.exports = mongoose.model("Curso", cursoSchema);
