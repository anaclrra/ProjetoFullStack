const userModel = require('../models/userModel');

const getAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

};

const getId = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await userModel.getId(id);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

};

const creatUser = async (req, res) => {
    try {
        const createduser = await userModel.creatUser(req.body);
        return res.status(201).json(createduser);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteUser = async (req, res) => {

    const { id } = req.params;
    try {
        await userModel.deleteUser(id);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userModel.updateUser(id, req.body);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    getId,
    creatUser,
    deleteUser,
    updateUser
};