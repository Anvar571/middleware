import { getHandler, postHandler } from "./mainRoute";
import { server } from "./server";
import { sendResponse, dataParse } from "./utility";

getHandler("/", (req, res) => {
  sendResponse({ message: "salom" }, req, res);
});

postHandler("/post", (req, res) => {
  dataParse(req, (data: any) => {
    sendResponse({ data }, req, res);
  });
});

getHandler("/havy", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 10000000000; i++) {
    sum += i;
  }

  sendResponse({ message: sum }, req, res);
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server running on 5000 port");
});
