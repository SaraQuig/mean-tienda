// models/Cliente.js
const mongoose = require('mongoose');

//constantes para hacer la roden
const OrderSchema = mongoose.Schema({
  email: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccionEntrega: { type: String, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
