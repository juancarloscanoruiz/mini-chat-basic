//Servidor de express
const express = require('express');
//Servidor de socket
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //HTTP SERVER
        this.server = http.createServer(this.app)

        //SOCKET'S CONFIGURATION
        this.io = socketio(this.server, { /* Configuraciones */});
    }

    middlewares() {
        //Directorio público
        this.app.use( express.static(path.resolve(__dirname, '../public')))
    }

    setSockets() {
        new Sockets(this.io);
    }

    start() {
        //Inicializar middlewares
        this.middlewares();
        //Inicializar socket
        this.setSockets();
        //Inicializar server
        this.server.listen(this.port, () => {
            console.log('server corriendo en el puerto 3000')
        });
    }

}

module.exports = Server;