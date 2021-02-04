const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let estadosValidos = {
  values: ["Pendiente", "Rechazada", "Aprobada"],
  message: "{VALUE} no es un estado válido",
};

let nivelesValidos = {
  values: ["Basico", "Intermedio", "Avanzado"],
  message: "{VALUE} no es un nivel válido",
};

const solicitudSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es necesaria"],
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
  contacto: {
    type: String,
    required: [true, "El Contacto es necesario"],
  },
  autor: {
    type: String,
  },
  estado: {
    type: String,
    enum: estadosValidos,
    default: estadosValidos.values[0],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  isActive:{
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Solicitud", solicitudSchema);
