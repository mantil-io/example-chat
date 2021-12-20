## About

This example shows how one can make a simple cloud native chat app with a serverless backend written in Go. Backend is built on AWS Lambda and uses WebSocket API and DynamoDB. 

Through this example you will learn:
- How to include a WebSocket API in Mantil and use it with the provided JS SDK
- How to deploy a web application on top of AWS Lambda with Mantil

## Prerequisites

This example is created with Mantil. To download [Mantil CLI](https://github.com/mantil-io/mantil#installation) on Mac or Linux use Homebrew 
```
brew tap mantil-io/mantil
brew install mantil
```
or check [direct download links](https://github.com/mantil-io/mantil#installation).

To deploy this application you will need an [AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/).

## Installation

To locally create a new project from this example run:
```
mantil new app --from chat
cd app
```

## Using the WebSocket API

For applications that need to update in real time WebSocket is used. The WebSocket API can be used in two ways:
- Publish/Subscribe - An API can publish messages to a subject. Clients can subscribe to this subject to receive new messages.
- Request/Response - This is used for synchronous communication and is equivalent to calling the regular REST endpoint for the API.

For more information, see the [docs](https://github.com/mantil-io/mantil/blob/master/docs/api.md#websocket).

In this example, we are using WebSocket pub/sub API to receive new messages on the client as soon as they are posted.

On the backend, we use the mantil.go `Publish` function to [publish](https://github.com/mantil-io/template-chat/blob/master/api/chat/add.go#L24) new messages to the `chat-messages` subject. The client then uses the `mantil.js` SDK to [connect](https://github.com/mantil-io/template-chat/blob/master/client/chat/src/App.tsx#L21) to the WebSocket API and [subscribe](https://github.com/mantil-io/template-chat/blob/master/client/chat/src/App.tsx#L26) to new messages.

## Deploying the application

Note: If this is the first time you are using Mantil you will need to install Mantil Node on your AWS account. For detailed instructions please follow the [one-step setup](https://github.com/mantil-io/mantil/blob/master/docs/getting_started.md#setup)
```
mantil aws install
```
Then you can proceed with application deployment.
```
mantil deploy
```
This command will create a new stage for your project with the default name `development` and deploy it to your node.

Now you can output the stage endpoint with `mantil env -u`. This is where the website for this project will be availabe. The API endpoints can be invoked by specifying the function and method name in the path, for example `$(mantil env -u)/chat/get`.

## Modification

If you want different behavior out of your function you can make necessary changes to your code in the `api` folder.

The client code is located in `client/chat`, to build it run:

```
cd client/chat
npm install
npm run build
```

This will build the static assets and copy them over to the Mantil public folder. Note that this is optional and only needed if you want to modify the client code. The project already contains prebuilt assets in `public` so you can start by deploying a new stage immediately.

After each change you have to deploy your changes with `mantil deploy`, or instruct Mantil to  automatically deploy all saved changes with `mantil watch`.

For more detailed instruction please refer to the [Mantil documentation](https://github.com/mantil-io/mantil#documentation).

## Cleanup

To remove the created stage from your AWS account destroy it with:
```
mantil stage destroy development
```

## Final thoughts

With this example you learned how to create a simple serverless chat application with AWS Lambda and Mantil's WebSocket streaming implementation. It also uses persistent key/value storage that you can learn more about in [todo example](https://github.com/mantil-io/example-todo). 

If you have any questions or comments on this template or would just like to share your view on Mantil contact us at [support@mantil.com](mailto:support@mantil.com).
