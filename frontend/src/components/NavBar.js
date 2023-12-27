import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
    return (
        <nav className="bg-blue-500 text-white p-4">
            <ul className="flex justify-between">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/tasks/user">Ver Tarefas</Link>
                        </li>
                        <li>
                            <Link to="/tasks/create">Criar Tarefa</Link>
                        </li>
                        <li>
                            <Link to="/tasks/update">Atualizar Tarefa</Link>
                        </li>
                        <li>
                            <Link to="/tasks/delete">Apagar Tarefa</Link>
                        </li>
                        {/* Outros links que devem aparecer quando o usuário estiver logado */}
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/users">Registrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
