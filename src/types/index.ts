import { IncomingMessage, ServerResponse } from "http";

export interface IServerOptions {
  port: number;
  host: string;
}

export type RequestMethodType =
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";

export type RequestHandler = (path: string, ...handlers: Handler[]) => void;

export type Handler = (
  req: IncomingMessage,
  res: ServerResponse,
  next?: (err?: Error) => {},
  err?: Error,
) => void | any;

export type URL_PATH = `${RequestMethodType}:${string}`;

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
  get: RequestHandler;
  post: RequestHandler;
  patch: RequestHandler;
  put: RequestHandler;
  delete: RequestHandler;
  options: RequestHandler;
  head: RequestHandler;
}
