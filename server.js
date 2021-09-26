const express=  require('express');
const hbs  = require('express-handlebars');

const app = express();


//set middleware
app.use(express.json());
//serve static files
app.use(express.static('./public'));

//set view engine
app.set('view engine','hbs');
app.engine('hbs',hbs({
    extname:'hbs',
    defaultView:'default',
    layoutsDir:__dirname+'/views',
    partialsDir:__dirname+'/views/partials'
}));



//set up controller
app.use('/',require('./server/router/router'));

//connect DB
require('./server/database/db')();

//listen to port
app.listen(3000,()=>console.log("connected succesfully"));
