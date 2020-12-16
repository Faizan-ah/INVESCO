const express = require('express');
const mongoose = require('mongoose');
const morgan= require('morgan');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();
const PORT = process.env.PORT || 1111;

const routes = require('./routes/api')
const routesSignup = require('./routes/signin')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/invvesco',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("Mongoose is connected!")
});

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//http request logger
app.use(morgan('tiny'));
// app.use('/api',routes);
app.use('/account',routesSignup)

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
}
//check

app.listen(PORT, console.log(`Server is starting at ${PORT}`));