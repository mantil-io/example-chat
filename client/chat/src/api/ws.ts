import * as proto from './proto';

export interface WsApi {
    send: (msg: proto.Message) => Promise<void>;
    addMessageEventListener: (handler: (m: proto.Message) => void) => void;
}

export default function connect(url: string): WsApi {
    const ws = new WebSocket(url);
    const openGuard = new Promise(resolve => {
        if (ws.readyState === ws.OPEN) {
            resolve(undefined);
        } else {
            ws.onopen = resolve;
        }
    })

    async function send(m: proto.Message) {
        await openGuard;
        const mp = proto.toProto(m)
        if (mp !== null) {
            ws.send(mp);
        }
    }

    function addMessageEventListener(handler: (m: proto.Message) => void) {
        ws.addEventListener('message', (e: MessageEvent) => {
            const m = proto.parse(e.data);
            if (m === null) {
                return;
            }
            handler(m);
        });
    }

    return {
        send,
        addMessageEventListener,
    };
}
