import { server } from "./server";

server.listen(5000, "127.0.0.1", () => {
  console.log("Server running on 5000 port");
});
