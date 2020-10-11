const express = require("express");
const boardRouter = require("./routes/board");
const userRouter = require("./routes/user");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const passportConfig = require("./passport");
const cors = require("cors");

const app = express();

const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

//front 에서 넘어오는 데이터를 req.body 에 넣어줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);

app.use("/boards", boardRouter);
app.use("/users", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
