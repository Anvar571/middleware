import { server, Router } from "./server";

const newRouter = new Router();

newRouter.get("/", (req, res) => {
  res.end("salom");
});

newRouter.post("/", (req, res) => {
  res.end("post");
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server running on 5000 port");
});
