'use client';
import { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import styles from '../style/Library.module.css';

const Library = () => {
  const [libraryItems, setLibraryItems] = useState<{ title: string; img: string; link: string; }[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch('/api/library');
        if (response.ok) {
          const data = await response.json();
          setLibraryItems(data);
        } else {
          console.error('Failed to fetch library');
        }
      } catch (error) {
        console.error('Error fetching library:', error);
      }
    };

    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/user/saldo');
        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance);
        } else {
          console.error('Failed to fetch balance');
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchLibrary();
    fetchBalance();
  }, []);

  const handleInstall = async (title: string, price: number) => {
    if (price > balance) {
      alert('Saldo insuficiente para instalar este jogo.');
      return;
    }

    // Aqui você pode adicionar a lógica para instalar o jogo, por exemplo, adicionando-o ao carrinho ou à biblioteca
    alert(`Instalando ${title}...`);
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.libraryTitle}>Minha Biblioteca</h1>
      <ListGroup className={styles.listGroup}>
        {libraryItems.length > 0 ? (
          libraryItems.map((item, index) => (
            <ListGroup.Item key={index} className={styles.libraryItem}>
              <div className={styles.gameInfo}>
                <img src={item.img} alt={item.title} className={styles.gameImage} />
                <a href={item.link} className={styles.gameTitle}>{item.title}</a>
                <Button
                  className={styles.installButton}
                  onClick={() => handleInstall(item.title, 10)} // Supondo que o preço seja 10, ajuste conforme necessário
                >
                  Instalar
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Nenhum jogo na biblioteca.</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default Library;
