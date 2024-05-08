import Image from "next/image";
import styles from "../style/About.module.css"

export default function About() {
    return (
        <div className={styles.about}>
            <h1>TakeControl</h1>
            <div className={styles.imageContainer}>
                <Image src="/img/logo.png" width={250} height={250} alt={"TakeControl"} />
            </div>        
        </div>
    );
}