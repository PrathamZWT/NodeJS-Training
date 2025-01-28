import express from "express";
import 'dotenv/config';
import users from "../../constant.js";
import userRouter from "./routes/user.route.js";
import { logger } from "./middlewares/logger.js";
import multer from "multer";
import { connection } from "./models/db_connections.js";
console.log(users);

connection;
const upload = multer({dest: "uploads/"});
const app = express();
const PORT = process.env.APP_PORT;
app.use(express.json());
app.use(logger);
app.use("/",userRouter);
app.use(express.urlencoded({extended :false}));

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})