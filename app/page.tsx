"use client";

import styles from "./page.module.css";
import { listenForSignin } from "./signinChannel";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [authInfo, setAuthInfo] = useState<any>();
    const [signinProblem, setSigninProblem] = useState<any>();

    // onload
    useEffect(() => {
        (async function subscribeToSigninEvents() {
            setSigninProblem(undefined);

            try {
                const info = await listenForSignin();
                setAuthInfo(info);
            } catch (e) {
                setSigninProblem(e);
            }
        })();
    }, []);

    return (
        <main className={styles.main}>
            {authInfo && <div>Signed in successfully</div>}
            {!authInfo && (
                <div>
                    <Link href={"/signin"} target={"_blank"}>
                        Sign in
                    </Link>
                </div>
            )}
            {signinProblem && <div>Problem signing in: {signinProblem}</div>}
        </main>
    );
}
