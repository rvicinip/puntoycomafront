var express = require("express");
var app = express();
var fs = require("fs");

app.use(express.static("./build"));
app.use((req, res)=>{
  var html = fs.readFileSync("./build/index.html").toString("utf-8");
  res.status(200);
  res.header("Content-Type", "text/html;encoding=UTF-8");
  res.send(html);
});

var port = process.env.PORT||80;
app.listen(port, ()=>{
  console.log("server listening on port" + port);
})