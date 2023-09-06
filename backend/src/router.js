const express = require('express');
const taskController = require('./controllers/taskControllers')
const taskMiddleware = require('./middlewares/taskMiddlewares')

const router = express.Router();

router.get('/tasks', taskController.getAll);
router.get('/tasks/:id', taskController.getId);
router.post('/tasks', taskMiddleware.validateBody, taskController.creatTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:id', taskMiddleware.validateBody, taskController.updateTask);


module.exports = router;