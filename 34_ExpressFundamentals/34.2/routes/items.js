const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');

// GET /items - Get list of items
router.get('/', (req, res, next) => {
  try {
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

// POST /items - Add new item
router.post('/', (req, res, next) => {
  try {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (err) {
    return next(err);
  }
});

// GET /items/:name - Get item by name
router.get('/:name', (req, res, next) => {
  try {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) {
      throw { status: 404, message: "Item not found" };
    }
    return res.json(foundItem);
  } catch (err) {
    return next(err);
  }
});

// PATCH /items/:name - Update item by name
router.patch('/:name', (req, res, next) => {
  try {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) {
      throw { status: 404, message: "Item not found" };
    }
    foundItem.name = req.body.name || foundItem.name;
    foundItem.price = req.body.price || foundItem.price;
    return res.json({ updated: foundItem });
  } catch (err) {
    return next(err);
  }
});

// DELETE /items/:name - Delete item by name
router.delete('/:name', (req, res, next) => {
  try {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    if (itemIndex === -1) {
      throw { status: 404, message: "Item not found" };
    }
    items.splice(itemIndex, 1);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;