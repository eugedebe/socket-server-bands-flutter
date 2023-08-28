const { io } = require('../index');
//messages sockets
io.on('connection', client => {
    console.log("client connected")
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        console.log("client disconnected");

    });

    client.on('message', (payload) => {
        console.log('Mensaje!!!!', payload);
        io.emit('messageFromServer', {
            admint: 'New message'
        })
    })
});