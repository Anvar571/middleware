import { IncomingMessage } from 'http';
import { Socket } from 'net';

export class HttpRequest extends IncomingMessage {
  constructor(socket: Socket) {
    super(socket);
  }

  public async body(limit: number = 1_000_000) {
    return new Promise((res, rej) => {
      let completed = false;
      let received = 0;
      let buffer: Buffer[] = [];

      this.on('data', (chunk) => {
        if (completed) return;

        if (received > limit) {
          completed = true;
          this.destroy();
          return rej(new Error('Request body too large'));
        }

        buffer.push(chunk);
      });

      this.on('end', () => {
        if (completed) return;

        completed = true;

        const result = Buffer.concat(buffer);
        res(result.toJSON());
      });
    });
  }

  public query() {}

  public params() {}
}
