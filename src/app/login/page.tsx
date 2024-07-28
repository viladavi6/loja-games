"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import styles from '../style/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('email', data.user.email); // Armazena o email do usuário na sessão
        window.location.href = '/'; // Redireciona para a página inicial
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}> 
      <div className={styles.backg}>
        <Image src="/img/logo.png" width={100} height={80} alt="TakeControl" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Entrar ou Cadastrar</h2>
          {error && <p className={styles.error}>{error}</p>}
          <div>
            <input type="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="password" id="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Entrar</button>
          <Link href="/register">
            <button type="button">Cadastrar</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
