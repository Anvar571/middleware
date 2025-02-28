import { createServer, Server as HttpServer } from "http";
import { notFound } from "../utility";
import EventEmitter from "events";
import { Handler, IServerOptions, RequestMethodType, URL_PATH } from "../types";
import { Router } from "../router";
import { HttpRequest } from "./Request";
import { HttpResponse } from "./Response";

class Server extends EventEmitter {
  private static instance: Server;
  private server: HttpServer;
  private globalRequestMap: Map<URL_PATH, Handler[]> = new Map();

  private constructor(private serverOptions: IServerOptions) {
    super();
    this.server = createServer((req, res) => {
      this.hander(req as HttpRequest, res as HttpResponse);
    });
    this.exaptions();
  }

  public static getInstance(serverOptions: IServerOptions) {
    if (!this.instance) {
      this.instance = new Server(serverOptions);
    }
    return this.instance;
  }

  public hander(req: HttpRequest, res: HttpResponse) {
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

  public use() {}

  public router() {
    return new Router();
  }

  private handlerReq(
    path: string,
    method: RequestMethodType,
    handlers: Handler[],
  ) {
    const newPath = `${method}:${path}` as URL_PATH;
    this.globalRequestMap.set(newPath, handlers);
  }

  private exaptions() {
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err.message);
    });

    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Promise Rejection:", reason);
    });
  }
}

export function server(serverOptions: IServerOptions) {
  return Server.getInstance(serverOptions);
}
