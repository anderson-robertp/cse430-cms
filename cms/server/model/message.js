var mongoose = require('mongoose');
const { type } = require('os');

// Define the schema for a message
var messageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    subject: { type: String },
    msgText: { type: String, required: true },
    sender: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);