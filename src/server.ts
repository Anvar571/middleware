import { IncomingMessage, ServerResponse, createServer } from "http";
import { Routers } from "./routes";
import { notFound } from "./utility";

function mainHandler(req: IncomingMessage, res: ServerResponse) {
  try {
    const path = `${req.method} ${req.url}`;
    const routes = new Routers();
    const handler = routes.getRoute(path);

    if (handler) {
      handler(req, res);
    } else notFound(req, res);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export const server = createServer(mainHandler);

process.on("uncaughtException", (error) => {
  console.log(error);
});
