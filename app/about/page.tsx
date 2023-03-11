"use client";

import { useEffect, useState } from "react";
import { listen } from "../broadcastChannel";

let eventListener: (message: string) => void = () => {};
const { post } = listen(eventListener);

export default function AboutPage() {
    const [message, setMessage] = useState("No message");

    useEffect(() => {
        eventListener = (message) => setMessage(message);
    });

    return (
        <>
            <h1>about</h1>
            <div>{message}</div>
            <button onClick={() => post("bonjour monde!")}>Say hello</button>
        </>
    );
}
