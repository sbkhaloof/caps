/*
Main Hub Application(lab11)
1. Manages the state of every package (ready for pickup, in transit, delivered, etc)
2. Logs every event to the console with a timestamp and the event payload
*/
'use strict';
// const events=require('./events');    ----------------this for requier the event for lab 11
/*
for lab 12
1.require socket.io
2. create connection 
3. create name space 
*/
require('dotenv').config();
const port = process.env.Port || 3001;
const io = require('socket.io')(port);  // require socket.io// http://localhost:3001
const caps = io.of('/caps');   // name space// http://localhost:3001/caps


// require driver and vendors lab 11
/*
require('./models/driver');
require('./models/vendor')
*/


io.on('connection', (socket) => {
    console.log('CONNECTED SUCCESSFULLY ', socket.id);
})

const faker=require('faker');

class payload{
    constructor(){
        this.store=process.env.STORE_NAME||'doon';
        this.orderID=faker.datatype.uuid();
        this.customer=faker.name.findName();
        this.address=faker.address.streetAddress();
    }
}

caps.on('connection', (socket) => {
    console.log('CONNECTED SUCCESSFULLY ', socket.id);
    socket.on('pickup', payload => {
        let order= {
            event: 'pickup',
            time: new Date(),
            payload: payload
        };
        console.log('Event',order);
        // caps.emit('driverPickup', order)
    })
        socket.on('transit', payload => {
            let order= {
                event: 'transit',
                time: new Date(),
                payload: payload
            };
            // caps.emit('driverTransit',order); 
            console.log('Event',order); 
        })
            socket.on('deleverd', payload => {
                let order= {
                    event: 'deleverd',
                    time: new Date(),
                    payload: payload
                };
                console.log('Event',order);
                // caps.emit('deleverd',order);  // notified drivers when there is a package to be delivered
                // //caps.emit('vendorDileverd',payload);// notified vendors when my package has been delivered
            });
        setInterval(() => {
            let Paylaod = new payload();
            caps.emit('pickup',Paylaod);
            caps.emit('deleverd',Paylaod)
        },5000);
    })


        //Manages the state of every package lab 11
        // pickup
        /*
        
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
        
        
        */


        module.exports = caps