# Express-like app

Installation

```bash
pnpm i
```

```typescript
import { server } from "../main";

const app = server();
const router = app.route();

router.get("/", (req, res, next) => {
  res.json({ message: "Home page" });
});

router.get("/user", (req, res) => {
  res.json({ message: "Successfully completed" });
});

app.init(() => {
  console.log(`App running on ${5000} port`);
});
```

Multiple route

```typescript
import { Router } from "app";

const userRouter = new Router();
const postRouter = new Router();

userRouter.get("/user", (req, res) => {
  res.status(200).json({ message: "User new get router" });
});

postRouter.get("/post", (req, res) => {
  res.status(200).json({ message: "Post router" });
});

app.use(userRouter);
app.use(postRouter);
```
