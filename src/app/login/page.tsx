import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import styles from '../style/Login.module.css';

const Login = () => {
  return (
    <div className={styles.container}> 
      <div className={styles.backg}>
        <Image src="/img/logo.png" width={100} height={80} alt="TakeControl" />
        <form className={styles.form}>
          <h2 className={styles.title}>Entrar ou Cadastrar</h2>
          <div>
            <input type="text" id="username" placeholder="usuário" />
          </div>
          <div>
            <input type="password" id="password" placeholder="senha" />
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