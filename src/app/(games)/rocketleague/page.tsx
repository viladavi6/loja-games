"use client"
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from '../../style/Rocket.module.css';

const RocketLeaguePage = () => {
    const images = [
        "/img/rocketleague/1.jpg",
        "/img/rocketleague/2.jpg",
        "/img/rocketleague/3.jpg"
    ];

    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [description, setDescription] = useState("Descrição do jogo Rocket League");

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleTrailerClick = () => {
        setSelectedImage("https://www.youtube.com/embed/SgSX3gOrj60?autoplay=1&mute=1");
    };

    return (
        <Container>
            <header>
                <h1>Rocket League</h1>
            </header>
            <main>
                {/* Box Grande */}
                <section className={styles.mainSection}>
                    <div className={styles.mainBox}>
                        <iframe
                            width="100%"
                            height="400"
                            src={selectedImage}
                            title="Rocket League Trailer"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className={styles.buttons}>
                        <Button variant="primary" className={styles.buyButton}>Comprar</Button>
                        <Button variant="outline-primary" className={styles.cartButton}>Adicionar ao Carrinho</Button>
                    </div>
                </section>

                {/* Galeria de Imagens */}
                <section>
                    <h2>Galeria de Imagens</h2>
                    <Row>
                        {images.map((image, index) => (
                            <Col key={index} xs={6} md={3} className={styles.thumbnail}>
                                <img
                                    src={image}
                                    alt={`Rocket League Screenshot ${index + 1}`}
                                    className={styles.image}
                                    onClick={() => handleImageClick(image)}
                                />
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Descrição */}
                <section>
                    <h2>Descrição</h2>
                    <p>{description}</p>
                </section>
            </main>
        </Container>
    );
};

export default RocketLeaguePage;
