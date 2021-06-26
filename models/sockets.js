class Sockets {
    constructor(io){
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        //On connection
        this.io.on('connection', (socket) => { 
            socket.on('send-messages', (data) => {
                console.log(data);
                const dataServer = data;
                //Usamos socket para mandar a un solo cliente
                //Usamos io cuando queremos mandar a todos los clientes
                this.io.emit('message-to-client', dataServer)
            })
         });
    }
}

module.exports = Sockets;