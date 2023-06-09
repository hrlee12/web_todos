const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(cors());
// app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const todoRouter = require("./routes/todo");
app.use("/api", todoRouter); // 기본주소: localhost:PORT/api

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
