const express = require('express');
const router = express.Router();
const Post = require('../modules/Posts');

//SUBMITS A POST

router.post('/set', async(req, res) => {
    const post = new Post({
        key: req.body.key,
        value: req.body.value,
        headers: {
            'User-Agent': 'MYAPI',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    try {
        const savedPost = await post.save()
        res.json(savedPost);
        console.log("OK")
    } catch (err) {
        res.json({ message: err });
    }
});


//GET BACK ALL THE POSTS
router.get('/get', async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});



//SPECIFIC POST BY POSTID

router.get('/get/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//SPECIFIC POST BY KEY
router.get('/get/:key', async(req, res) => {
    try {
        const post = await Post.findBy(req.params.key);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELTE POST
router.delete('/:postId', async(req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH POST
router.patch('/:postId', async(req, res) => {
    try {
        const updatePost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } });
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;


//60919054a88a5cb1d5526806
//609193d7b83e7fb2ad7604ab
//60920c8634871dcb02a1c6f3
//60920cb2fff3e5cb159b8d14
//60920fc4b2d334cc9aeca525