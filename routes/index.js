var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/albums', function(req, res, next) {
  knex('albums').then(function(records) {
    res.render('albums', {
      albums: records
    });
  });
});

var getGenres = function() {
  return [{
      value: 'poop',
      title: 'Poop'
    }, {
      value: 'rock',
      title: 'Rock'
    }, {
      value: 'rnb',
      title: 'R\' n\' B'
    },
  ]
}

router.get('/albums/creator', function(req, res, next) {
  res.render('creator', { genres: getGenres() } )
});

router.get('/albums/:id', function(req, res, next) {
  knex('albums').where('id', req.params.id).then(function(records) {
    res.render('info', {albums: records});
  });
});

router.get('/albums/edit/:id', function(req, res, next) {
  knex('albums').where('id', req.params.id).then(function(records) {
    res.render('edit', { albums: records[0] ,  genres: getGenres() } );
  });
});

router.post('/albums/edit/:id', function(req, res, next) {
  console.log(req.body);
  knex('albums').where('id', req.params.id).update(req.body).then(function(records) {
    res.redirect('/albums')
  });
});

router.post('/albums', function(req, res, next) {
  knex('albums').insert(req.body).then(function() {
    res.redirect('/albums');
  })
});

router.post('/albums/:id/delete', function(req, res, next) {
  knex('albums').where('id', req.params.id).del().then(function() {
    res.redirect('/albums');
  })
})

module.exports = router;
