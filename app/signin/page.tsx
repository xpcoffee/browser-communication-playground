"use client";

import { signinCancelled, signinSuccessful } from "../signinChannel";

export default function SigninPage() {
    return (
        <main>
            <h1>Sign in</h1>
            <button
                onClick={() => {
                    signinSuccessful({ userId: "foo-id-1234", token: "bar-token-1234" });
                    window.close();
                }}
            >
                Confirm
            </button>
            <button
                onClick={() => {
                    signinCancelled();
                    window.close();
                }}
            >
                Cancel
            </button>
        </main>
    );
}
