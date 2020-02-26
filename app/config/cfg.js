// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Base de datos
// ============================
process.env.URLDB = process.env.URLDB || 'mongodb+srv://techuUser:Xg5dZeWXBmaZcGQ@cluster0-bbvatechu-pmld4.mongodb.net/test?retryWrites=true&w=majority';
module.exports = {
    secret: process.env.SECRET || 'this-is-the-secret'
};