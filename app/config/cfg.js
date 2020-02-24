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
process.env.URLDB = 'mongodb://localhost:27017/proyectoInte' || 'mongodb+srv://usr-nodejs:25uE60N5RxGnO3EJ@cluster0-du2rr.mongodb.net/bdd-practitioner-app?retryWrites=true&w=majority';

module.exports = {
    secret: process.env.SECRET || 'this-is-the-secret'
};