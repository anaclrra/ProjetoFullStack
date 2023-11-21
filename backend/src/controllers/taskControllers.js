const taskModel = require('../models/taskModel');

const getAll = async (req, res) => {
    try {
        const tasks = await taskModel.getAll();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

};

const getId = async (req, res) => {
    const { id } = req.params;
    try {
        const tasks = await taskModel.getId(id);
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

};

const creatTask = async (req, res) => {
    try {
        const createdtask = await taskModel.creatTask(req.body);
        return res.status(201).json(createdtask);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteTask = async (req, res) => {

    const { id } = req.params;
    try {
        await taskModel.deleteTask(id);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        await taskModel.updateTask(id, req.body);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    getId,
    creatTask,
    deleteTask,
    updateTask
};