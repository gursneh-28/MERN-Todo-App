const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createTodo,
  getTodo,
  getTodoById,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

router.use(authMiddleware);

router.post('/', createTodo);          
router.get('/', getTodo);             
router.get('/:id', getTodoById);       
router.patch('/:id', updateTodo);      
router.delete('/:id', deleteTodo);     

module.exports = router;