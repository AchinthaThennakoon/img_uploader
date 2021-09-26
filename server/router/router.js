const rout = require('express').Router();
const controller = require('../controller/controller')
const store = require('../middleware/multer')
//routers
rout.get('/',controller.index);

rout.post('/uploadmultiple',store.array('images',4),controller.upload); 

module.exports = rout;