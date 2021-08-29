"use strict";

const events = require('../events');
// Monitor the system for events …

events.on('driverPickup', payload=>{
    setTimeout(()=>{
        console.log(`DRIVER: picked up ${payload.orderId}`);
        events.emit('transit',payload);// Emit an ‘in-transit’ event with the payload you received
    },1000); // Wait 1 second
});


events.on('driverTransit',payload=>{
    setTimeout(()=>{
        console.log(`DRIVER: delivered  up ${payload.orderId}`);
        events.emit('vendorDileverd',payload);//Emit a ‘delivered’ event with the same payload
    },3000)//Wait 3 seconds
});


module.exports=events