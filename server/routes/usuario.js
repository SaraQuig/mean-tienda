//rutas para usuario
const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
//api/usuario - sirve para registrar un nuevo usuario
router.post('/crear-user', usuarioController.crearUsuario)
//obteniendo los usuarios registrados
router.get('/ver-users', usuarioController.obtenerUsuarios)

//actualizar un usuario
// router.put('/usuarios/:id', usuarioController.actualizarUsuario)

//Obtener usuario
router.get('/usuarios/:id', usuarioController.obtenerUsuario)
//Eliminar un usuario
router.delete('/usuarios/:id', usuarioController.eliminarUsuario)
//login
router.post('/logearse', usuarioController.loginUsuario)

//estado avtivo o inactivo
router.put('/usuarios/:id', usuarioController.changeUserStatus)
router.put('/usuarios/:id', usuarioController.changeUserStatus)

module.exports = router

