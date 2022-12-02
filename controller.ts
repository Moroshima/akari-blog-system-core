import { test } from "./controller/test.controller";
import Router from "koa-router"

let router = new Router();

router.use('/', test.routes(), test.allowedMethods())

export default function (app: any) {
  app.use(router.routes());
}
