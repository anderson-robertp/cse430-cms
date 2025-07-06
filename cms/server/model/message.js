var mongoose = require('mongoose');

// Define the schema for a message
var messageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    subject: { type: String },
    msgText: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true }
});

module.exports = mongoose.model('Message', messageSchema);