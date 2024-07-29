"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/darksouls3/1.png");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/0RAlGv-IW4g");
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
                    title: "Dark Souls 3",
                    img: '/img/games/darksouls3.jpg',
                    link: '/darksouls3',
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
                    title: "Dark Souls 3",
                    img: '/img/games/darksouls3.jpg',
                    link: '/darksouls3',
                    price: 250, // Preço do jogo
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
                    <h1>Dark Souls 3</h1>
                </header>
                <main>
                    <section className={styles.mainBox}>
                        {isYoutubeVideo(selectedImage) ? (
                            <iframe
                                width="60%"
                                height="400"
                                src={selectedImage}
                                title="Dark Souls 3 Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedImage} alt="Dark Souls 3" className={styles.mainImage} />
                        )}
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/darksouls3/${index}.png`}
                                    alt={`Dark Souls 3 Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/darksouls3/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/0RAlGv-IW4g/0.jpg"
                                alt="Dark Souls 3 Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Dark Souls 3" é um jogo de ação e RPG desenvolvido pela FromSoftware. Situado em um mundo sombrio e atmosférico, o jogo segue a história do "Ashen One", um personagem que deve enfrentar inimigos temíveis e bosses desafiadores em sua jornada para restaurar a chama. Conhecido por sua dificuldade implacável e mecânicas de combate refinadas, "Dark Souls 3" oferece uma experiência intensa e gratificante para os fãs do gênero.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
                        <Button className={styles.buyButton}>COMPRAR</Button>
                        <Button className={styles.cartButton} onClick={handleAddToCart}>ADICIONAR AO CARRINHO</Button>
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
