import { createServer, Server as HttpServer } from "http";
import { IServerOptions, MiddlewareFunc } from "../types";
import { Router } from "../router";
import { HttpRequest } from "./Request";
import { HttpResponse } from "./Response";
import { ServerOptions } from "../config/default-values";
import { ExceptionHandler } from "../utility/exaptions";

class Server {
  private static instance: Server;
  private server: HttpServer;
  private configs: ServerOptions;
  private router: Router;

  private constructor(serverOptions?: IServerOptions) {
    this.configs = new ServerOptions(serverOptions);
    this.router = new Router();
    this.server = createServer((req, res) => {
      const request = req as HttpRequest;
      Object.setPrototypeOf(request, HttpRequest.prototype);

      const response = res as HttpResponse;
      Object.setPrototypeOf(response, HttpResponse.prototype);

      this.router.handleRequest(request, response);
    });

    ExceptionHandler.init();
  }

  public use(middleware: MiddlewareFunc) {
    this.router.use(middleware);
  }

  public route() {
    return this.router;
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
}

export function server(serverOptions?: IServerOptions) {
  return Server.getInstance(serverOptions);
}
