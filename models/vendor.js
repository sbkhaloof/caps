'use strict'
require('dotenv').config();

const io = require('socket.io-client');


const host=process.env.HOST||"http://localhost:3001"
const socket=io.connect(`${host}/caps`);



// const events=require('../events');



   
    

// Monitor the system for events …
socket.on('deleverd',payload=>{
    // Whenever the ‘delivered’ event occurs log “thank you” to the console
    console.log(`thank you for delivering   ${payload.orderID}`);
    // events.emit('deleverd', payload);
})



