"use client"
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "../../style/Footer.module.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    return (
        <footer className={styles.footer}>
            <Container>
                <Row>
                    <Col className={styles.list}>
                        {pathname !== '/contacts' && (
                            <ul>
                                <Link href="/contacts">Contatos</Link>
                            </ul>
                        )}    
                        {pathname !== '/terms' && (
                            <ul>
                                <Link href="/terms">Termos de Uso</Link>
                            </ul>
                        )}
                        
                        <hr className={styles.horizontalLine} />
                        <p className={styles.text}>
                            © 2024, Take Control, Inc. Todos os direitos reservados. Take Control, o logotipo da Take Control, e todos os nomes de produtos associados são marcas comerciais ou registradas da Take Control, Inc. nos Estados Unidos da América e em outros lugares. Outras marcas e nomes de produtos são marcas registradas de seus respectivos donos.
                            Nossos sites podem conter links para outros sites e recursos fornecidos por terceiros. Esses links são fornecidos apenas para a sua conveniência. A Take Control não tem controle sobre o conteúdo desses sites ou recursos e não aceita nenhuma responsabilidade por eles ou por qualquer perda ou dano que possa resultar de seu uso.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
