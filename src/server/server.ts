import { createServer, Server as HttpServer } from "http";
import { IServerOptions, MiddlewareFunc } from "../types";
import { Middleware, Router } from "../router";
import { HttpRequest } from "./Request";
import { HttpResponse } from "./Response";
import { ServerOptions } from "../config/default-values";
import { ExceptionHandler } from "../utility/exaptions";

class Server {
  private static instance: Server;
  private readonly server: HttpServer;
  private readonly configs: ServerOptions;
  private readonly router: Router[];
  private readonly middlewares: Middleware;

  private constructor(serverOptions?: IServerOptions) {
    this.configs = new ServerOptions(serverOptions);
    this.router = [];
    this.middlewares = new Middleware();
    this.server = createServer((req, res) => {
      const request = Object.setPrototypeOf(req, HttpRequest.prototype);
      const response = Object.setPrototypeOf(res, HttpResponse.prototype);

      this.runMiddlewares(request, response);
    });

    ExceptionHandler.init();
  }

  public use(middleware: MiddlewareFunc): void;

  public use(router: Router): void;

  public use(arg1: Router | MiddlewareFunc) {
    if (typeof arg1 === "function") {
      this.middlewares.add(arg1);
    } else if (arg1 instanceof Router) {
      this.router.push(arg1);
    } else {
      throw new Error("Incorrect argument type");
    }
  }

  public static getInstance(serverOptions?: IServerOptions): Server {
    if (!this.instance) {
      this.instance = new Server(serverOptions);
    }
    return this.instance;
  }

  public init(callback?: () => void) {
    this.server.listen(
      this.configs.options.port,
      this.configs.options.host,
      callback,
    );
  }

  private runMiddlewares(req: HttpRequest, res: HttpResponse) {
    this.middlewares.run(req, res, () => {
      if (!res.headersSent) {
        this.runRouters(req, res);
      }
    });
  }

  private runRouters(req: HttpRequest, res: HttpResponse) {
    this.router.forEach((router) => {
      router.runAllRequests(req, res);
    });
  }
}

export function server(serverOptions?: IServerOptions) {
  return Server.getInstance(serverOptions);
}
