import { IncomingMessage, ServerResponse, createServer } from "http";
import { METHOD } from "./types";

function sendResponse(data: any, req: IncomingMessage, res: ServerResponse) {
  res.end(toJson(data));
}

export const toJson = (data: any) => {
  return JSON.stringify(data);
};

function dataParse(req: IncomingMessage, callback: Function) {
  let buffer = "";

  req.on("data", (chunk) => {
    buffer += chunk;
  });

  req.on("end", () => {
    callback(JSON.parse(buffer));
  });
}

type handler = (req: IncomingMessage, res: ServerResponse) => void;

export class Router {
  private routes = [];
  constructor() {}

  get(path: string, fn: handler) {}

  post(path: string, fn: handler) {}
}

export class Server {
  constructor() {}
}

export const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === METHOD.GET && req.url === "/") {
      sendResponse({ message: "Hello world" }, req, res);
    } else if (req.method == METHOD.POST && req.url === "/post") {
      dataParse(req, (data: any) => {
        sendResponse(data, req, res);
      });
    }
  },
);
