export {createHttpServer};

import http from "http";


const PORT = 8080;

const createHttpServer = () => {
    const server = http.createServer((req, res) => {

    });

    server.listen(PORT);
    console.log(`listening on port ${PORT}, open`);

    return server;
};