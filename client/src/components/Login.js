import { useState } from 'react';
import axios from '../api/axios';
import { Navigate, useNavigate } from 'react-router-dom';

const REGISTER_URL = '/login'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (localStorage.getItem('token') !== null) {
    navigate('/'); // Redireciona para a página inicial
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(REGISTER_URL, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Falha no login: ', error);
    }
  };


  return (
    <div class="container-sm">
      <h2>Login</h2>
      <input class="form-control mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input class="form-control mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin} class="btn btn-primary">Login <i class="bi bi-box-arrow-in-right my-2"/></button>
    </div>
  );
};

export default Login;
