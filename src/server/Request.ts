import { IncomingMessage } from "http";
import { Socket } from "net";

export interface IResponse {
  headers?: { [key: string]: any };
  body?: { [key: string]: any } | string | undefined;
  query?: { [key: string]: any };
  params?: { [key: string]: any };
}

export class HttpRequest extends IncomingMessage {
  public body() {}

  public query() {}

  public params() {}
}
