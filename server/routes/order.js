// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define the route for saving cliente info
router.post('/guardar-compra', orderController.crearOrden);

module.exports = router;
