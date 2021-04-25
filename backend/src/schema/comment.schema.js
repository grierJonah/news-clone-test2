const Schema = require('mongoose').Schema;

module.exports = new Schema({
   title: {
       type: String,
       required: true,
   },
   body: {
       type: String, 
       required: true,
   },
   username: {
        type: String,
        index: true,
   },
   commentId: {
       type: Schema.Types.ObjectId,
   },
   date: {
       type: Date,
       default: Date.now(),
   }
}, { collection : 'commenttable' });