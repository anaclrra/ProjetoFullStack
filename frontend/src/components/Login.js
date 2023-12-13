import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
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
                    localStorage.setItem("token", token);
                    localStorage.setItem('id', id);
                    console.log("entrou");

                    navigate(`/tasks/user/${id}`);
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
            <h1>Login</h1>

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
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
