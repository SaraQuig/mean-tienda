// models/Cliente.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccionEntrega: { type: String, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
