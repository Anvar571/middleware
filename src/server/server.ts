import {
  IncomingMessage,
  ServerResponse,
  createServer,
  Server as HttpServer,
} from "http";
import { notFound } from "../utility";
import EventEmitter from "events";
import { Handler, IServerOptions, RequestMethodType, URL_PATH } from "../types";
import { Router } from "../router";

export class Server extends EventEmitter {
  private server: HttpServer;
  constructor(private serverOptions: IServerOptions) {
    super();
    this.server = createServer(this.hander.bind(this));
    this.exaptions();
  }

  public hander(req: IncomingMessage, res: ServerResponse) {
    const path = `${req.method}:${req.url}` as URL_PATH;
    const route = new Router();
    const handlers = route.getRoute(path) ?? [];

    if (handlers.length > 0) {
      let index = 0;
      function next() {
        let handler = handlers[index++];
        handler(req, res);
      }
      next();
    } else notFound(req, res);
  }

  public init() {
    this.server.listen(this.serverOptions.port, this.serverOptions.host, () => {
      this.emit("started", this.serverOptions.port);
    });

    this.server.on("error", (err) => {
      this.emit("error", err);
    });
  }

  public get(path: string, ...handlers: Handler[]) {
    this.handlerReq(path, "GET", handlers);
  }

  public post(path: string, ...handlers: Handler[]) {
    this.handlerReq(path, "POST", handlers);
  }

  public put(path: string, ...handlers: Handler[]) {
    this.handlerReq(path, "PUT", handlers);
  }

  public delete(path: string, ...handlers: Handler[]) {
    this.handlerReq(path, "DELETE", handlers);
  }

  public patch(path: string, ...handlers: Handler[]) {
    this.handlerReq(path, "PATCH", handlers);
  }

  public options(path: string, ...handlers: Handler[]) {
    this.handlerReq(path, "OPTIONS", handlers);
  }

  public head(path: string, ...handlers: Handler[]) {
    this.handlerReq(path, "HEAD", handlers);
  }

  private handlerReq(
    path: string,
    method: RequestMethodType,
    handlers: Handler[],
  ) {}

  private exaptions() {
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err.message);
    });

    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Promise Rejection:", reason);
    });
  }
}
