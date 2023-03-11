export const listen = (callback: (message: any) => any) => {
    const bc = new BroadcastChannel("test_channel");
    bc.addEventListener("message", (ev) => callback(ev.data));
    return {
        close: bc.close,
        post: bc.postMessage,
    };
};
