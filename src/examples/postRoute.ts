import { IncomingMessage, ServerResponse } from "http";
import { Router } from "../router";
import { getBody, sendResponse } from "../utility";

export const postRoute = new Router();

postRoute.get("/post", (req: IncomingMessage, res: ServerResponse) => {
  sendResponse(
    {
      title: "Post",
      content: "Lorem ipsum",
    },
    req,
    res,
  );
});

postRoute.post("/post", (req: IncomingMessage, res: ServerResponse) => {
  getBody(req, (body) => {
    sendResponse(body, req, res);
  });
});
