import * as proto from './proto';
import { v4 as uuid } from 'uuid';
import { WsApi } from './ws';

export default function createRequester(ws: WsApi) {
    const requests: { [inbox: string]: (rsp: proto.Message) => void } = {};

    ws.addMessageEventListener((m: proto.Message) => {
        if (m.type !== proto.MessageType.Response) {
            return;
        }
        if (!m.inbox) {
            return;
        }
        const callback = requests[m.inbox];
        if (callback) {
            callback(m);
            delete requests[m.inbox];
        }
    });

    async function request(uri: string, data: any): Promise<any> {
        const inbox = uuid();
        const msg: proto.Message = {
            type: proto.MessageType.Request,
            uri,
            inbox,
            payload: JSON.stringify(data ?? {}),
        };
        const rspWaiter = new Promise<proto.Message>(resolve => {
            requests[inbox] = resolve;
        });
        ws.send(msg);
        const rsp = await rspWaiter;
        if (!rsp.payload) {
            return null;
        }
        return JSON.parse(rsp.payload);
    }

    function close() {
        // TODO
    }

    return {
        request,
        close,
    }
}
