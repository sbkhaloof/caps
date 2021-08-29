/*
Main Hub Application
1. Manages the state of every package (ready for pickup, in transit, delivered, etc)
2. Logs every event to the console with a timestamp and the event payload
*/ 
'use strict';
const events=require('./events');


// require driver and vendors
require('./models/driver');
require('./models/vendor')

let d = new Date();
let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
let time=d.toLocaleTimeString()


//Manages the state of every package
// pickup

events.on('pickup',payload=>{
    console.log('event:',{
        event:'pickup',
        time:`${ye}-${mo}-${da} T ${time}`,
        payload:payload
    });
    events.emit('driverPickup',payload);
});


// transit
events.on('transit',payload=>{
    console.log('event:',{
        event:'transit',
        time:`${ye}-${mo}-${da} T ${time}`,
        payload:payload
    });
    events.emit('driverTransit',payload);
});

// deleverd

events.on('deleverd',payload=>{
    console.log('event:',{
        event:'deleverd',
        time:`${ye}-${mo}-${da} T ${time}`,
        payload:payload
    });
    events.emit('driverDeleverd',payload);
});


module.exports=events