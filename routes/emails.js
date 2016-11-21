var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/remindme');

router.get('/', function(req, res){
    var collection = db.get('emails');
    collection.find({}, function(err, emails){
        if (err) throw err;
      	res.json(emails);
    });
});

router.get('/:address', function(req, res){
	var collection = db.get('emails');
	collection.find({ address: req.params.address }, function(err, email){
		if (err) throw err;
		
		res.json(email);
	});
});

router.get('/id/:id', function(req, res){
	var collection = db.get('emails');
	collection.findOne({ _id: req.params.id }, function(err, email){
		if (err) throw err;
		
		res.json(email);
	});
});

router.put('/id/:id', function(req, res){
	var collection = db.get('emails');
	collection.update({ _id: req.params.id }, {
		address: req.body.address,
		reminder: req.body.reminder,
		date: req.body.date
	}, function(err, email){
		if (err) throw err;
		
		res.json(email);
	});
});

router.post('/', function(req, res){
    var collection = db.get('emails');
    collection.insert({
        address: req.body.address,
        reminder: req.body.reminder,
		date: req.body.date
    }, function(err, email){
        if (err) throw err;

        res.json(email);
    });
});

router.delete('/id/:id', function(req, res){
	var collection = db.get('emails');
    collection.remove({ _id: req.params.id }, function(err, email){
        if (err) throw err;

        res.json(email);
    });
});

module.exports = router;