var express = require('express');
var router = express.Router();
var Contact = require('../model/contact');
var Sequence = require('../model/sequence');

// GET all contacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find().populate('group', 'name email');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while retrieving contacts.',
      error: err
    });
  }
});

// POST a new contact
router.post('/', async (req, res, next) => {
  try {
    const sequence = await Sequence.findOne();
    if (!sequence) {
      return res.status(500).json({
        message: 'Sequence not found.'
      });
    }

    sequence.maxContactId += 1;
    await sequence.save();

    const newContact = new Contact({
      id: sequence.maxContactId.toString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      imageUrl: req.body.imageUrl || '',
      group: req.body.group || []
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while creating the contact.',
      error: err
    });
  }
});

// PUT update a contact
router.put('/:id', async (req, res, next) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || '',
        imageUrl: req.body.imageUrl || '',
        group: req.body.group || []
      },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while updating the contact.',
      error: err
    });
  }
});

// DELETE a contact
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({ id: req.params.id });

    if (!deletedContact) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.status(204).json({
      message: 'Contact deleted successfully.'
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while deleting the contact.',
      error: err
    });
  }
});

module.exports = router; 