// Login.js
import React from 'react';
import styles from '../style/Login.module.css'; 
import Image from 'next/image';

const Login = () => {
  return (
    <div className={styles.container}> 
      <div className={styles.backg}>
        <Image src={"/img/logo.png"} width={100} height={80} alt={"TakeControl"} />
        <form className={styles.form}>
          <h2>Entrar ou Cadastrar</h2>
          <div>
            <label htmlFor="username">Usuário:</label>
            <input type="text" id="username" />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Entrar</button>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
