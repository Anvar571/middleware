import { IncomingMessage } from "http";

export interface IResponse {
  method: string;
  path: string;
  request: IncomingMessage;
  headers?: { [key: string]: any };
  body?: { [key: string]: any } | string | undefined;
  query?: { [key: string]: any };
  params?: { [key: string]: any };
}

// export class Request extends IncomingMessage implements IResponse {
//     path: string;
//     request: IncomingMessage;
//     body?: string | { [key: string]: any; } | undefined;
//     query?: { [key: string]: any; } | undefined;
//     params?: { [key: string]: any; } | undefined;

// }
