const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    message: {
        type: String,
        required: 'Message is a required field.',
    }
});

module.exports = mongoose.model('Item', itemSchema);