'use strict'
require('dotenv').config();
const faker =require('faker');
const events=require('../events');
const store="1-206-flowers"


setTimeout(()=>{
    //Create a fake order, as an object
    let customerOrder={
        storeName:store,
        orderId:faker.datatype.uuid(),
        customerName:faker.name.findName(),
        address:faker.address.streetAddress()
    };
// Emit a ‘pickup’ event and attach the fake order as payload
    events.emit('pickup',customerOrder);
},5000);// Every 5 seconds, simulate a new customer order

// Monitor the system for events …
events.on('vendorDileverd',payload=>{
    // Whenever the ‘delivered’ event occurs log “thank you” to the console
    console.log(`thank you  ${payload.orderId}`);
    events.emit('deleverd', payload);
})


module.exports=events
