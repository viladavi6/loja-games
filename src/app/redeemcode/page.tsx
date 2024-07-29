'use client';
import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import styles from '../style/RedeemCode.module.css';

const RedeemCode = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/redeemcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setMessage(`Código resgatado com sucesso! Você recebeu R$${data.amount.toFixed(2)}.`);
      } else {
        const errorData = await response.json();
        setSuccess(false);
        setMessage(errorData.error || 'Erro ao resgatar o código.');
      }
    } catch (error) {
      setSuccess(false);
      setMessage('Erro ao resgatar o código.');
    }
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>Resgatar Código de Gift Card</h1>
      <Form onSubmit={handleRedeem} className={styles.form}>
        <Form.Group className="mb-3">
          <Form.Label>Código do Gift Card</Form.Label>
          <Form.Control
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Digite seu código"
            className={styles.redeemInput}
          />
        </Form.Group>
        <Button type="submit" className={styles.redeemButton}>Resgatar</Button>
      </Form>
      {message && (
        <Alert variant={success ? 'success' : 'danger'} className={styles.alert}>
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default RedeemCode;
