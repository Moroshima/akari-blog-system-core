import Koa, { Context, Next } from "koa";
import routes from "./routes";
import bodyParser from "koa-bodyparser";
import database from "@config/database";

const app = new Koa();
const port = 8080;

// database connenction
database().catch((err) => console.log(err));

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

routes(app);

console.log(
  `HTTP webserver running. Access it at: http://localhost:${port}/api/`
);
app.listen(port);
