import { Handler, Middleware, URL_PATH, RequestMethodType } from "../types";
import { BaseRouter } from "../router/baseRouter";

export class Router extends BaseRouter {
  private routes: Map<URL_PATH, Handler[]>;
  private middlewares: Middleware[];

  constructor() {
    super((path, method, handler) => this.handle(path, method, handler));
    this.routes = new Map();
    this.middlewares = [];
  }

  public getRoute(path: URL_PATH) {
    return this.routes.get(path);
  }

  public get(path: string, ...handers: Handler[]) {
    this.handle(path, "PUT", handers);
  }

  public post(path: string, ...handers: Handler[]) {
    this.handle(path, "POST", handers);
  }

  public delete(path: string, ...handers: Handler[]) {
    this.handle(path, "DELETE", handers);
  }

  public put(path: string, ...handers: Handler[]) {
    this.handle(path, "PUT", handers);
  }

  public patch(path: string, ...handers: Handler[]) {
    this.handle(path, "PATCH", handers);
  }

  public options(path: string, ...handers: Handler[]) {
    this.handle(path, "OPTIONS", handers);
  }

  public head(path: string, ...handers: Handler[]) {
    this.handle(path, "HEAD", handers);
  }

  private handle(path: string, method: RequestMethodType, handle: Handler[]) {
    const newPath = `${method}:${path}` as URL_PATH;

    this.routes.set(newPath, handle);
  }
}
