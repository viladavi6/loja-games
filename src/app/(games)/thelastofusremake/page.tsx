"use client";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styles from '../../style-games/Global.module.css';
import Search from '@/app/components/Search/Search';

const Page = () => {
    const [selectedImage, setSelectedImage] = useState("/img/thelastofusremake/1.png");
    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/WxjeV10H1F0");
    };

    const isYoutubeVideo = (url: string) => {
        return url.includes("youtube");
    };

    const handleWishlistClick = async () => {
        const sessionCookie = Cookies.get('session');
        if (!sessionCookie) {
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch('/api/wishlist', {
                method: isInWishlist ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "The Last of Us Remake",
                    img: '/img/games/thelastofus.jpg',
                    link: '/thelastofusremake',
                }),
            });

            if (response.ok) {
                setIsInWishlist(!isInWishlist);
                alert(isInWishlist ? 'Removido da lista de desejos' : 'Adicionado à lista de desejos');
            } else {
                const errorText = await response.text();
                console.error('Failed to update wishlist:', errorText);
                alert('Não foi possível atualizar a lista de desejos');
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
            alert('Erro ao atualizar a lista de desejos');
        }
    };

    return (
        <>
            <Search />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>The Last of Us Remake</h1>
                </header>
                <main>
                    <section className={styles.mainSection}>
                        <div className={styles.mainBox}>
                            {isYoutubeVideo(selectedImage) ? (
                                <iframe
                                    width="60%"
                                    height="400"
                                    src={selectedImage}
                                    title="The Last of Us Remake Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img src={selectedImage} alt="The Last of Us Remake" className={styles.mainImage} />
                            )}
                        </div>
                    </section>
                    <section className={styles.imageSelector}>
                        <div className={styles.thumbnailContainer}>
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
                                <img
                                    key={index}
                                    src={`/img/thelastofusremake/${index}.png`}
                                    alt={`The Last of Us Remake Screenshot ${index}`}
                                    className={styles.thumbnail}
                                    onClick={() => handleImageClick(`/img/thelastofusremake/${index}.png`)}
                                />
                            ))}
                            <img
                                src="https://img.youtube.com/vi/WxjeV10H1F0/0.jpg"
                                alt="The Last of Us Remake Trailer Thumbnail"
                                className={styles.thumbnail}
                                onClick={handleTrailerClick}
                            />
                        </div>
                    </section>
                    <section className={styles.desc}>
                        <h2 className={styles.desctitle}>Descrição</h2>
                        <p>"The Last of Us Remake" é uma reimaginação do clássico jogo de ação e aventura desenvolvido pela Naughty Dog. Ambientado em um mundo pós-apocalíptico, o jogo segue a jornada de Joel e Ellie enquanto lutam para sobreviver contra humanos infectados e outros sobreviventes hostis. Com gráficos atualizados e mecânicas de jogo refinadas, o remake oferece uma experiência aprimorada e emocionalmente envolvente tanto para novos jogadores quanto para fãs do original.</p>
                    </section>

                    <div className={styles.buttonsSection}>
                        <Button className={`${styles.buyButton} ${styles.priceCard}`}>R$250</Button>
                        <Button className={styles.buyButton}>COMPRAR</Button>
                        <Button className={styles.cartButton}>ADICIONAR AO CARRINHO</Button>
                        <Button 
                            className={styles.cartButton} 
                            onClick={handleWishlistClick}
                        >
                            ADICIONAR À LISTA DE DESEJOS
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Page;
