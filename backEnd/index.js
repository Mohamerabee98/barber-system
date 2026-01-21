import express from "express";
import http from "http";
import bootstrap from "./src/app.controller.js";
import { initSocket } from "./src/socket/socket.js";
import { errorHandler } from "./utils/Error/error.handling.js";

const app = express();
const port = process.env.PORT || 3000;

// bootstrap
bootstrap(app, express);

// create http server
const server = http.createServer(app);

// init socket
initSocket(server);

// error handling
app.use(errorHandler)
// listen
server.listen(port, () => {
  console.log("server is running on port", port);
});
