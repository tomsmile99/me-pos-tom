const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // ไรเบอรี่ สำหรับอนุญาติให้ Domain ไหนสามารถเข้ามาเรียกใช้ api ได้บ้าง ต้องกำหนดเพื่อความปลอดภัยของ server (ตรวจสอบเฉพาะฝั่ง Client)

const app = express();
app.use(cors());
// http://localhost:8081/images/13.jpg
app.use(express.static(__dirname + "/uploaded"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v2", require("./api"));

app.listen(8081, () => {
  console.log("Server is running...");
});

// app.get("/", (req, res) => {
//   //http://localhost:8085/login?username=admin&password=1234
//   res.json({ resutl: "ok", account: { username: "admin", password: "1234" } });
// });

// app.get("/login", (req, res) => {
//   res.json({ result: "ok", account: req.query });
// });

// //http://localhost:8085/book/jp-th
// app.get("/book/:from-:to", (req, res) => {
//   res.json({ result: "ok", account: req.params });
// });
