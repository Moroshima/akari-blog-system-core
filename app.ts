import Koa, { Context, Next } from "koa";
import mongoose from "mongoose";
import routes from "./routes";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const port = 8080;

// async function connection() {
//   await mongoose.connect("mongodb://localhost:27017/local");
// }

// connection()
//   .then(() => {
//     console.log("Connection to MongoDB database established");
//   })
//   .catch((err) => console.log(err));

// logger
app.use(async (ctx: Context, next: Next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx: Context, next: Next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(bodyParser());

// response
// app.use(async (ctx: any) => {
//   ctx.response.body = "Hello World";
//   ctx.response.status = 201;
// });

routes(app);

console.log(
  `HTTP webserver running. Access it at: http://localhost:${port}/api/`
);
app.listen(port);
