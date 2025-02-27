import { IncomingMessage, ServerResponse } from "http";

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type RouteHandler = (
  path: string,
  handler: (req: IncomingMessage, res: ServerResponse) => ServerResponse,
) => ServerResponse;

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;

export type Middleware = {
  path: string;
  middleware: (req: IncomingMessage, res: ServerResponse) => void;
};

export type MiddlewareFunc = (
  req: IncomingMessage,
  res: ServerResponse,
  next?: () => void,
) => void;

export interface RequestMethod {
  get: (path: string, handler: Handler[], middleware?: MiddlewareFunc) => void;
  post: (path: string, handler: Handler[], middleware?: MiddlewareFunc) => void;
  delete: (
    path: string,
    handler: Handler[],
    middleware?: MiddlewareFunc,
  ) => void;
  put: (path: string, handler: Handler[], middleware?: MiddlewareFunc) => void;
}
