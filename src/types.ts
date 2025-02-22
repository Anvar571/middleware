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
export type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next?: () => void,
) => void;
