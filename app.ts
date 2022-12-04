import Koa, { Context, Next } from "koa";
import mongoose, { Schema } from "mongoose";
import controller from "./controller/controller";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const port = 8080;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/local");

  const kittySchema = new mongoose.Schema<{
    name: string;
    speak: () => void;
  }>({
    name: String,
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? `Meow name is ${this.name as string}`
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model("Kitten", kittySchema);
  const silence = new Kitten({ name: "Silence" });
  console.log(silence.name); // 'Silence'

  const fluffy = new Kitten({ name: "fluffy" });
  // await fluffy.save();
  fluffy.speak(); // "Meow name is fluffy"
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

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

controller(app);

console.log(
  `HTTP webserver running. Access it at: http://localhost:${port}/api/`
);
app.listen(port);
