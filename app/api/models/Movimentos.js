const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const MovimientosSchema = new Schema({
    account:{
        type: String,
        required: [true, 'La cuenta es necesaria']
    },
    name: {
        type: String,
        trim: true,  
        required: [true, 'El detalle es requerido']
    },
    amount: {
        type: Number,
        trim: true,
        required: [true, 'El monto es requerido']
    },
    release: {
        type: Date,
        trim: true,
        required: [true, 'La fecha es necesaria']
    }
}, {timestamps: true})
;
module.exports = mongoose.model('Movimientos', MovimientosSchema)

