import { Context } from "koa";
import Router from "koa-router";

const basic = new Router();

basic.get("/", (ctx: Context) => {
  ctx.response.body = "Hello World!";
  ctx.response.status = 200;
});

export { basic };
