//npm packages
const express = require('express');


//my js modules
const todoController = require('./controllers/todoController');


//create express server
const app = express();
const port = process.env.PORT || 5000;


//middleware
    //static file
    app.use(express.static('./public'));

    //methods
    app.set('view engine','ejs');

    const infoClient = app.use((req,res,next) => {
        console.info(`url: ${req.url} :: method ${req.method}`);
        next();
    });
    


//fire controler
todoController(app);


//server listening...
app.listen(port,() => {
    console.info(`listen to the port: ${port}`);
});