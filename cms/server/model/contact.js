const mongoose = require('mongoose');

// Define the schema for a contact
const contactSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    imageUrl: { type: String },
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

// Export the Contact model based on the contact schema
module.exports = mongoose.model('Contact', contactSchema);