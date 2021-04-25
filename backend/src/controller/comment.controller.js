const express = require('express');
const router = express.Router();
const CommentModel = require('../model/comment.model');

router.post('/add_comment', (req, res) => {
    console.log("Adding comment:", req.body);
    if(!req.body.body) {
        return res.status(404).send({message: "Comment must contain body!"});
    }
    return CommentModel.addComment(req.body)
        .then((success) => res.status(200).send(success)),
        (error) => res.status(500).send(error)
});

router.get('/get_comments', (req, res) => {
    return CommentModel.getAllComments()
        .then(post => (res.status(200).send(post)),
        (error) => console.log(`Error receiving posts: ${error}`))
})

router.get('/get_comments/:id', (req, res) => {
    console.log('Getting comment by id:', req.params);
    return CommentModel.getCommentById(req.params.id)
        .then(comment => (res.status(200).send(comment)),
        error => res.status(500).send(error));
});

router.delete('/get_comments/:id', (req, res) => {
    console.log('Deleting comment by id: ', req.params);
    return CommentModel.deleteComment(req.params.id)
        .then(comment => (res.status(200).send(comment)),
        error => res.status(500).send(error));

})

router.put('/edit_comment/:id', (req, res) => {
    console.log("Editing comment by id:", req.params);
    const obj = JSON.parse(JSON.stringify(req.body))
    console.log("Editing comment body:", obj);


    return CommentModel.editComment(req.params.id, obj.body)
        .then(comment => (res.status(200).send(comment)),
        error => res.status(401).send(error));
})

module.exports = router;