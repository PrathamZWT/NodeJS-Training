import express from "express";
import "dotenv/config";
import users from "../../constant.js";
import userRouter from "./routes/user.route.js";
import { logger } from "./middlewares/logger.js";
import multer from "multer";
// import { checkDB, connection } from "./models/db_connections.js";
import connection from "./config/connection.js";
import { Sequelize } from "sequelize";
import { syncDatabase } from "./models/sync.js";
console.log(users);

// checkDB();
const upload = multer({ dest: "uploads/" });
const upload2 = multer({ dest: "uploads2/" });
const app = express();
const PORT = process.env.APP_PORT;
app.use(express.json());
app.use(logger);
app.use("/", userRouter);
app.use(express.urlencoded({ extended: false }));
await syncDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connection;
});
