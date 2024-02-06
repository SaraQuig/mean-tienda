const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
//encriptando la contraseña
const jwt = require('jsonwebtoken');
const { response } = require('express');
//Registrando usuarios
exports.crearUsuario = async (req, res, next) => {
    try {
        const { email, psw, precio, foto  } = req.body
        const hashPassword = await bcrypt.hash(psw, 10);

        const usuario = new Usuario({ psw: hashPassword, email: email,precio:precio,foto:foto });
        await usuario.save();

        // User saved, create JWT
        const payload = {
            user: {
                id: usuario.id
            }
        };

        jwt.sign(
            payload,
            'SECRET_KEY', // replace this with your own secret, you can use .env file to hide your secret key
            {
                expiresIn: 360000 // token will be valid for 1 hour
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // send token to clien
            }
        )

    } catch (error) {
        console.log(error);
        res.send('There was an error');
    }
}

//Obteniendo los usuarios registrados
exports.obtenerUsuarios = async (req, res) => {

    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error obtener lista user')
    }
}

//Actualizar un usuario
// exports.actualizarUsuario = async (req, res) => {
//     try {
//         const { email, psw } = req.body
//         let usuario_ = await Usuario.findById(req.params.id)

//         // Hash the password
//         const hashPassword = await bcrypt.hash(psw, 10);

//         // Check if the user exists
//         if (!usuario_) {
//             res.status(404).json({ msg: 'No existe el usuario' })
//         }

//         // Update the user
//         usuario_.email = email
//         usuario_.psw = hashPassword

//         usuario_ = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario_, { new: true })
//         res.json(usuario_)

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Hubo un error act user')
//     }

// }
//Obtener un usuario
exports.obtenerUsuario = async (req, res) => {
    try {
        let usuario_ = await Usuario.findById(req.params.id)
        //let usuario_ = await Usuario.findOne({email:req.params.email})

        //preguntando si el usuario no existe
        if (!usuario_) {
            res.status(404).json({ msg: 'No existe el usuario' })
        }
        res.json(usuario_)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error obtener user')
    }
}
//Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario_ = await Usuario.findById(req.params.id)

        //preguntando si el usuario no existe
        if (!usuario_) {
            res.status(404).json({ msg: 'No existe el usuario' })
        }
        await Usuario.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Usuario eliminado con exito' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar')
    }
}


//Login
exports.loginUsuario = async (req, res, next) => {

    console.log(req.body);


    try {
        // Try to find the user
        const { email, psw } = req.body;
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(psw, usuario.psw);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // If user exists & password matches, create and JWT and send back to client
        const payload = {
            user: {
                id: usuario._id
            }
        }
        jwt.sign(
            payload,
            'SECRET_KEY',  // replace 'SECRET_KEY' with your own secret
            { expiresIn: '5 days' },
            (error, token) => {
                if (error) throw error;
                res.status(200).json({ token });
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }

}

//cambiar estado activo o inactivo de usuario

// controller.js

exports.changeUserStatus = async (req, res) => {
    try {
        const { active } = req.body;
        let user = await Usuario.findById(req.params.id);

        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }

        user.active = active;
        await user.save();

        res.send(user);
    } catch(err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }

        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    }
}
