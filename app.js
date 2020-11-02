const express = require("express");
const path = require("path");
const boardRouter = require("./routes/board");
const userRouter = require("./routes/user");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const passportConfig = require("./passport");
const cors = require("cors");

const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const db = require("./models");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "trello backend API",
      description: "trello backend API",
      contact: {
        name: "trello clone team",
      },
      servers: ["http://localhost:3065"],
    },
  },

  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
/**
 * @swagger
 * definition:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
/**
 * @swagger
 * /boards:
 *  get:
 *    description: get boards
 *    responses:
 *      '200':
 *        description: A successful response
 *  post:
 *    description: post board
 *    parameters:
 *       - name: board
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *    responses:
 *      '200':
 *        description: A successful response
 *
 */
app.use("/boards", boardRouter);
app.use("/users", userRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: error.status,
      message: error.message,
    },
  });
});

app.listen(3065, () => {
  console.log("서버 실행중");
});
