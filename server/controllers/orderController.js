// controllers/clienteController.js
const Order = require('../models/Order');

//validaciones con la base de datos
exports.crearOrden = async (req, res, next) => {
  try {
      const { email, nombre, apellido, direccionEntrega  } = req.body
      const order = new Order({email: email,nombre: nombre, apellido: apellido, direccionEntrega:direccionEntrega });
      await order.save();
      res.status(201).json(order);
  } catch (error) {
      console.log(error);
      res.send('There was an error');
  }
}