var express = require('express');
var router = express.Router();
var Document = require('../model/document');
var Sequence = require('../model/sequence');

// GET all documents
router.get('/', async (req, res, next) => {
  console.log('Retrieving all documents...');
    try {
    const documents = await Document.find();
    console.log('Retrieved documents:', documents);
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while retrieving documents.',
      error: err
    });
  }
});

// Post a new document
router.post('/', async (req, res, next) => {
  try {
    const sequence = await Sequence.findOne();
    if (!sequence) {
      return res.status(500).json({
        message: 'Sequence not found.'
      });
    }

    sequence.maxDocumentId += 1;
    await sequence.save();

    const newDocument = new Document({
      id: sequence.maxDocumentId.toString(),
      name: req.body.name,
      url: req.body.url,
      description: req.body.description || '',
      children: req.body.children || []
    });

    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while creating the document.',
      error: err
    });
  }
});

// PUT update a document
router.put('/:id', async (req, res, next) => {
  try {
    const updatedDocument = await Document.findOneAndUpdate(
      { id: req.params.id },
      {
        name: req.body.name,
        url: req.body.url,
        description: req.body.description || '',
        children: req.body.children || []
      },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({
        message: 'Document not found.'
      });
    }

    res.status(204).json({
      message: 'Document updated successfully.',
      document: updatedDocument
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while updating the document.',
      error: err
    });
  }
});

// DELETE a document
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedDocument = await Document.findOneAndDelete({ id: req.params.id });

    if (!deletedDocument) {
      return res.status(404).json({
        message: 'Document not found.'
      });
    }

    res.status(204).json({
      message: 'Document deleted successfully.'
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while deleting the document.',
      error: err
    });
  }
});

module.exports = router;