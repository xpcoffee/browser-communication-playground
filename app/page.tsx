import styles from "./page.module.css";
import { listen } from "./broadcastChannel";
import Link from "next/link";

let eventListener = console.log;
const { close, post } = listen(eventListener);

export default function Home() {
    return (
        <main className={styles.main}>
            <div>hello there!</div>
            <Link href={"/about"} target={"_blank"}>
                About
            </Link>
            <button onClick={() => post("hello world")}>Send message</button>
        </main>
    );
}
