import { MiddlewareFunc } from "./http";
import { HttpResponse } from "./Response";
import { HttpRequest } from "./Request";

export class Middleware {
  private middlewares: MiddlewareFunc[];

  constructor() {
    this.middlewares = [];
  }

  public add(middleware: MiddlewareFunc) {
    this.middlewares.push(middleware);
  }

  public run(req: HttpRequest, res: HttpResponse, done: () => void) {
    let index = 0;
    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(req, res, next);
      } else done();
    };
    next();
  }
}
