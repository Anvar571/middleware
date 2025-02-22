import { IncomingMessage, ServerResponse, createServer } from "http";
import { Handler, METHOD } from "./types";

export function sendResponse(
  data: any,
  _req: IncomingMessage,
  res: ServerResponse,
) {
  res.end(toJson(data));
}

function toJson(data: any) {
  return JSON.stringify(data);
}

export function dataParse(req: IncomingMessage, callback: Function) {
  let buffer = "";

  req.on("data", (chunk) => {
    buffer += chunk;
  });

  req.on("end", () => {
    callback(JSON.parse(buffer));
  });
}

const handlers: Record<string, Handler> = {};

export function getHandler(path: string, handler: Handler) {
  path = `${METHOD.GET} ${path}`;
  handlers[path] = handler;
}

export function postHandler(path: string, handler: Handler) {
  path = `${METHOD.POST} ${path}`;
  handlers[path] = handler;
}

function notFound(req: IncomingMessage, res: ServerResponse) {
  sendResponse({ error: "Not found" }, req, res);
}

function mainHandler(req: IncomingMessage, res: ServerResponse) {
  try {
    const method = `${req.method} ${req.url}`;
    const handler = handlers[method];

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
