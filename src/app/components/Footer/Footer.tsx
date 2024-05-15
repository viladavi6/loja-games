import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "../../style/Footer.module.css";
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row>
                    <Col className={styles.list}>
                        <ul>
                            <Link href="/contacts">Contatos</Link>
                        </ul>
                        <ul>
                            <Link href="/terms">Termos de Uso</Link>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
