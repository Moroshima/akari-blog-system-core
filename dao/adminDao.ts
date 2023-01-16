import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import sha512 from "crypto-js/sha512";
import CryptoJS from "crypto-js/x64-core";

const { Schema } = mongoose;

const adminSchema = new Schema({
  uuid: { type: String },
  username: { type: String },
  password: { type: String },
  salt: { type: String },
  role: { type: Number },
  active: { type: Boolean, default: true },
});

const Admin = mongoose.model("Admin", adminSchema);

async function createAdmin(username: string, password: string, role: number) {
  const admin = new Admin();
  admin.uuid = uuidv4();
  admin.username = "Moroshima";
  const salt = CryptoJS.lib.WordArray.random(32).toString();
  console.log("salt: ", salt);
  admin.password = sha512("#Zwh20020319" + salt).toString();
  admin.salt = salt;
  admin.role = 0;
  await admin.save();
}

export { createAdmin };
