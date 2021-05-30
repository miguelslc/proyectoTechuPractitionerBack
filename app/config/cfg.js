// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 5000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Base de datos
// ============================

process.env.URLDB = process.env.URLDB || 'mongodb+srv://localhost:27017/proyectoInte';
module.exports = {
    secret: process.env.SECRET || 'this-is-the-secret'
};