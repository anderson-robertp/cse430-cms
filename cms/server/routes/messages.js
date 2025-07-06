var express = require('express');
var router = express.Router();
var Message = require('../model/message');
var Sequence = require('../model/sequence');

// GET all messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find().populate('sender', 'name email');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while retrieving messages.',
      error: err
    });
  }
});

// POST a new message
router.post('/', async (req, res, next) => {
  try {
    const sequence = await Sequence.findOne();
    if (!sequence) {
      return res.status(500).json({
        message: 'Sequence not found.'
      });
    }

    sequence.maxMessageId += 1;
    await sequence.save();

    const newMessage = new Message({
      id: sequence.maxMessageId.toString(),
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while creating the message.',
      error: err
    });
  }
});

// PUT update a message
router.put('/:id', async (req, res, next) => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { id: req.params.id },
      {
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
      },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        message: 'Message not found.'
      });
    }

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while updating the message.',
      error: err
    });
  }
});

// DELETE a message
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedMessage = await Message.findOneAndDelete({ id: req.params.id });

    if (!deletedMessage) {
      return res.status(404).json({
        message: 'Message not found.'
      });
    }

    res.status(200).json({
      message: 'Message deleted successfully.'
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while deleting the message.',
      error: err
    });
  }
});

module.exports = router; 