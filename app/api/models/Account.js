const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let AccountSchema = new mongoose.Schema({
    number: {
        type: String,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es necesario']
      },
    amount: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum : ['CA','CC'],
        default: 'CA'
    },
    currency: {
        type: String,
        enum : ['AR$','US$', '€'],
        default: 'AR$'
    },
}, {timestamps: true});

AccountSchema.plugin(uniqueValidator, {message: 'ya existe'});

AccountSchema.pre('validate', function (next) {
    if(!this.number)  {
        this.uniqueNumber();
    }
    next();
});

AccountSchema.methods.uniqueNumber = function() {
    this.number =  new Date().getTime();
};

AccountSchema.methods.toJSON = function() {
    return {
      id: this._id,
      number: this.number,
      amount: this.amount,
      type: this.type,
      currency: this.currency
    }
};

module.exports = mongoose.model('Account', AccountSchema);