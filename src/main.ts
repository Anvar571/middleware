import { Server } from "./server/server";

const server = new Server({
  host: "localhost",
  port: 5000,
});

server.init();

server.on("error", (args) => {
  console.error(args);
});
