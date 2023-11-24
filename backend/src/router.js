const express = require('express');
const taskController = require('./controllers/taskControllers');
const userController = require('./controllers/userController');
const tokenController = require('./controllers/tokenController');
const middleware = require('./middlewares/taskMiddlewares');


const router = express.Router();

router.get('/tasks', middleware.verificarToken, taskController.getAll);
router.get('/users', middleware.verificarToken, userController.getAll);

router.get('/tasks/:id', middleware.verificarToken, taskController.getId);
router.get('/users/:id', middleware.verificarToken, userController.getId);
router.get('/tasks/user/:id', middleware.verificarToken, taskController.getTaskByUser);


router.post('/tasks', middleware.validateBody, taskController.creatTask);
router.post('/users', middleware.validateBodyUser, userController.creatUser);
router.post('/login', tokenController.login);

router.delete('/tasks/:id', middleware.verificarToken, taskController.deleteTask);
router.delete('/users/:id', middleware.verificarToken, userController.deleteUser);

router.put('/tasks/:id', middleware.validateBodyForUpdate, middleware.verificarToken, taskController.updateTask);
router.put('/users/:id', middleware.validateBodyUser, middleware.verificarToken, userController.updateUser);


module.exports = router;