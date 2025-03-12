import { BaseRouter } from "./baseRouter";
import { Handler, RequestMethodType, URL_PATH } from "./http";
import { HttpRequest } from "./Request";
import { HttpResponse } from "./Response";

export class Router extends BaseRouter {
  private localRoutes: Map<URL_PATH, Handler[]>;

  constructor() {
    super((path: string, method: RequestMethodType, handlers: Handler[]) =>
      this.registerRoute(path, method, handlers),
    );
    this.localRoutes = new Map();
  }

  private registerRoute(
    path: string,
    method: RequestMethodType,
    handlers: Handler[],
  ) {
    const newPath = `${method}:${path}` as URL_PATH;
    this.localRoutes.set(newPath, handlers);
  }

  public async handleRequest(
    req: HttpRequest,
    res: HttpResponse,
    next: () => void,
  ) {
    const path = `${req.method}:${req.url}` as URL_PATH;
    const handlers = this.localRoutes.get(path) ?? [];

    let index = 0;
    const runNext = () => {
      if (index >= handlers.length || res.headersSent) {
        return next();
      }
      const handler = handlers[index++];
      handler(req, res, runNext);
    };

    if (handlers.length > 0) {
      runNext();
    } else {
      next();
    }
  }
}
