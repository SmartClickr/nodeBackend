var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://test:test@ds113626.mlab.com:13626/clickr_database',['Polls']);

//POLLS-----------------------------------------------

router.get('/')

//get all polls
router.get('/polls', function(req,res,next){
	db.polls.find(function(err,Polls){
		if(err){
			res.send(err)
		} 
		console.log(Polls)
		res.json(Polls);
	})
})

//get a single poll
router.get('/polls/:id', function(req, res, next){
	console.log(mongojs.ObjectId(req.params.id))
    db.polls.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, poll){
        if(err){
            res.send(err);
        }
        
        pol = res.json(poll);
        // res.json(poll.description);
        // res.json(poll.start_date);
        // res.json(poll.end_date);
        // res.json(poll.start_time);
        // res.json(poll.end_time);
    });
});

//create a poll
router.post('/polls', function(req, res, next){
    var poll = req.body;
    if(!poll.title ){
        res.status(400);
        res.json({
            "error": "no data"
        });
    } else {
        db.polls.save(poll, function(err, poll){
            if(err){
                res.send(err);
            }
            res.json(poll);
        });
    }
});

// Delete a poll
router.delete('/polls/:id', function(req, res, next){
    db.polls.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, poll){
        if(err){
            res.send(err);
        }
        res.json(poll);
    });
});

//GRAPHS
//get all graphs
router.get('/graphs', function(req,res,next){
	db.graphs.find(function(err,graphs){
		if(err){
			res.send(err)
		} 
		console.log(graphs)
		res.json(graphs);
	})
})

//get a single graph
router.get('/graphs/:id', function(req, res, next){
    db.graphs.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, graph){
        if(err){
            res.send(err);
        }
        res.json(graph);
    });
});

//create a graph
router.post('/graphs', function(req, res, next){
    var graph = req.body;
    if(!graph.title ){
        res.status(400);
        res.json({
            "error": "no data"
        });
    } else {
        db.graphs.save(poll, function(err, graph){
            if(err){
                res.send(err);
            }
            res.json(graph);
        });
    }
});

// Delete a graph
router.delete('/graphs/:id', function(req, res, next){
    db.polls.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, graph){
        if(err){
            res.send(err);
        }
        res.json(graph);
    });
});

module.exports = router;