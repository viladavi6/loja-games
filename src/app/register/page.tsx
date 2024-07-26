import React from 'react';
import styles from '../style/Register.module.css'; 
import Image from 'next/image';

const Register = () => {
  return (
    <div className={styles.container}> 
      <div className={styles.backg}>
        <Image src="/img/logo.png" width={100} height={80} alt="TakeControl" />
        <form className={styles.form}>
          <h2 className={styles.title}>Cadastrar</h2>
          <div>
            <input type="text" id="username" placeholder="Usuário" />
          </div>
          <div>
            <input type="email" id="email" placeholder="Email" />
          </div>
          <div>
            <input type="password" id="password" placeholder="Senha" />
          </div>
          <div>
            <input type="password" id="confirmPassword" placeholder="Confirmar Senha" />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
