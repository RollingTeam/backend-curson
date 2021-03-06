const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ["USER_ROLE", "ADMIN_ROLE"],
    message: "{VALUE} no es un rol válido"
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    
    nombre:{
        type: String,
        required: [true, 'Debes ingresar tu nombre']
    },

    apellido:{
        type: String,
        required: [true, 'Debes ingresar tu apellido']
    },

    email:{
        type: String,
        required: [true, 'Debes ingresar un email'],
        trim: true,
        unique: true
    },

    password:{
        type: String,
        required: [true, 'Debes ingresar una contraseña']
    },

    img: {
        type: String,
        required: false
    },

    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos, 
        trim: true
    },

    estado: {
        type: Boolean,
        default: true
    },

    created_at:{
        type: Date,
        default: Date.now()
    },

    misFavoritos: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Curso'
    }]
})

usuarioSchema.plugin(uniqueValidator,{
    message: "{PATH} debe ser unico"
});

//Eliminar password de las peticiones

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password; 
    return userObject;
}

module.exports=mongoose.model('Usuario', usuarioSchema)

