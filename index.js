var express = require('express');
var mongoose = require('mongoose');
//Pull information from the HTML POST
var bodyParser = require('body-parser');
var Brand = require('./models/brand');

var app = express();
//parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({extended: false}));
//parse application/json
app.use(bodyParser.json());

var options = {
    user: 'myTester',
    pass: 'xyz123',
    useNewUrlParser: true
}
mongoose.connect('mongodb://localhost:27017/ecommercedb', options);

var db = mongoose.connection;

//Defining routes here
app.get('/', function(req, res){
    res.send('Welcome to Admin Portal!!');
})

app.get('/api/brands', function(req, res){
    Brand.getBrands(function(err, data){
        if(err){
            throw err;
        }
        else{
            res.json(data);
        }
    })
})

app.get('/api/brands/:id', function(req, res){
    Brand.getBrandsById(req.params.id, function(err, data){
        if(err){
            throw err;
        }
        else{
            res.json(data);
        }
    })
})
// direct way of calling the mongoose method inside the API, without calling the user defined method
app.get('/api/brands1/:id', function(req, res){
    Brand.findById(req.params.id, function(err, data){
        if(err){
            throw err;
        }
        else{
            res.json(data);
        }
    })
})

app.post('/api/brands', function(req, res){
    Brand.create(req.body, function(err, data){
        if(err){
            throw err;
        }
        else{
            console.log('Document Posted Successfully');
            res.json(data);
        }
    })
})

app.put('/api/brands/:id', function(req, res){
    Brand.findByIdAndUpdate(req.params.id, req.body, function(err, data){
        if(err){
            throw err;
        }
        else{
            console.log('Document Updated Successfully');
            res.json(data);
        }
    })
})

app.delete('/api/brands/:id', function(req, res){
    var query = {
        _id: req.params.id
    }
    Brand.remove(query, function(err, data){
        if(err){
            throw err;
        }
        else{
            console.log('Document Deleted Successfully');
            res.json(data);
        }
    })
})



var server = app.listen(3000, function(){
    console.log('Server is running at port 3000');
})