"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/rocketleague/1.jpg");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/SgSX3gOrj60?autoplay=1&mute=1");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

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
                    title: "Rocket League",
                    img: '/img/games/rocketleague.jpg',
                    link: '/rocketleague',
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

    const handleAddToCart = async () => {
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
                    title: "Rocket League",
                    img: '/img/games/rocketleague.jpg',
                    link: '/rocketleague',
                    price: 0, // O jogo é gratuito
                }),
            });

            if (response.ok) {
                alert('Adicionado ao carrinho');
            } else {
                const errorText = await response.text();
                console.error('Failed to add to cart:', errorText);
                alert('Não foi possível adicionar ao carrinho');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Erro ao adicionar ao carrinho');
        }
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Rocket League</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Rocket League Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Rocket League" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/rocketleague/${index}.jpg`}
                                    alt={`Rocket League Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/rocketleague/${index}.jpg`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/SgSX3gOrj60/0.jpg"
                                alt="Rocket League Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Rocket League" é um jogo eletrônico desenvolvido e publicado pela Psyonix. Lançado inicialmente em julho de 2015, o jogo rapidamente se tornou um fenômeno devido à sua jogabilidade única e emocionante. No mundo de "Rocket League", os jogadores controlam carros impulsionados por foguetes em campos de futebol, onde o objetivo é marcar gols em uma bola gigante. O jogo combina habilidade, estratégia e velocidade, criando uma experiência multiplayer altamente competitiva e viciante. Além do modo principal de futebol, "Rocket League" oferece uma variedade de modos de jogo, incluindo basquete, hóquei e modos casuais e competitivos. Os jogadores podem personalizar seus carros com uma ampla gama de opções de personalização, desde decalques e pinturas até chapéus e antenas. O jogo também é conhecido por sua comunidade ativa e engajada, que organiza torneios, eventos e criações de conteúdo personalizado. Com constantes atualizações e suporte da desenvolvedora, "Rocket League" continua a evoluir e atrair jogadores de todas as idades e níveis de habilidade.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>GRATUITO</Button>
                        <Button className={styles.buyButton}>COMPRAR</Button>
                        <Button className={styles.cartButton} onClick={handleAddToCart}>
                            ADICIONAR AO CARRINHO
                        </Button>
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
