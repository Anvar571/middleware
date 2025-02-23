import { Handler, METHOD } from "./types";

export class Router {
  private routes: Record<string, Handler>;

  constructor() {
    this.routes = {};
  }

  public getRoute() {
    return this.routes;
  }

  public searchRoutes(path: string): Handler {
    return this.routes[path];
  }

  public get(path: string, handler: Handler) {
    path = `${METHOD.GET} ${path}`;
    this.routes[path] = handler;
  }

  public post(path: string, handler: Handler) {
    path = `${METHOD.POST} ${path}`;
    this.routes[path] = handler;
  }
}
