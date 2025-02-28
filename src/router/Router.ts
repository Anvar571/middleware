import { Handler, Middleware, URL_PATH, RequestMethodType } from "../types";
import { BaseRouter } from "../router/baseRouter";

export class Router extends BaseRouter {
  private localRoutes: Map<URL_PATH, Handler[]>;
  private middlewares: Middleware[];

  constructor() {
    super((path, method, handler) => this.handle(path, method, handler));
    this.localRoutes = new Map();
    this.middlewares = [];
  }

  public getRoute(path: URL_PATH) {
    return this.localRoutes.get(path);
  }

  private handle(path: string, method: RequestMethodType, handlers: Handler[]) {
    const newPath = `${method}:${path}` as URL_PATH;

    this.localRoutes.set(newPath, handlers);
  }
}
