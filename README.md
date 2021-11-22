## About

This is a simple chat application which will demonstrate how to implement a
WebSocket API in Mantil and use it with the provided JS SDK.

## Getting started

To use this template, simply create a new Mantil project with the `--from=chat` flag:
```
mantil new chat-app --from=chat
cd chat-app
```

To deploy the project, run:
```
mantil stage new development
```

Now the project website will be available at the root URL for the stage which you can obtain by running:

```
mantil env -u
```

## Client

The client code is located in `client/chat`, to build it run:

```
cd client/chat
npm install
npm run build
```

This will build the static assets and copy them over to the Mantil public
folder. Note that this is optional and only needed if you want to modify the
client code. The project already contains prebuilt assets in `public` so you can
start by deploying a new stage immediately.

## Using the WebSocket API

For more information, see the [docs](https://github.com/mantil-io/docs/blob/main/api.md).

In this example, we are using WebSocket pub/sub API to receive new messages on the client as soon as they are posted.

On the backend, we use the mantil.go `Publish` function to [publish](https://github.com/mantil-io/template-chat/blob/master/api/chat/add.go#L24) new messages to the `chat-messages` subject. The client then uses the `mantil.js` SDK to [connect](https://github.com/mantil-io/template-chat/blob/master/client/chat/src/App.tsx#L21) to the WebSocket API and [subscribe](https://github.com/mantil-io/template-chat/blob/master/client/chat/src/App.tsx#L26) to new messages.

## Cleanup

To destroy the created stage, run:
```
mantil stage destroy development
```

This will destroy all AWS resources associated with the project. Now you can
safely delete the project folder.
