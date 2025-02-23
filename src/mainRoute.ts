import { createRouter } from "./createRoute";
import { IncomingMessage, ServerResponse } from "http";
import { Handler, METHOD } from "./types";
import { sendResponse } from "./utility";

export const mainRoutes = createRouter();

export function getHandler(path: string, handler: Handler) {
  path = `${METHOD.GET} ${path}`;
  mainRoutes[path] = handler;
}

export function postHandler(path: string, handler: Handler) {
  path = `${METHOD.POST} ${path}`;
  mainRoutes[path] = handler;
}

export function notFound(req: IncomingMessage, res: ServerResponse) {
  sendResponse({ error: "Not found" }, req, res);
}
