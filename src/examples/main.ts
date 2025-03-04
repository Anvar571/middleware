import { server, Router } from "../main";

const app = server();

const newRouter = new Router();

app.use((req, res, next) => {
  console.log("First middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Second middleware");
  // res.json({ message: "SECOND MIDDLEWARE" });
  next();
});

newRouter.get("/", (req, res, next) => {
  res.json({ message: "Home page" });
});

newRouter.get("/user", (req, res) => {
  res.json({ message: "Successfully completed" });
});

newRouter.get("/home", (req, res) => {
  res.status(200).json({ message: "Home new get router" });
});

app.use(newRouter);

app.init(() => {
  console.log(`App running on ${5000} port`);
});
