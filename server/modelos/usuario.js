const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//--- Para validar roles------
let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol valido",
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo es necesario"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

usuarioSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser unico",
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
module.exports = mongoose.model("Usuario", usuarioSchema);
