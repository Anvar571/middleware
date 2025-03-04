import { ServerResponse } from "http";

export class HttpResponse extends ServerResponse {
  public json(data: any) {
    this.setHeader("Content-Type", "application/json");
    this.end(JSON.stringify(data));
  }

  public status(code: number) {
    this.statusCode = code;
    return this;
  }

  public notFound(message?: string) {
    this.statusCode = 404;
    this.setHeader("Content-Type", "application/json");
    this.end(JSON.stringify({ message: message ?? "Not found page" }));
  }
}
