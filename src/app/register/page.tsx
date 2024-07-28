"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../style/Register.module.css'; 
import Image from 'next/image';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    birthdate: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          cpf: formData.cpf,
          birthdate: formData.birthdate,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        alert('User registered successfully');
        router.push('/login');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className={styles.container}> 
      <div className={styles.backg}>
        <Image src="/img/logo.png" width={100} height={80} alt="TakeControl" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Cadastrar</h2>
          <div>
            <input type="text" id="username" placeholder="Usuário" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <input type="password" id="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <input type="password" id="confirmPassword" placeholder="Confirmar Senha" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <div>
            <input type="text" id="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} />
          </div>
          <div>
            <input type="date" id="birthdate" placeholder="Data de Nascimento" value={formData.birthdate} onChange={handleChange} />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
