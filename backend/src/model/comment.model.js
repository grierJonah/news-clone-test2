const mongooose = require('mongoose');
const CommentSchema = require('../schema/comment.schema');

const CommentModel = mongooose.model("comments", CommentSchema);

function addComment(comment) {
    return CommentModel.create(comment);
}

function deleteComment(id) {
    return CommentModel.deleteOne({_id: id});
}

function getCommentById(id) {
    return CommentModel.findOne({_id: id});
}

function editComment(id, new_body) {
    return CommentModel.findOneAndUpdate({_id: id}, {$set: {body: new_body}}, {returnNewDocument: true})
        .then((data) => {console.log("Data successfully edited")},
        error => console.log("Error in model.js", error));
}

function getAllComments() {
    return CommentModel.find().exec();
}

module.exports = {
    addComment,
    deleteComment,
    editComment,
    getAllComments,
    getCommentById,
}