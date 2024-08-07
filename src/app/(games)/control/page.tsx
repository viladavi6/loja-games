"use client";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/control/1.png");
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const checkIfInCart = async () => {
            try {
                const response = await fetch('/api/gameonlibrary', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: "Control" }),
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
                    body: JSON.stringify({ title: "Control" }),
                });
                const data = await response.json();
                setIsInWishlist(data.exists);
            } catch (error) {
                console.error('Erro ao verificar a lista de desejos:', error);
            }
        };

        checkIfInCart();
        checkIfInWishlist();
    }, []);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/w6bE11FrSFM");
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

        if (isInWishlist) {
            alert('Jogo já está na lista de desejos!');
            return;
        }

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Control",
                    img: '/img/games/control.jpg',
                    link: '/control',
                }),
            });

            if (response.ok) {
                alert('Adicionado à lista de desejos');
                setIsInWishlist(true);
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

        if (isInCart) {
            alert('Você já possui este jogo na sua biblioteca.');
            return;
        }

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Control",
                    img: '/img/games/control.jpg',
                    link: '/control',
                    price: 250, // Preço do jogo
                }),
            });

            if (response.ok) {
                alert('Adicionado ao carrinho');
                setIsInCart(true);
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
                    <h1>Control</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="Control Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="Control" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/control/${index}.png`}
                                    alt={`Control Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/control/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/w6bE11FrSFM/0.jpg"
                                alt="Control Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"Control" é um jogo de ação e aventura desenvolvido pela Remedy Entertainment. Nele, você assume o papel de Jesse Faden, uma jovem em busca de seu irmão desaparecido em um prédio governamental chamado Federal Bureau of Control (FBC). O jogo combina uma narrativa envolvente com mecânicas de combate e exploração em um ambiente misterioso e sobrenatural. Com uma história profunda e jogabilidade dinâmica, "Control" oferece uma experiência única para os fãs de ação e ficção científica.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
                        <Button 
                            className={styles.cartButton} 
                            onClick={handleAddToCart}
                            disabled={isInCart}
                        >
                            {isInCart ? 'VOCÊ JÁ COMPROU ESTE JOGO' : 'ADICIONAR AO CARRINHO'}
                        </Button>
                        <Button 
                            className={styles.cartButton} 
                            onClick={handleAddToWishlist}
                            disabled={isInWishlist}
                        >
                            {isInWishlist ? 'ADICIONADO À LISTA DE DESEJOS' : 'ADICIONAR À LISTA DE DESEJOS'}
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Page;
