//npm packages==================================================================================================
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://test:test@test.o43zk.mongodb.net/test?retryWrites=true&w=majority");
//==============================================================================================================

//create schema model========================================
const todoSchema = new mongoose.Schema({
    item: String
});

let todo = mongoose.model('Todo',todoSchema);
//===========================================================


module.exports = (app) => {
    
    //routing the home page
    const toHome = ["","todo"];
    toHome.forEach((element) => {
        app.get(`/${element}`,(req,res) => {
            //get data from mongooDB and put It into the view.
            todo.find({}, (err, data) => {
                if(err) {console.error(err);return;}
                let decodeData = [];
                data.forEach((element, index) => {
                    decodeData[index] = {item: decodeURIComponent(element.item)};
                });
                res.render('todo', {todos: decodeData})
            })
        });
    
    
        app.post(`/${element}`, urlencodedParser, (req,res) => {
            //get data from requested and put It in mongooDB as collection.
            let newtodo = new todo({item: req.body.item}).save((err, data) =>  {
                if(err){console.error(err);return;}
                res.json(data);
            });
        });
    
    
        app.delete(`/${element}/:item`, (req,res) => {
            //delete the requested item from mongooDB
            todo.find({item: encodeURIComponent(req.params.item)}).remove((err, data) => {
                if(err){throw err;}
                res.json(data);
            });
        });
    });

    //routing the error 404 page
    app.get('/*',(req,res) => {
        res.status(404).render('error404',{path: req.url});
    });
};