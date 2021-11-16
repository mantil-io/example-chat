## About

This is a simple chat application which will demonstrate how to implement a websocket API in mantil and use it with the provided JS SDK.

## Getting started

To use this template, simply create a new mantil project with the `--from=chat` flag:
```
mantil new chat-app --from=chat
cd chat-app
```

To deploy the project, run:
```
mantil stage new development
```

Since we set public as the default route in `config/environment.yml` the website will be available at the root URL for the stage which you can obtain by running:
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
This will build the static assets and copy them over to the mantil public folder. Note that this is optional and only needed if you want to modify the client code. The project already contains prebuilt assets in `public` so you can start by deploying a new stage immediately.

## Using the WebSocket API

Each mantil API can be accessed via WebSocket which is useful for applications that need to update in real time. The WebSocket API can be used in two ways:
1. Publish/Subscribe - A function can publish messages to a subject. Clients can subscribe to this subject to receive new messages. An example of this can be seen [here](https://github.com/mantil-io/template-chat/blob/master/api/chat/add.go#L24). After someone posts a new message it is published to all subscribers of the `chat-messages` subject. An example of how clients can subscribe to topics can be found [here](https://github.com/mantil-io/template-chat/blob/master/client/chat/src/App.tsx#L24)
2. Request/Response - This is used for synchronous communication and is equivalent to calling the regular REST endpoint for the API. In this project it is used to [fetch all previous messages](https://github.com/mantil-io/template-chat/blob/master/client/chat/src/App.tsx#L27).

## Cleanup

To destroy the created stage, run:
```
mantil stage destroy development
```

This will destroy all AWS resources associated with the project. Now you can safely delete the project folder.
