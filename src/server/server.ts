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
      const response = this.responseProxy(
        Object.setPrototypeOf(res, HttpResponse.prototype),
      );

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
      this.runRouters(req, res);
    });
  }

  private responseProxy(res: HttpResponse): HttpResponse {
    return new Proxy(res, {
      get(target: HttpResponse, prop: keyof HttpResponse, receiver: any) {
        if (typeof target[prop as keyof HttpResponse] === "function") {
          const method = target[prop as keyof HttpResponse] as Function;

          if ((prop === "json" || prop === "send") && target.headersSent) {
            throw new Error("You cannot send response twice");
          }

          return method.bind(target);
        }

        return Reflect.get(target, prop, receiver);
      },
    });
  }

  private async runRouters(req: HttpRequest, res: HttpResponse) {
    await Promise.all(
      this.router.map(async (router) => {
        await router.handleRequest(req, res);
      }),
    );
  }
}

export function server(serverOptions?: IServerOptions) {
  return Server.getInstance(serverOptions);
}
