import {
  Handler,
  METHOD,
  Middleware,
  MiddlewareFunc,
  RequestMethod,
} from "../types/types";

export class Router implements RequestMethod {
  private routes: Map<string, Handler[]>;
  private middlewares: Middleware[];

  constructor() {
    this.routes = new Map();
    this.middlewares = [];
  }

  public getRoute() {
    return this.routes;
  }

  public get(path: string, handler: Handler[]) {
    this.handle(path, METHOD.PUT, handler);
  }

  public post(path: string, handler: Handler[]) {
    this.handle(path, METHOD.PUT, handler);
  }

  public delete(path: string, handler: Handler[]) {
    this.handle(path, METHOD.PUT, handler);
  }

  public put(path: string, handler: Handler[]) {
    this.handle(path, METHOD.PUT, handler);
  }

  private handle(
    path: string,
    method: METHOD,
    handle: Handler[],
    middleware?: MiddlewareFunc,
  ) {
    path = `${path}:${method}`;
    if (middleware) {
      this.middlewares.push({
        path,
        middleware,
      });
    }
    this.routes.set(path, handle);
  }
}
