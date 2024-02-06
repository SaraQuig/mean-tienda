const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { mongoose } = require('./config/db');
const orderRoutes = require('./routes/order');
const app = express();
const port = 3000
app.set('nombreApp', 'Tienda');
app.set('puerto', process.env.PORT || 3000);


//Codigo que permite los cors desde cualquier origen
app.use(cors());
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the cliente routes
app.use('/api', orderRoutes);

app.use('/api', require('./routes/usuario'))
app.use('/api/productos', require('./routes/producto'))

app.listen(app.get('puerto'), () => {
    console.log('Nombre de la App', app.get('nombreApp'));
    console.log('Puerto del servidor', app.get('puerto'));

})
