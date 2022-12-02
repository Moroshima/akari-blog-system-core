import Router from "koa-router";

const test = new Router();

test.get("/", (ctx: any, next: any) => {
  ctx.response.body = "Hello World";
  ctx.response.status = 201;
});

export { test };
