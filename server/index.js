const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");

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

const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

app.use("/server/auth", authRouter);
app.use("/server/posts", postRouter);

app.listen(3050, () => {
    console.log("서버 실행");
});