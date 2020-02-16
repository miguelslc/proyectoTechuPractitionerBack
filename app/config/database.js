//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/proyectoInte' || 'serverPROD';

// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);

module.exports = mongoose;
