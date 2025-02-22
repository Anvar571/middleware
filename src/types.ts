import { IncomingMessage, ServerResponse } from "http";

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type RouteHandler = (
  path: string,
  method: METHOD,
  handler: (req: IncomingMessage, res: ServerResponse) => ServerResponse,
) => ServerResponse;
