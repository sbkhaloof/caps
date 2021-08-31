"use strict";

require('dotenv').config();
const io = require('socket.io-client');
const host=process.env.HOST||"http://localhost:3001"

const caps=io.connect(`${host}/caps`);



// const events = require('../events');
// Monitor the system for events …

caps.on('pickup', payload=>{
setInterval(() => {
    console.log(`DRIVER: picked up `);
    caps.emit('pickup',payload);// Emit an ‘in-transit’ event with the payload you received
    caps.emit('transit',payload);// Emit an ‘in-transit’ event with the payload you received

}, 1500);
setInterval(()=>{
    console.log('Driver : Delivered ',payload['orderID']);
    caps.emit('deleverd',payload);;

},3000);

})

    

