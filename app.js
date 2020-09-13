const express = require('express');
const boardRouter = require('./routes/board');

const app = express();

const db = require('./models');

db.sequelize.sync()
.then(() => {
  console.log("db 연결 성공");
})
.catch(console.error);

//front 에서 넘어오는 데이터를 req.body 에 넣어줌
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/boards', boardRouter);

app.listen(3065, () => {
    console.log("서버 실행중");
});
