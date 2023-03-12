"use client";

import { listenForSignin, signout } from "./signinChannel";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [authInfo, setAuthInfo] = useState<any>();
    const [signinProblem, setSigninProblem] = useState<any>();

    useEffect(() => {
        listenForSignin({
            onSuccess: (info) => {
                setSigninProblem(undefined);
                setAuthInfo(info);
            },
            onCancel: () => !authInfo && setSigninProblem("Signin cancelled"),
            onSignout: () => {
                setAuthInfo(undefined);
            },
        });
    }, [authInfo]);

    useEffect(() => {
        document.title = authInfo ? "Mysite - Dashboard" : "Mysite - Welcome";
    }, [authInfo]);

    return (
        <main>
            <h1>Home</h1>
            {authInfo && <div>Welcome back, {authInfo.userId}!</div>}
            {!authInfo && (
                <div>
                    <div>You are not yet signed in.</div>
                    <div className="button-like">
                        <Link href={"/signin"} target={"_blank"}>
                            Sign in
                        </Link>
                    </div>
                </div>
            )}
            {signinProblem && <div>Problem signing in: {signinProblem}</div>}
            {authInfo && (
                <button
                    onClick={() => {
                        signout();
                        setAuthInfo(undefined);
                    }}
                >
                    Sign out
                </button>
            )}
        </main>
    );
}
