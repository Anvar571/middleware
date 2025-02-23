import { IncomingMessage, ServerResponse } from "http";

export function sendResponse(
  data: any,
  _req: IncomingMessage,
  res: ServerResponse,
) {
  res.end(toJson(data));
}

export function toJson(data: any) {
  return JSON.stringify(data);
}

export function dataParse(req: IncomingMessage, callback: Function) {
  let buffer = "";

  req.on("data", (chunk) => {
    buffer += chunk;
  });

  req.on("end", () => {
    callback(JSON.parse(buffer));
  });
}
