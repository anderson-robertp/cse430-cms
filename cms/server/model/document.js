const mongoose = require('mongoose');

// Define the schema for a document
const documentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, default: '' },
    children: { type: Array, default: [] }
});

// Export the Document model based on the document schema
module.exports = mongoose.model('Document', documentSchema);