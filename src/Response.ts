import { ServerResponse } from "http";

export class HttpResponse extends ServerResponse {
  public json(data: Record<string, any> | any[]) {
    if (!this.getHeader("Content-Type")) {
      this.setHeader("Content-Type", "application/json");
    }
    this.end(JSON.stringify(data));
  }

  public send(data: string | Buffer | Record<string, any>) {
    if (typeof data === "string" || Buffer.isBuffer(data)) {
      this.setHeader("Content-Type", "text/plain");
      this.end(data);
    } else {
      this.setHeader("Content-Type", "application/json");
      this.end(JSON.stringify(data));
    }
  }

  public status(code: number) {
    if (!Number.isInteger(code)) {
      throw new TypeError(
        `Invalid status code: ${JSON.stringify(code)}. Status code must be an integer.`,
      );
    }

    if (code < 100 || code > 999) {
      throw new RangeError(
        `Invalid status code: ${JSON.stringify(code)}. Status code must be greater than 99 and less than 1000.`,
      );
    }

    this.statusCode = code;
    return this;
  }

  public notFound(message: string = "Not found page") {
    this.statusCode = 404;
    this.setHeader("Content-Type", "application/json");
    this.end(JSON.stringify({ message: message }));
  }

  public isReady() {
    return this.headersSent;
  }
}
