const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
import express from "express";
import "dotenv/config";
import users from "../../constant.js";
import { syncDatabase } from "./models/sync.js";
import connection from "./models/index.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import categoriesRouter from "./routes/categories.route.js";
import productsRouter from "./routes/products.router.js";
import multer from "multer";
const upload = multer({ dest: "products/" });
console.log(users);
const PORT = process.env.APP_PORT;
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
await syncDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connection;
});
