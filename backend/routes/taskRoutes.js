const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

// Protect all routes below with authentication
router.use(authController.verifyToken);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/filter', taskController.filterTasks);
router.get('/search', taskController.searchTasks);

module.exports = router;
