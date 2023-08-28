const express = require('express');

const path = require('path');
require('dotenv').config();

const app = express();


//NODE SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');



const publicPath = path.resolve(__dirname, 'public');




server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    app.use(express.static(publicPath));
    console.log('Servidor corriendo en puerto');
})