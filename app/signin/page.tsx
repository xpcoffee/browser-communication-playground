"use client";

import { signinCancelled, signinSuccessful } from "../signinChannel";

export default function SigninPage() {
    return (
        <>
            <h1>Sign in</h1>
            <button
                onClick={() => {
                    signinSuccessful({ userId: "foo-id-1234", token: "bar-token-1234" });
                    window.close();
                }}
            >
                Sign in
            </button>
            <button
                onClick={() => {
                    signinCancelled();
                    window.close();
                }}
            >
                Cancel
            </button>
        </>
    );
}
