const channel = new BroadcastChannel("signin");

type AuthInfo = { userId: string; token: string };

enum MessageType {
    SIGNIN_SUCCESSFUL,
    SIGNIN_CANCELLED,
}
type SigningSuccessfulMessage = { type: MessageType.SIGNIN_SUCCESSFUL } & AuthInfo;
const isSigninSuccessfulMessage = (message: any): message is SigningSuccessfulMessage => {
    return message.type === MessageType.SIGNIN_SUCCESSFUL;
};

type SigningCancelledMessage = { type: MessageType.SIGNIN_CANCELLED };
const isSigninCancelledMessage = (message: any): message is SigningSuccessfulMessage => {
    return message.type === MessageType.SIGNIN_CANCELLED;
};

export const signinSuccessful = (info: AuthInfo) => {
    const message: SigningSuccessfulMessage = { type: MessageType.SIGNIN_SUCCESSFUL, ...info };
    channel.postMessage(message);
};

export const signinCancelled = () => {
    const message: SigningCancelledMessage = { type: MessageType.SIGNIN_CANCELLED };
    channel.postMessage(message);
};

const SIGNIN_TIMEOUT_MS = 15 * 1000;
let signInPromise: Promise<any> | undefined = undefined;
export const listenForSignin = () => {
    if (signInPromise !== undefined) {
        return signInPromise;
    }

    signInPromise = new Promise((resolve, reject) => {
        channel.onmessage = ({ data }) => {
            setTimeout(() => reject("Signin timed out"), SIGNIN_TIMEOUT_MS);

            if (isSigninSuccessfulMessage(data)) {
                resolve({ userId: data.userId, token: data.token });
            }

            if (isSigninCancelledMessage(data)) {
                reject("Signin cancelled");
            }
        };
    }).finally(() => {
        signInPromise = undefined;
    });

    return signInPromise;
};
