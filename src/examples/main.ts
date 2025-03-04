import { server, Router } from "../main";

const app = server();

const newRouter = new Router();
const userRouter = new Router();
const postRouter = new Router();

app.use((req, res, next) => {
  console.log("First middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Second middleware");
  next();
});

newRouter.get("/", (req, res, next) => {
  res.json({ message: "Home page" });
});

newRouter.get("/new", (req, res) => {
  res.json({ message: "Successfully completed" });
});

newRouter.get("/home", (req, res) => {
  res.status(200).json({ message: "Home new get router" });
});

userRouter.get("/user", (req, res) => {
  res.status(200).json({ message: "User new get router" });
});

postRouter.get("/post", (req, res) => {
  res.status(200).json({ message: "Post router" });
});

app.use(newRouter);
app.use(userRouter);
app.use(postRouter);

app.init(() => {
  console.log(`App running on ${5000} port`);
});
