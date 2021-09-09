export interface Message {
    type: MessageType;
    subjects?: string[];
    subject?: string;
    uri?: string;
    inbox?: string;
    payload?: string;
}

export enum MessageType {
    Subscribe = "SUB",
    Unsubscribe = "UNSUB",
    Request = "REQ",
    Response = "RSP",
    Publish = "PUB"
}

function toProto(m: Message) {
    switch (m.type) {
        case MessageType.Subscribe:
            return toProtoSub(m);
        case MessageType.Unsubscribe:
            return toProtoUnsub(m);
        case MessageType.Request:
            return toProtoReq(m);
        case MessageType.Response:
            return toProtoRsp(m);
        case MessageType.Publish:
            return toProtoPub(m);
    }
}

function toProtoSub(m: Message) {
    let mp = `${MessageType.Subscribe}`;
    if (!m.subjects?.length) {
        return null;
    }
    m.subjects.forEach(s => {
        mp += " " + s;
    });
    mp += "\n";
    return mp;
}

function toProtoUnsub(m: Message) {
    let mp = `${MessageType.Unsubscribe}`;
    if (!m.subjects?.length) {
        return null;
    }
    m.subjects.forEach(s => {
        mp += ' ' + s;
    });
    mp += '\n';
    return mp;
}

function toProtoReq(m: Message) {
    let mp = `${MessageType.Request} `
    if (!m.uri) {
        return null;
    }
    mp += m.uri + ' ';
    if (!m.inbox) {
        return null;
    }
    mp += m.inbox + ' ';
    mp += m.payload?.length ?? 0;
    mp += '\n';
    mp += m.payload ?? '';
    return mp;
}

function toProtoRsp(m: Message) {
    let mp = `${MessageType.Response} `;
    if (!m.uri) {
        return null;
    }
    mp += m.uri + ' ';
    if (!m.inbox) {
        return null;
    }
    mp += m.inbox + ' ';
    mp += m.payload?.length ?? 0;
    mp += '\n';
    mp += m.payload ?? '';
    return mp;
}

function toProtoPub(m: Message) {
    let mp = `${MessageType.Publish} `;
    if (!m.subject) {
        return null;
    }
    mp += m.subject + ' ';
    mp += m.payload?.length ?? 0;
    mp += '\n';
    mp += m.payload;
    return mp;
}

function parse(protoMessage: string): (Message | null) {
    const lines = protoMessage.split('\n');
    if (lines.length <= 1) {
        return null;
    }
    const header = lines[0];
    let headerParts = header.split(" ");
    const type = headerParts[0];
    const m: Message = { 
        type: type as MessageType,
    };
    headerParts = headerParts.slice(1);
    switch (type) {
        case MessageType.Subscribe:
            m.subjects = headerParts;
            break;
        case MessageType.Unsubscribe:
            m.subjects = headerParts;
            break;
        case MessageType.Request:
            m.uri = headerParts[0];
            m.inbox = headerParts[1];
            break;
        case MessageType.Response:
            m.uri = headerParts[0];
            m.inbox = headerParts[1];
            break;
        case MessageType.Publish:
            m.subject = headerParts[0];
            break;
    }
    const payload = lines.slice(1).join('\n');
    m.payload = payload;
    return m
}

export {
    toProto,
    parse,
}
