"use client";

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
  const [selectedImage, setSelectedImage] = useState("/img/alanwake/1.png");
  const [balance, setBalance] = useState<number>(0);
  const [gameInLibrary, setGameInLibrary] = useState<boolean>(false);
  const [gameInWishlist, setGameInWishlist] = useState<boolean>(false);

  useEffect(() => {
    const fetchBalance = async () => {
      const sessionCookie = Cookies.get('session');
      if (sessionCookie) {
        try {
          const response = await fetch('/api/user/balance');
          if (response.ok) {
            const data = await response.json();
            setBalance(data.balance || 0);
          } else {
            console.error('Failed to fetch balance');
          }
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const checkGameInLibrary = async () => {
      const sessionCookie = Cookies.get('session');
      if (sessionCookie) {
        try {
          const response = await fetch('/api/gameonlibrary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: 'Alan Wake' }),
          });

          if (response.ok) {
            const data = await response.json();
            setGameInLibrary(data.exists);
          } else {
            console.error('Failed to check game in library');
          }
        } catch (error) {
          console.error('Error checking game in library:', error);
        }
      }
    };

    checkGameInLibrary();
  }, []);

  useEffect(() => {
    const checkGameInWishlist = async () => {
      const sessionCookie = Cookies.get('session');
      if (sessionCookie) {
        try {
          const response = await fetch('/api/checkwishlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: 'Alan Wake' }),
          });

          if (response.ok) {
            const data = await response.json();
            setGameInWishlist(data.exists);
          } else {
            console.error('Failed to check game in wishlist');
          }
        } catch (error) {
          console.error('Error checking game in wishlist:', error);
        }
      }
    };

    checkGameInWishlist();
  }, []);

  const handleAddToCart = async () => {
    if (gameInLibrary) {
      alert('Você já possui este jogo na sua biblioteca.');
      return;
    }

    if (balance < 250) {
      alert('Saldo insuficiente.');
      return;
    }

    const sessionCookie = Cookies.get('session');
    if (!sessionCookie) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Alan Wake',
          img: '/img/games/alanwake.jpg',
          link: '/alanwake',
          price: 250,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Adicionado ao carrinho');
        setGameInLibrary(true);
      } else {
        console.error('Failed to add to cart:', data.error);
        alert('Não foi possível adicionar ao carrinho');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Erro ao adicionar ao carrinho');
    }
  };

  const handleAddToWishlist = async () => {
    if (gameInWishlist) {
      alert('O jogo já está na sua lista de desejos.');
      return;
    }

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
          title: 'Alan Wake',
          img: '/img/games/alanwake.jpg',
          link: '/alanwake',
        }),
      });

      if (response.ok) {
        alert('Adicionado à lista de desejos');
        setGameInWishlist(true); 
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

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleTrailerClick = () => {
    setSelectedImage("https://www.youtube.com/embed/sSB4QcQMm6E");
  };

  const isYoutubeVideo = (url: string) => {
    return url.includes("youtube");
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
              {isYoutubeVideo(selectedImage) ? (
                <iframe
                  width="60%"
                  height="400"
                  src={selectedImage}
                  title="Alan Wake Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img src={selectedImage} alt="Alan Wake" className={styles.mainImage} />
              )}
            </div>
          </section>
          <section className={styles.imageSelector}>
            <div className={styles.thumbnailContainer}>
              {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                <img
                  key={index}
                  src={`/img/alanwake/${index}.png`}
                  alt={`Alan Wake Screenshot ${index}`}
                  className={styles.thumbnail}
                  onClick={() => handleImageClick(`/img/alanwake/${index}.png`)}
                />
              ))}
              <img
                src="https://img.youtube.com/vi/sSB4QcQMm6E/0.jpg"
                alt="Alan Wake Trailer Thumbnail"
                className={styles.thumbnail}
                onClick={handleTrailerClick}
              />
            </div>
          </section>
          <section className={styles.desc}>
            <h2 className={styles.desctitle}>Descrição</h2>
            <p>"Alan Wake" é um jogo de ação e terror psicológico desenvolvido pela Remedy Entertainment. Lançado originalmente em 2010, o jogo segue a história de Alan Wake, um escritor que se encontra em uma pequena cidade chamada Bright Falls, onde eventos sobrenaturais começam a ocorrer. O jogo combina elementos de suspense e horror com uma narrativa profunda, enquanto Alan busca entender a origem de um manuscrito que está escrevendo, que parece se tornar realidade.</p>
            <p>O título é conhecido por sua atmosfera envolvente e mecânicas de jogo inovadoras que giram em torno do uso de luz como uma arma contra criaturas das trevas. "Alan Wake" recebeu elogios por sua narrativa envolvente e design de som, e é considerado um clássico no gênero de horror psicológico.</p>
          </section>

          <div className={styles.buttonsSection}>
            <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
            <Button
              className={styles.cartButton}
              onClick={handleAddToCart}
              disabled={gameInLibrary}
            >
              {gameInLibrary ? 'VOCÊ JÁ COMPROU ESTE JOGO' : 'ADICIONAR AO CARRINHO'}
            </Button>
            <Button
              className={styles.cartButton}
              onClick={handleAddToWishlist}
              disabled={gameInWishlist}
            >
              {gameInWishlist ? 'ADICIONADO À LISTA DE DESEJOS' : 'ADICIONAR À LISTA DE DESEJOS'}
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
