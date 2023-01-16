import mongoose from "mongoose";

mongoose.set("strictQuery", true);

async function database() {
  await mongoose.connect("mongodb://localhost:27017/local");
}

// 连接成功
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

// 连接异常
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});

// 断开连接
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export default database;
