const express = require('express'),
      router = express.Router(),
      Post = require('../models/post'),
      env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
      config = require('../config/environment')[env];

// ROUTES -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -



// api/posts/list
// Returns all posts from the db as a list or array object
router.get('/list', (req, res) => {
  Post.getAllPosts(function(items) {
    res.json(items);
  });
});

// api/posts/listPopular
// Returns all popular posts from the db as a list or array object
router.get('/listPopular', (req, res) => {
  Post.getPopularPosts(function(items) {
    res.json(items);
  });
});


// api/posts/list
// Returns all posts from the db as a list or array object
router.get('/listUser', (req, res) => {
  let uname = req.body.username;
  Post.getPostByUsername(uname, function(items) {
    res.json(items);
  });
});


// api/posts/add
// creates a new Post object and adds the pos to DB
router.post('/add', (req, res, next) => {
    let newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        username: req.body.username,
        timestamp: new Date().toDateString(),
    });

    Post.addPost(newPost, (err) => {
        if(err){
            res.json({success: false, msg:'Failed to add post!'});
        } else {
            res.json({success: true, msg:'Successfully added post!'});
        }
    });
});

// api/posts/postupvote
// upvotes a specific post that the user clicked.
router.post('/postupvote', (req, res, next) => {
  let pst = {
    uname: req.body.username,
    pid: req.body.pi,
  };

  Post.addUpvote(pst, (err) => {
      if(err){
          res.json({success: false, msg:'Failed to upvote!'});
      } else {
          res.json({success: true, msg:'Successfully downvote!'});
      }
  });
});

// api/posts/postupvote
// upvotes a specific post that the user clicked.
router.post('/postdownvote', (req, res, next) => {
  let pst = {
    uname: req.body.username,
    pid: req.body.pi,
  };

  Post.addDownvote(pst, (err) => {
      if(err){
          res.json({success: false, msg:'Failed to upvote!'});
      } else {
          res.json({success: true, msg:'Successfully downvote!'});
      }
  });
});

// api/posts/edit
// NOT FINISHED
router.put('/put', (req, res, next) => {
  let newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      username: req.body.username,
      timestamp: new Date().toDateString(),
      id: req.body.id,
    });

    Post.editPost(newPost, (err) => {
      if(err){
          res.json({success: false, msg:'Failed to edit post!'});
      } else {
          res.json({success: true, msg:'Successfully edited post!'});
      }
    });
});





// api/posts/del
// TODO app.del('/api/posts/:id', routes.article.del);
router.delete('/delete', (req, res) => {
  console.log(req.body);
  Post.deletePost(req.body.id, (err) => {
    if(err){
        res.json({success: false, msg:'Failed to delete post!'});
    } else {
        res.json({success: true, msg:'Successfully deleted post!'});
    }
  });
});




module.exports = router;
