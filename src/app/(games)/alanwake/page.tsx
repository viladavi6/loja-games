"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
  const [selectedImage, setSelectedImage] = useState("/img/alanwake/1.png");

  const handleAddToWishlist = async () => {
    const sessionCookie = Cookies.get('session');
    if (!sessionCookie) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Alan Wake', // Título do jogo
          img: '/img/games/alanwake.jpg', // Imagem do jogo (ajustar conforme necessário)
          link: '/alanwake', // Link para a página do jogo
        }),
      });

      if (response.ok) {
        alert('Adicionado à lista de desejos');
      } else {
        const errorText = await response.text();
        console.error('Failed to add to wishlist:', errorText);
        alert('Não foi possível adicionar à lista de desejos');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Erro ao adicionar à lista de desejos');
    }
  };

  return (
    <>
      <Search />
      <div className={styles.container}>
        <header className={styles.title}>
          <h1>Alan Wake</h1>
        </header>
        <main>
          <section className={styles.mainSection}>
            <div className={styles.mainBox}>
              <img src={selectedImage} alt="Alan Wake" className={styles.mainImage} />
            </div>
          </section>
          <section className={styles.imageSelector}>
            <div className={styles.thumbnailContainer}>
              {/* Imagens e trailers */}
            </div>
          </section>
          <section className={styles.desc}>
            <h2 className={styles.desctitle}>Descrição</h2>
            <p>"Alan Wake" é um jogo de ação e terror psicológico desenvolvido pela Remedy Entertainment. Lançado originalmente em 2010, o jogo segue a história de Alan Wake, um escritor que se encontra em uma pequena cidade chamada Bright Falls, onde eventos sobrenaturais começam a ocorrer. O jogo combina elementos de suspense e horror com uma narrativa profunda, enquanto Alan busca entender a origem de um manuscrito que está escrevendo, que parece se tornar realidade.</p>
            <p>O título é conhecido por sua atmosfera envolvente e mecânicas de jogo inovadoras que giram em torno do uso de luz como uma arma contra criaturas das trevas. "Alan Wake" recebeu elogios por sua narrativa envolvente e design de som, e é considerado um clássico no gênero de horror psicológico.</p>
          </section>

          <div className={styles.buttonsSection}>
            <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
            <Button className={styles.buyButton}>COMPRAR</Button>
            <Button className={styles.cartButton}>ADICIONAR AO CARRINHO</Button>
            <Button className={styles.cartButton} onClick={handleAddToWishlist}>
              ADICIONAR À LISTA DE DESEJOS
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
