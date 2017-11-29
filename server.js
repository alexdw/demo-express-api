const express = require('express') 
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1";
const app = express()
var options = { useMongoClient: true}     
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(uri, options);

var restaurantSchema = mongoose.Schema({
	name: String,
	type: String
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

app.get('/api/restaurants', function (req, res) { 
    var all = Restaurant.find(function (err, result) {
        if (err) return console.error(err);
        res.json(result)
    })
})

app.post('/api/restaurants', function (req, res) { 
    json = req.body
    var restaurant = new Restaurant({
        name: json.name,
        type: json.type,
    })
    restaurant.save()
    res.json({complete: true})
})

app.put('/api/restaurants/:id', function (req, res) { 
    // TODO
})

app.get('/api/restaurants/:id', function (req, res) { 
    // TODO
})

app.delete('/api/restaurants/:id', function (req, res) {
    var id = req.params.id
    Restaurant.findByIdAndRemove(id, function(err, result) {
        res.json({complete: true})
    });
})

db.on('error',function(){
	console.log("Error al conectarse a MongoDB")
});

db.once('open', function() {
    console.log("Conectado a MongoDB")
})
app.listen(3000, function () {
    console.log('Servidor activo en http://localhost:3000!')
})