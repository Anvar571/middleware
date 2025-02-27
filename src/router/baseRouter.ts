import { Handler, RequestMethod, RequestMethodType } from "../types";

export class BaseRouter implements RequestMethod {
  protected delegate: (
    path: string,
    method: RequestMethodType,
    handlers: Handler[],
  ) => void;

  constructor(
    delegateFunc: (
      path: string,
      method: RequestMethodType,
      handlers: Handler[],
    ) => void,
  ) {
    this.delegate = delegateFunc;
  }

  get(path: string, ...handlers: Handler[]) {
    this.delegate(path, "GET", handlers);
  }

  post(path: string, ...handlers: Handler[]) {
    this.delegate(path, "POST", handlers);
  }

  put(path: string, ...handlers: Handler[]) {
    this.delegate(path, "PUT", handlers);
  }

  delete(path: string, ...handlers: Handler[]) {
    this.delegate(path, "DELETE", handlers);
  }

  patch(path: string, ...handlers: Handler[]) {
    this.delegate(path, "PATCH", handlers);
  }

  options(path: string, ...handlers: Handler[]) {
    this.delegate(path, "OPTIONS", handlers);
  }

  head(path: string, ...handlers: Handler[]) {
    this.delegate(path, "HEAD", handlers);
  }
}
