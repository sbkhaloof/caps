"use strict";
const events = require("../events");
const supertest = require("supertest");

require('dotenv').config();
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3001';
const socket=io.connect(`${HOST}/caps`);

let payload=
{ store: '1-206-flowers',
  orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Jamal Braun',
  address: 'Schmittfort, LA' } 

jest.useFakeTimers();

describe("caps test", () => {
    it('connection',()=>{
        const caps = require("../caps");
        caps.emit('connection',payload);
        expect( caps.emit('connection',payload)).toEqual(true);
    });
});
describe("driver test", () => {
    it('transit',()=>{
        socket.emit('transit',payload);
        expect( socket.emit('transit',payload).sendBuffer[0].data[1].orderID)
        .toEqual(payload.orderID);
    });

});
describe("vendor test", () => {
    it('transit',()=>{
        socket.emit('vendorDileverd',payload);
        expect( socket.emit('vendorDileverd',payload).sendBuffer[0].data[1].orderID)
        .toEqual(payload.orderID);
    });

});
//----------------test lab 11----------------------
// describe("caps test", () => {

//     it('pickup',()=>{
//         const caps = require("../caps");
//         caps.emit('pickup',payload);
//         expect( caps.emit('pickup',payload)).toEqual(true);
//     });

//     it('transit',()=>{
//         const caps = require("../caps");
//         caps.emit('transit',payload);
//         expect( caps.emit('transit',payload)).toEqual(true);
//     });

//     it('transit',()=>{
//         const caps = require("../caps");
//         caps.emit('deleverd',payload);
//         expect( caps.emit('deleverd',payload)).toEqual(true);
//     });
// });

// describe("driver test", () => {
//     it('transit',()=>{
//         const driver = require("../models/driver");
//         driver.emit('transit',payload);
//         expect( driver.emit('transit',payload)).toEqual(true);
//     });

//     it('transit',()=>{
//         const driver = require("../models/driver");
//         driver.emit('driverTransit',payload);
//         expect( driver.emit('driverTransit',payload)).toEqual(true);
//     });

// });


// describe("driver test", () => {
//     it('transit',()=>{
//         const vendor = require("../models/vendor");
//         vendor.emit('vendorDileverd',payload);
//         expect( vendor.emit('vendorDileverd',payload)).toEqual(true);
//     });

//  });