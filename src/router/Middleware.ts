import { IncomingMessage, ServerResponse } from "http";

export interface IMeddleware {
  use: (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
}

export class Middleware implements IMeddleware {
  use(req: IncomingMessage, res: ServerResponse, next: () => void) {}
}
