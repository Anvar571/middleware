import { IncomingMessage, ServerResponse, createServer } from "http";
import { mainRoutes, notFound } from "./mainRoute";

function mainHandler(req: IncomingMessage, res: ServerResponse) {
  try {
    const method = `${req.method} ${req.url}`;
    const handler = mainRoutes[method];

    if (handler) {
      setTimeout(() => {
        handler(req, res);
      }, 0);
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
