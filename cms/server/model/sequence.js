const mongoose = require('mongoose');

// Define the schema for a sequence
const sequenceSchema = new mongoose.Schema({
    maxDocumentId : { type: Number, default: 0 },
    maxMessageId: { type: Number, default: 0 },
    maxContactId: { type: Number, default: 0 }
});

// Export the Sequence model based on the sequence schema
module.exports = mongoose.model('Sequence', sequenceSchema);