# socketiyo


Concept inspired by socket.io

What are the differences from socketiyo ?

Rooms and events are combined and called channels. These channels are hidden. When a client subscibes to an event, it will be listening on that channel with the same event name, that can only emit this event name.

Namespaces are handled outside of the library by creating more instances with different options.

The WebSocket server implementation is not provided, instead socketiyo expects a peer dependency to be injected at runtime.

The client is not served by default in the server. It has to be explicitly imported in the client code instead.

No fallback provided when WebSocket is not available. No background protocol upgrades.

Regular events and library events cannot be confused.

Does not decorate the sockets with custom methods

## Usage

### Install

#### client side

`npm i socketiyo-client`

#### server side

`npm i socketiyo`

### `attachWebSocketServer`


```js
import {
    attachWebSocketServer,
    CONNECT,
    DISCONNECT,
	ERROR,
	DEFAULT_CHANNEL,
} from "../source/socketiyo.js";
import {
    maxClients,
    highClients,
    lowEnough,
    maxLength,
    maxChannels,
    maxChannelLength,
} from "../source/defaultOptions.js";
import {useDefaultLogging} from "../source/defaultLogging";


/* httpServer, ws are not provided, see examples */
const socketiYoServer = attachWebSocketServer({
    httpServer,
    ws,
    maxClients,
    highClients,
    lowEnough,
    maxLength,
    maxChannels,
    maxChannelLength,
});

useDefaultLogging({socketiYoServer});

/* send the current time on the default channel to everyone */
setInterval(() => {
    socketiYoServer.sendAll(Date.now());
}, 1500);

socketiYoServer.on(CONNECT, socket => {
    /* send welcome to the socket*/
    socketiYoServer.send(socket, {message: `welcome`});
    /* alert others as well */
    socketiYoServer.sendAllExceptOne(socket, {message: `new connection`});
});

socketiYoServer.on(`game/input`, ({socket, data}) => {
    console.log(`${socket} send us ${data}`);
});
```

### License

[CC0](./license.txt)