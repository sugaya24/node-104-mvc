const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');
const rootDirectory = require('./util/path');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

//serve file statically
app.use(express.static(path.join(__dirname, 'public')))

//middleware
app.use('/admin',adminRouters);
app.use(shopRouters);

// catch all middleware
app.use((req,res,next)=>{
    // res.status(404).send('<h1>Page not found</h1>');
    res.sendFile(path.join(rootDirectory, 'views', '404.html'));
});

app.listen(5000);
