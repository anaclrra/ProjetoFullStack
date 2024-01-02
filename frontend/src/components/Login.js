import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:3000/login", {
                email,
                password,
            })
            .then((response) => {
                if (response.status === 200) {
                    const token = response.data.acessToken;
                    const id = response.data.id;
                    onLogin(token, id);
                    navigate('/tasks/user');
                } else {
                    setError(response.data.message);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        
        <div className="container mx-auto p-4 max-w-md ">
            <h1 className="text-3xl font-bold  mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Seu email"
                        value={email}
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Sua senha"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Entrar
                    </button>
                    <Link to="/users" className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-600">
                        Registrar
                    </Link>
                </div>
            </form>

            {error && <p className="error text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default Login;

















/* import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Login = ({onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:3000/login", {
                email,
                password,
            })
            .then((response) => {

                if (response.status === 200) {

                    const token = response.data.acessToken;
                    const id = response.data.id;

                    onLogin(token, id)
                    navigate('/tasks/user');

                } else {

                    setError(response.data.message);
                }
            })
            .catch((error) => {

                setError(error.message);
            });
    };

    return (
        <div className="container">
            <h1 className="text-3xl font-bold underline">Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Entrar</button>
                <Link to="/users">Registrar</Link>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
 */