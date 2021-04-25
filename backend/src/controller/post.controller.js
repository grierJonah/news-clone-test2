const express = require('express');
const router = express.Router();
const PostModel = require('../model/post.model');
const authParser = require('../middleware/middleware_auth.middleware');



router.post('/add_blog_post', (req, res) => {
    console.log("Adding blog:", req.body);
    if(!req.body.title || !req.body.body) {
        return res.status(404).send({message: "Post must contain a title and body!"});
    }
    return PostModel.addBlogPost(req.body)
        .then((success) => res.status(200).send(success)),
        (error) => res.status(500).send(error);
});

router.post('/add_url_post', (req, res) => {
    console.log("Adding url:",req.body);
    if(!req.body.title || !req.body.url) {
        return res.status(404).send({message: "Post must contain a title and url!"});
    }
    return PostModel.addUrlPost(req.body)
        .then((success) =>  (res.status(200).send(success)),
        (error) => res.status(500).send(error));
});

router.get('/getAllPosts', (req, res) => { 
    return PostModel.getAllPosts()
    .then(post => (res.status(200).send(post)),
    (error) => console.log(`Error receiving posts: ${error}`))
});

router.get('/getPost/:title', (req, res) => {
    return PostModel.getPostByPostName(req.params.title)
        .then(post => (res.status(200).send(post)), 
        error => res.status(500).send(error));
})

router.get('/getPostByUser/:username', (req, res) => {
    return PostModel.getPostByUsername(req.params.username)
        .then(post => res.status(200).send(post)),
        error => res.status(500).send(error);
})


router.delete('/getPostById/:id', (req, res) => {
    console.log('Deleting post by id: ', req.params.id);
    return PostModel.deletePost(req.params.id)
        .then(post => (res.status(200).send(post)), 
        error => res.status(500).send(error));
})

router.put('/edit_body_post/:title', (req, res) => {
    console.log("Editing post by title:", req.params);
    const obj = JSON.parse(JSON.stringify(req.body))
    console.log("Editing post body:", obj);


    return PostModel.editPostBody(obj.id, obj.title, obj.body)
        .then(comment => (res.status(200).send(comment)),
        error => res.status(401).send(error));
})

router.put('/edit_url_post/:title', (req, res) => {
    console.log("Editing post by title:", req.params);
    const obj = JSON.parse(JSON.stringify(req.body))
    console.log("Editing post body:", obj);


    return PostModel.editPostBody(obj.id, obj.title, obj.body)
        .then(comment => (omment), res.status(200).send(comment)),
        error => res.status(401).send(error);
})



module.exports = router;