const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Message = require('../models/Message');
const router = express.Router();

// Send a new message
router.post('/send', authMiddleware, async (req, res) => {
  const { content, chatId } = req.body;

  try {
    const newMessage = new Message({
      sender: req.user.id,
      content,
      chatId,
    });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
