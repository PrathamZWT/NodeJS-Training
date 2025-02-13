const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import express from "express";
import "dotenv/config";
import users from "../../constant.js";
import { syncDatabase } from "./models/sync.js";
import connection from "./models/index.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import categoriesRouter from "./routes/categories.route.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.route.js";
import wishlistRouter from "./routes/wishlistRouter.js";
import ordersRouter from "./routes/orders.route.js";
import multer from "multer";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const upload = multer({ dest: "products/" });
app.use("/images", express.static(path.join("D:", "NodeJs")));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.APP_PORT;
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/orders", ordersRouter);
await syncDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connection;
});
