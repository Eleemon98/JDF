const { db } = require("../connect");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.getPosts = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증이 안 되었소");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("토큰이 잘못되었소.");

        console.log(userId);

        const q =
            userId !== "undefined"
                ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
                : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
                LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
                ORDER BY p.createdAt DESC`;

                const values = userId !== "undefined" ? [userId] : [userInfo.indexOf, userInfo.id];

                db.query(q, values, (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json(data);
        });
    });
};

exports.addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증이 안 되었소");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("토큰이 잘못되었소");

        const q = "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("게시물이 수정되었소");
        });
    });
};

exports.deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증이 안 되었소");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("토큰이 잘못되었소");

        const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("게시물을 삭제하였소");
            return res.status(403).json("오직 백성의 게시물만 삭제할 수 있소")
        });
    });
};