import React, { useEffect, useState } from 'react';

const TaskModal = ({ task, isOpen, onClose, onSave }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');

    useEffect(() => {
        if (task) {
            setTitulo(task.titulo);
            setDescricao(task.descricao);
            setData(task.data ? task.data.substr(0, 10) : '');
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...task, titulo, descricao, data });
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Editar Tarefa</h3>
                    <button onClick={onClose} className="text-black close">×</button>
                </div>
                <form onSubmit={handleSubmit} className="mt-5">
                    <label className="block mb-2 text-sm font-bold text-gray-700">Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <label className="block mb-2 text-sm font-bold text-gray-700">Descrição:</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="w-full h-24 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <label className="block mb-2 text-sm font-bold text-gray-700">Data:</label>
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <button type="submit" className="px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline">
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;



