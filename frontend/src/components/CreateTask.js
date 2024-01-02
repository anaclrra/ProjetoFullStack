import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const CreateTask = ({ userId, onTaskCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        descricao: '',
        date: '',
        user: userId
    });

    
    const getCurrentFormattedDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}${month}${day}`;
    };

    
    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: getCurrentFormattedDate()
        }));
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, date: getCurrentFormattedDate() })
            });

            if (response.ok) {
                const newTask = await response.json();
                onTaskCreated(newTask);

                setFormData({
                    title: '',
                    descricao: '',
                    date: getCurrentFormattedDate(),
                    user: userId
                });
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    return (
        <div className="create-task-form p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <textarea
                        id="description"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 sm:text-sm"
                    />
                </div>
                <input
                    type="hidden"
                    name="date"
                    value={formData.date}
                />
                <button type="submit" className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:border-purple-700 focus:ring-purple active:bg-purple-700 transition duration-150 ease-in-out">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Tarefa
                </button>
            </form>
        </div>
    );
    
};

export default CreateTask;








/* import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const CreateTask = ({ userId, onTaskCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        descricao: '',
        date: '',
        user: userId
    });

    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
   

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newTask = await response.json();
                onTaskCreated(newTask);

                setFormData({
                    title: '',
                    descricao: '',
                    date: '',
                    user: userId
                });

            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.log(formData)
            console.error('Erro ao criar tarefa:', error);
        }
    };


    return (
        <div className="create-task-form">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-grow">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <textarea
                        id="description"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 sm:text-sm"
                    />
                </div>
                <button type="submit" className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring-purple active:bg-blue-700 transition duration-150 ease-in-out">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar
                </button>
            </form>
        </div>
    );
    

};

export default CreateTask;




/* import React, { useState } from 'react';

const CreateTask = ({ userId, onTaskCreated }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        data: '',
        user: userId
        
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseData = await response.json();
                onTaskCreated(responseData);
                
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    return (
        <div className="create-task-form">
            <h2>Criar Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.titulo}
                        onChange={(e) => setFormData(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        value={formData.descricao}
                        onChange={(e) => setFormData(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="date">Data:</label>
                    <input
                        type="text"
                        id="date"
                        value={formData.data}
                        onChange={(e) => setFormData(e.target.value)}
                        placeholder="YYYYMMDD"
                    />
                </div>
                <button type="submit">Criar Tarefa</button>
            </form>
        </div>
    );
};

export default CreateTask;
 */ 