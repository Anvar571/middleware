import { IncomingMessage } from "http";
import { Socket } from "net";

export class HttpRequest extends IncomingMessage {
  constructor(socket: Socket) {
    super(socket);
  }

  public async body() {
    return new Promise((res, rej) => {
      let buffer: Buffer[] = [];

      this.on("data", (chunk) => {
        buffer.push(chunk);
      });

      this.on("end", () => {
        const result = Buffer.concat(buffer);
        res(result.toJSON());
      });
    });
  }

  public query() {}

  public params() {}
}
