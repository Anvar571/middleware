import { server, Router } from '../src/main';

const app = server();

const newRouter = new Router();
const userRouter = new Router();
const postRouter = new Router();

newRouter.get('/', async (req, res, next) => {
  res.json({ message: 'Home page' });
});

newRouter.get('/new', (req, res) => {
  res.json({ message: 'Successfully completed' });
});

newRouter.get('/home', (req, res) => {
  res.status(200).json({ message: 'Home new get router' });
});

userRouter.get('/user', (req, res) => {
  res.status(200).json({ message: 'User new get router' });
});

postRouter.get('/post', (req, res) => {
  res.status(200).json({ message: 'Post router' });
});

app.use(newRouter);
app.use(userRouter);
app.use(postRouter);

(async () => {
  const serverAddress = await app.init();
  console.log(`Server address ${serverAddress.address}`);
  console.log(`Server address ${serverAddress.port}`);
})();
