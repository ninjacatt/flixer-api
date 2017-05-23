const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../config/auth');

const router = express.Router();

// Get user by ID
router.get('/:id', auth.basic, UserController.find_user_by_id);

// Save
router.post('/', UserController.save_user);

// Delete
router.delete('/:id', UserController.delete_user);

module.exports = router;

