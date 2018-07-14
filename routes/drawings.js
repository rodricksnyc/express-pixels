var express = require('express');
var router = express.Router();
var Drawing = require('../models/drawing');


//create a show route for all of the drawings
router.get('/', function(req, res) {
    Drawing.find(function(err, drawings) {
        res.render('drawings/index', { drawings: drawings });
    });
})

// 'Create' route for saving a drawing to the db
router.post('/', function(req, res) {
  let title = req.body.title;
  let image = req.body.saving;


  Drawing.create({ title: title, image: image }, function(err) {
    res.redirect('/drawings');
    console.log(req.body);
  });
});

// 'New' route that displays a form for a user to add a new post
router.get('/new', function(req, res) {
  res.render('drawings/new');
});

// 'Show' route for displaying the data from one drawing
router.get('/:id', function(req, res) {
    let id = req.params.id;

    Drawing.findById(id, function(err, drawing) {
      res.render('drawings/show', { drawing: drawing });
    });
  });

  // 'Update' route that changes the image and title
router.put('/:id', function(req, res) {
    let id = req.params.id;
    let title = req.body.title;
    let image = req.body.saving;

    Drawing.findByIdAndUpdate(id, { title: title, image: image }, function(err, drawing) {
        res.redirect('/drawings');
    });
  });


  // 'Delete' route that removes an image
router.delete('/:id', function(req, res) {
    let id = req.params.id;

    Drawing.findByIdAndRemove(id, function(err) {
      res.redirect('/drawings');
    });
  });

module.exports = router;
