// controllers/clienteController.js
const Order = require('../models/Order');

exports.crearOrden = async (req, res, next) => {
  try {
      const { email, nombre, apellido, direccionEntrega  } = req.body

      const order = new Order({email: email,nombre: nombre, apellido: apellido, direccionEntrega:direccionEntrega });
      await order.save();

  } catch (error) {
      console.log(error);
      res.send('There was an error');
  }
}