import Image from "next/image";
import styles from "../style/Contacts.module.css"

export default function About() {
    return (
        <>
            <div className={styles.contacts}>
                <h1>TakeControl</h1>
                <div className={styles.imageContainer}>
                    <Image src="/img/logo.png" width={250} height={250} alt={"TakeControl"} />
                </div>        
            </div>
            <div className={styles.text}>
                <p>Email: suporte@takecontrol.com.br</p>
                <p>Telefone: 4002-8922 Seg/Sex - 08h/18h</p>
            </div>
        </>
    );
}