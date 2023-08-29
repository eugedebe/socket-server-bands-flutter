const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');



const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heros del Silencio'));
bands.addBand(new Band('Metallica'));

console.log(bands);

//messages sockets
io.on('connection', client => {
    console.log("client connected")

    client.emit('active-bands', bands.getBands())
    // client.on('event', data => { /* … */ });

    client.on('vote-band', payload => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });
    client.on('add-band', payload => {
        // const band = new Band(payload.bandName);
        bands.addBand(new Band(payload.bandName));
        io.emit('active-bands', bands.getBands());

    });
    client.on('delete-band', payload => {
        // const band = new Band(payload.bandName);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });



    client.on('disconnect', () => {
        console.log("client disconnected");

    });

    // client.on('message', (payload) => {
    //     console.log('Mensaje!!!!', payload);
    //     client.broadcast.emit('messageFromServer', {
    //         admin: 'New message'
    //     })
    // });

    // client.on('messageFromFlutter', (payload) => {
    //     // client.emit('messageFromFlutter', payload);
    //     client.broadcast.emit('messageFromFlutter', {
    //         payload
    //     })

    //     console.log('messageFromFlutter: ', payload)
    // });

});