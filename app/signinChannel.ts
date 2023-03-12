const channel = new BroadcastChannel("signin");

/**
 * Message types
 *
 * Very verbose... wonder if there's a cleaner way to do this.
 */

type AuthInfo = { userId: string; token: string };
enum MessageType {
    SIGNIN_SUCCESSFUL,
    SIGNIN_CANCELLED,
    SIGNOUT,
}
type SigningSuccessfulMessage = { type: MessageType.SIGNIN_SUCCESSFUL } & AuthInfo;
const isSigninSuccessfulMessage = (message: any): message is SigningSuccessfulMessage => {
    return message.type === MessageType.SIGNIN_SUCCESSFUL;
};

type SigningCancelledMessage = { type: MessageType.SIGNIN_CANCELLED };
const isSigninCancelledMessage = (message: any): message is SigningSuccessfulMessage => {
    return message.type === MessageType.SIGNIN_CANCELLED;
};

type SignoutMessage = { type: MessageType.SIGNOUT };
const isSignoutMessage = (message: any): message is SignoutMessage => {
    return message.type === MessageType.SIGNOUT;
};

/**
 * Signal dispatchers
 */

export const signinSuccessful = (info: AuthInfo) => {
    const message: SigningSuccessfulMessage = { type: MessageType.SIGNIN_SUCCESSFUL, ...info };
    channel.postMessage(message);
};

export const signinCancelled = () => {
    const message: SigningCancelledMessage = { type: MessageType.SIGNIN_CANCELLED };
    channel.postMessage(message);
};

export const signout = () => {
    const message: SignoutMessage = { type: MessageType.SIGNOUT };
    channel.postMessage(message);
};

/**
 * Signal listeners
 */

export const listenForSignin = ({
    onSuccess,
    onCancel,
    onSignout,
}: {
    onSuccess: (info: AuthInfo) => void;
    onCancel?: () => void;
    onSignout?: () => void;
}) => {
    channel.onmessage = ({ data }) => {
        if (isSigninSuccessfulMessage(data)) {
            onSuccess({ userId: data.userId, token: data.token });
        }

        if (isSigninCancelledMessage(data)) {
            onCancel?.();
        }

        if (isSignoutMessage(data)) {
            onSignout?.();
        }
    };
};
