"use client";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Free.module.css';
import Search from '@/app/components/Search/Search';

const TheSims4Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/thesims4/1.png");
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isAddingWishlist, setIsAddingWishlist] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/DL2hlOIf-PM");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    const checkIfInCart = async () => {
        try {
            const response = await fetch('/api/gameonlibrary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: "The Sims 4" }),
            });
            const data = await response.json();
            setIsInCart(data.exists);
        } catch (error) {
            console.error('Erro ao verificar o carrinho:', error);
        }
    };

    const checkIfInWishlist = async () => {
        try {
            const response = await fetch('/api/checkwishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: "The Sims 4" }),
            });
            const data = await response.json();
            setIsInWishlist(data.exists);
        } catch (error) {
            console.error('Erro ao verificar a lista de desejos:', error);
        }
    };

    useEffect(() => {
        checkIfInCart();
        checkIfInWishlist();
    }, []);

    const handleAddToWishlist = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        if (isInWishlist) {
            alert('Jogo já está na lista de desejos!');
            return;
        }

        setIsAddingWishlist(true);

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "The Sims 4",
                    img: '/img/games/thesims4.jpg',
                    link: '/thesims4',
                }),
            });

            if (response.ok) {
                alert('Adicionado à lista de desejos');
                setIsInWishlist(true);
            } else {
                const errorText = await response.text();
                console.error('Failed to add to wishlist:', errorText);
                alert('Não foi possível adicionar à lista de desejos. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert('Erro ao adicionar à lista de desejos. Tente novamente mais tarde.');
        } finally {
            setIsAddingWishlist(false);
        }
    };

    const handleAddToCart = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        if (isInCart) {
            alert('Você já possui este jogo na sua biblioteca.');
            return;
        }

        setIsAddingCart(true);

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "The Sims 4",
                    img: '/img/games/thesims4.jpg',
                    link: '/thesims4',
                    price: 0, // Preço do jogo
                }),
            });

            if (response.ok) {
                alert('Adicionado ao carrinho');
                setIsInCart(true);
            } else {
                const errorText = await response.text();
                console.error('Failed to add to cart:', errorText);
                alert('Não foi possível adicionar ao carrinho. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Erro ao adicionar ao carrinho. Tente novamente mais tarde.');
        } finally {
            setIsAddingCart(false);
        }
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>The Sims 4</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="The Sims 4 Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="The Sims 4" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/thesims4/${index}.png`}
                                    alt={`The Sims 4 Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/thesims4/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/DL2hlOIf-PM/0.jpg"
                                alt="The Sims 4 Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"The Sims 4" é um jogo de simulação de vida desenvolvido pela Maxis e publicado pela Electronic Arts. Neste título, os jogadores podem criar e controlar pessoas em um mundo virtual, moldando suas vidas e personalidades, construindo suas casas e explorando novas experiências. Com inúmeras expansões e pacotes de conteúdo, "The Sims 4" oferece uma experiência profunda e diversificada, permitindo que os jogadores expressem sua criatividade e simulem a vida de formas infinitas.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>Grátis</Button>
                        <Button
                            className={styles.buyButton}
                            onClick={handleAddToCart}
                            disabled={isInCart || isAddingCart}
                        >
                            {isInCart ? 'VOCÊ JÁ TEM ESTE JOGO' : 'ADICIONAR AO CARRINHO'}
                        </Button>
                        <Button
                            className={styles.cartButton}
                            onClick={handleAddToWishlist}
                            disabled={isInWishlist || isAddingWishlist}
                        >
                            {isInWishlist ? 'ADICIONADO À LISTA DE DESEJOS' : 'ADICIONAR À LISTA DE DESEJOS'}
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default TheSims4Page;
