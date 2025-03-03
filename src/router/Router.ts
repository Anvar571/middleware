import { Handler, MiddlewareFunc, RequestMethodType, URL_PATH } from "../types";
import { BaseRouter } from "../router/baseRouter";
import { HttpRequest } from "../server/Request";
import { HttpResponse } from "../server/Response";
import { Middleware } from "./Middleware";

export class Router extends BaseRouter {
  private localRoutes: Map<URL_PATH, Handler[]>;
  private middlewares: Middleware;

  constructor() {
    super((path, method, handler) => this.registerRoute(path, method, handler));
    this.localRoutes = new Map();
    this.middlewares = new Middleware();
  }

  public use(middleware: MiddlewareFunc) {
    this.middlewares.use(middleware);
  }

  private registerRoute(
    path: string,
    method: RequestMethodType,
    handlers: Handler[],
  ) {
    const newPath = `${method}:${path}` as URL_PATH;
    this.localRoutes.set(newPath, handlers);
  }

  public runAllRequests(req: HttpRequest, res: HttpResponse) {
    this.middlewares.run(req, res, () => {
      this.handleRequest(req, res);
    });
  }

  private handleRequest(req: HttpRequest, res: HttpResponse) {
    const path = `${req.method}:${req.url}` as URL_PATH;
    const handlers = this.localRoutes.get(path) ?? [];

    let index = 0;
    if (index < handlers.length) {
      const next = () => {
        const handler = handlers[index++];
        handler(req, res, next);
      };
      next();
    } else res.notFound();
  }
}
