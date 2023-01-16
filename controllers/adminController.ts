import { Context } from "koa";
import Joi from "joi";
import axios from "axios";
import config from "@config/index";
import { createAdmin } from "@dao/adminDao";

const loginSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  grecaptcha_token: Joi.string(),
});

async function login(ctx: Context) {
  console.log(ctx.request.body);
  const body = ctx.request.body as {
    username: string;
    password: string;
    grecaptcha_token: string;
  };
  const { error } = loginSchema.validate(body);
  if (error) {
    console.log(error.details);

    ctx.response.status = 400;
    ctx.response.body = { message: error.details[0].message };
  } else {
    console.log(body);

    const params = new URLSearchParams();
    params.append("secret", config.grecaptcha_secret);
    params.append("response", body.grecaptcha_token);
    await axios
      .post("https://www.google.com/recaptcha/api/siteverify", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        const data = res.data as {
          success: boolean;
          challenge_ts?: string;
          hostname?: string;
          error_codes?: string[];
        };
        if (data.success) {
          ctx.response.status = 200;
          ctx.response.body = { message: "validation passed" };
        }
      });
  }
}

export default { login };
