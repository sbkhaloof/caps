'use strict';

const port = process.env.PORT || 3000;

const io = require('socket.io')(port)
const uuid=require('uuid').v4;
const msgQueue = {
    orders:{}
}

const caps=io.of('/caps')

caps.on('connection',socket=>{
    console.log('Conected Sucsses',socket.id);

socket.on('pickup',pickup)
function pickup(payload){
    console.log('adding new order ,,,,,',payload.orderID)
const id=uuid();
console.log('ID========',id);
msgQueue.orders[id]=payload;
socket.emit('add',payload);
caps.emit('order',{id:id,payload:msgQueue.orders.id})
console.log('after adding msg queue',msgQueue.orders);
let order={
    event:'pickup',
    time:new Date(),
    payload
}
console.log('Event',order);
}
socket.on('get-all',()=>{
    console.log('get all :driver has order');
    Object.keys(msgQueue.orders).forEach(id=>{
        socket.emit('order,',{id:id,payload:msgQueue.orders.id})
    })
})
socket.on('received',msg=>{
    console.log('received on queue will remove it ....');
    // remove after received 
    delete msgQueue.orders[msg.id];
    console.log('after delete msg queue ',msgQueue.orders);
})

// for transit 
socket.on('InTransit',inTransit)
function inTransit(payload){
    let order={
        event:'InTransit',
        time:new Date,
        payload
    }
    console.log('Event',order);
}
socket.on('delivered',delivered)
function delivered(payload){
    let order={
        event:'InTransit',
        time:new Date,
        payload
    }
    console.log('Event',order);
    caps.emit('delivered',payload)
}


});