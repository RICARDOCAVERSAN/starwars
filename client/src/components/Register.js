import { useState } from 'react';
import axios from '../api/axios';
import { Navigate, useNavigate } from 'react-router-dom';

const REGISTER_URL = '/register'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (localStorage.getItem('token') !== null) {
    navigate('/'); 
  }

  const handleRegister = async () => {
    try {
      const response = await axios.post(REGISTER_URL, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      if (!error?.response){
        console.log('Sem resposta do Servidor')
      }else if(error.response?.status === 409){
        console.log('Email aceito')
      }else{
        console.log('Falha no registro: '+error.response?.status)
      }
    }
  };

  return (
    <div class="container-sm">
      <h2>Register</h2>
      <input class="form-control mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input class="form-control mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister} class="btn btn-primary">Register <i class="bi bi-box-arrow-in-right my-2"/></button>
    </div>
  );
};

export default Register;
