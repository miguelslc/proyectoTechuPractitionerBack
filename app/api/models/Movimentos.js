const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const MovimientosSchema = new Schema({
    account:{
        type: String,
        required: [true, 'La cuenta es necesaria']
    },
    detail: {
        type: String,
        trim: true,  
        required: [true, 'El detalle es requerido']
    },
    name: {
        type: String,
        trim: true,  
        required: [true, 'El Nombre es requerido']
    },
    amount: {
        type: Number,
        trim: true,
        required: [true, 'El monto es requerido']
    },
    release: {
        type: String,
        trim: true,
        required: [true, 'La fecha es necesaria']
    },
    email:{
        //email de origen
        type: String,
        trim: true,
        required: [true, 'Origen necesario']
    }
})
;
module.exports = mongoose.model('Movimientos', MovimientosSchema)

