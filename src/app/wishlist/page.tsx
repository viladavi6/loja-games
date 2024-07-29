// src/wishlist/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import styles from '../style/Wishlist.module.css';
import { useRouter } from 'next/navigation';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<{ title: string; img: string; link: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishlist');
        if (response.ok) {
          const data = await response.json();
          setWishlist(data);
        } else {
          console.error('Failed to fetch wishlist');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (title: string) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        setWishlist(wishlist.filter(game => game.title !== title));
      } else {
        console.error('Failed to remove game from wishlist');
      }
    } catch (error) {
      console.error('Error removing game from wishlist:', error);
    }
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.wishlistTitle}>Minha Lista de Desejos</h1>
      <ListGroup className={styles.listGroup}>
        {wishlist.length > 0 ? (
          wishlist.map((game, index) => (
            <ListGroup.Item key={index} className={styles.wishlistItem}>
              <div className={styles.gameInfo}>
                <img src={game.img} alt={game.title} className={styles.gameImage} />
                <a href={game.link} className={styles.gameTitle}>{game.title}</a>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromWishlist(game.title)}
                >
                  ×
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Nenhum jogo na lista de desejos.</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default Wishlist;
