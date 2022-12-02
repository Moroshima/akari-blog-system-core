import Koa, { Context, Next } from "koa";
import controller from "./controller/controller";
const app = new Koa();
const port = 8080;

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

// response
// app.use(async (ctx: any) => {
//   ctx.response.body = "Hello World";
//   ctx.response.status = 201;
// });

controller(app);

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/api/`);
app.listen(port);
