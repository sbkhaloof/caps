'use strict'
const Events=require('events');
// this is a singleton for the events class
const events=new Events();// only one instance created

module.exports=events;