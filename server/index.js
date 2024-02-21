import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express();

// 미들웨어
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json());
app.use(express.urlencoded({ extended : false }))
app.use(
    cors({
        origin: "http://localhost:8080",
    })
);
app.use(cookieParser());

import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

app.use("/server/auth", authRouter);
app.use("/server/posts", postRouter);

app.listen(3050, () => {
    console.log("서버 실행");
});