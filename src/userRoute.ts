import { getBody, sendResponse } from "./utility";
import { Router } from "./createRoute";
import { IncomingMessage, ServerResponse } from "http";

export const userRoute = new Router();

userRoute.get("/", (req: IncomingMessage, res: ServerResponse) => {
  sendResponse(
    {
      message: "Hello world",
    },
    req,
    res,
  );
});

userRoute.get("/user", (req: IncomingMessage, res: ServerResponse) => {
  sendResponse(
    {
      data: {
        name: "Anvar",
        age: 12,
      },
    },
    req,
    res,
  );
});

userRoute.post("/user", (req: IncomingMessage, res: ServerResponse) => {
  getBody(req, (body) => {
    sendResponse(body, req, res);
  });
});
