import createRequester from "./requester";
import createSubscriber from "./subscriber";
import connect from "./ws";

export interface ChatApi {
    request: (uri: string, data: any) => Promise<any>;
    subscribe: (subject: string, handler: (msg: any) => void) => void;
    close: () => void;
}

export default function createApi(url: string): ChatApi {
    const ws = connect(url);
    const requester = createRequester(ws);
    const subscriber = createSubscriber(ws);

    function close() {
        requester.close();
        subscriber.close();
    }

    return {
        request: requester.request,
        subscribe: subscriber.subscribe,
        close,
    }
}
