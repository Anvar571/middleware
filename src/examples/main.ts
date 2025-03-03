import { server } from "../main";

const app = server();
const router = app.route();

router.use((req, res, next) => {
  console.log("First middleware");
  next();
});

router.use((req, res, next) => {
  console.log("Second middleware");
  res.json({ message: "SECOND MIDDLEWARE" });
});

router.get("/", (req, res, next) => {
  res.json({ message: "Home page" });
});

router.get("/user", (req, res) => {
  res.json({ message: "Successfully completed" });
});

app.init(() => {
  console.log(`App running on ${5000} port`);
});
