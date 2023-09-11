const {Schema, model} = require('mongoose');

const docSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true,
        index: true
    }
});

module.exports = model('Doc', docSchema);
