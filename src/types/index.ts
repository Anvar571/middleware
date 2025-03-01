import { HttpResponse } from "../server/Response";
import { HttpRequest } from "../server/Request";

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
  req: HttpRequest,
  res: HttpResponse,
  next?: (err?: Error) => void,
  err?: Error,
) => void | any;

export type URL_PATH = `${RequestMethodType}:${string}`;

export type MiddlewareFunc = (
  req: HttpRequest,
  res: HttpResponse,
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
