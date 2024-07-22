//logica de negocio
const mongoose = require('mongoose')
const authSchema = require('./models/Usuario')
const authSchema_ = require('./models/Producto')

//conexiones
authSchema.statics = {
    create: function(data,cb){
        const user = new this(data)
        user.save(cb)
    },
    login: function(query, cb){
        this.find(query,cb)
    }
}

const authModel = mongoose.model('usuarios',authSchema)
const authModel_ = mongoose.model('productos',authSchema)

module.exports = authModel
module.exports = authModel_