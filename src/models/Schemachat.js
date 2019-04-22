const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user : { type: String },
    message : { type : String }
});

module.exports = mongoose.model('messages', chatSchema);