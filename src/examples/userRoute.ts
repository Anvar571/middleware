import { IncomingMessage, ServerResponse } from "http";
import { Router } from "../router";
import { getBody, sendResponse } from "../utility";

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

userRoute.get("/haviy", async (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1_000_000_0000; i++) {
    sum += i;
  }

  sendResponse({ result: sum }, req, res);
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
