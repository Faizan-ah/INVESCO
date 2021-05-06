const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.use(morgan('tiny'));
if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
}
app.use(cors)
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
