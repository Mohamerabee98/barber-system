import express from "express";
import http from "http";
import bootstrap from "./src/app.controller.js";
import { initSocket } from "./src/socket/socket.js";
import { errorHandler } from "./utils/Error/error.handling.js";

const app = express();
const port = process.env.PORT || 3000;

// create http server
const server = http.createServer(app);

// init socket
const io = initSocket(server);

// bootstrap routes & DB
bootstrap(app, express);

// error handling
app.use(errorHandler);

// listen
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { io };
