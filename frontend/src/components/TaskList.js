import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import CreateTask from './CreateTask';
import TaskModal from './TaskModal';

const Tasks = ({ id, token }) => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const fetchTasks = useCallback(async () => {
        if (id && token) {
            try {
                const response = await fetch('http://localhost:3000/tasks/user', {
                    headers: {
                        'x-access-token': token
                    }
                });
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        }
    }, [id, token]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleEdit = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedTask) => {
        const bodyData = {
          title: updatedTask.titulo,
          descricao: updatedTask.descricao,
          date: updatedTask.data
        };

        try {
            const response = await fetch(`http://localhost:3000/tasks/${updatedTask.idTask}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            await fetchTasks();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    };

    const handleTaskCreated = async () => {
        await fetchTasks();
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            });
            if (response.ok) {
                await fetchTasks();
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black-100 px-4">
            <div className="flex flex-wrap justify-between items-start w-full max-w-6xl mx-auto">
                <div className="w-full lg:w-1/3 px-2 mb-8">
                    <CreateTask userId={id} onTaskCreated={handleTaskCreated} />
                </div>
                <div className="w-full lg:w-2/3 px-2">
                    <div className="bg-white shadow-lg rounded-sm border border-gray-200">
                    <div className="overflow-auto max-h-[300px]">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-700 tracking-wider">Título</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-700 tracking-wider">Descrição</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-700 tracking-wider">Criada Em</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-700 tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task.idTask}>
                                        <td className="px-6 py-4 border-b border-gray-300 text-sm">{task.titulo}</td>
                                        <td className="px-6 py-4 border-b border-gray-300 text-sm">{task.descricao}</td>
                                        <td className="px-6 py-4 border-b border-gray-300 text-sm">{formatDate(task.data)}</td>
                                        <td className="px-6 py-4 border-b border-gray-300 text-sm">
                                            <button className="py-2 px-4 rounded text-sm"
                                                onClick={() => handleEdit(task)}>
                                                <FontAwesomeIcon icon={faEdit} className="mr-2 text-yellow-700 hover:text-purple-700" />
                                            </button>
                                            <button className=" py-2 px-4 rounded text-sm"
                                                onClick={() => handleDelete(task.idTask)}>
                                                <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-700 hover:text-purple-700" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
    
            <TaskModal
                task={currentTask}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
    
};

export default Tasks;


/* import React, { useCallback, useEffect, useState } from 'react';
import CreateTask from './CreateTask';

const Tasks = ({ id, token }) => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const fetchTasks = useCallback(async () => {
      if (id && token) {
          try {
              const response = await fetch('http://localhost:3000/tasks/user', {
                  headers: {
                      'x-access-token': token
                  }
              });
              if (!response.ok) {
                  throw new Error(`Erro HTTP: ${response.status}`);
              }
              const data = await response.json();
              setTasks(data);
          } catch (error) {
              console.error("Erro ao buscar tarefas:", error);
          }
      }
  }, [id, token]);

  useEffect(() => {
      fetchTasks();
  }, [fetchTasks]);

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  ;

  const handleSave = async (updatedTask) => {
    // Aqui você deve implementar a lógica para salvar a tarefa atualizada
    setIsModalOpen(false);
};

  const handleTaskCreated = async () => {
      await fetchTasks();
  };

  const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                }
            });
            if (response.ok) {
                await fetchTasks();
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
  };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="mb-8">
                <CreateTask userId={id} onTaskCreated={handleTaskCreated} />
            </div>
            <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Titulo</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Descrição</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Criada Em</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.idTask}>
                                <td className="px-6 py-4 border-b border-gray-500 text-sm">{task.titulo}</td>
                                <td className="px-6 py-4 border-b border-gray-500 text-sm">{task.descricao}</td>
                                <td className="px-6 py-4 border-b border-gray-500 text-sm">{formatDate(task.data)}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(task)}>Editar</button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
                                        onClick={() => handleDelete(task.idTask)}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}}

export default Tasks;
 */