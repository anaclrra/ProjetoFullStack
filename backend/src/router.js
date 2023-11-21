const express = require('express');
const taskController = require('./controllers/taskControllers')
const userController = require('./controllers/userController')
const middleware = require('./middlewares/taskMiddlewares')

const router = express.Router();

router.get('/tasks', taskController.getAll);
router.get('/users', userController.getAll);

router.get('/tasks/:id', taskController.getId);
router.get('/users/:id', userController.getId);

router.post('/tasks', middleware.validateBody, taskController.creatTask);
router.post('/users', middleware.validateBodyUser, userController.creatUser);

router.delete('/tasks/:id', taskController.deleteTask);
router.delete('/users/:id', userController.deleteUser);

router.put('/tasks/:id', middleware.validateBody, taskController.updateTask);
router.put('/users/:id', middleware.validateBodyUser, userController.updateUser);


module.exports = router;