const { mongoose } = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    //validaciones  
    //datos que guardo de los usuarios
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    psw: {
        type: String,
        require: true,
        trim: true
    },
    active: { type: Boolean, default: true }
},
    {
        timestamps: true
    })
module.exports = mongoose.model('usuarios', UsuarioSchema)



//interactuando con la base de datos