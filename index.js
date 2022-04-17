const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);
const io = require("socket.io").listen(server, {
  cors: {
    origin: "http://localhost:3333"
  }
});

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

io.on("connection", socket => {
  console.log("hello");
  console.log(`Socket ID: ${socket.id}`);

  //From WEB to Premiere
  socket.on("Request_Sequences", () => {
    io.emit("Request_Sequences_Ppro");
  });
  socket.on("Render_Seq", data => {
    io.emit("Render_Seq_Ppro", data);
  });

  // From Premier to WEB
  socket.on("Sequence_List", data => {
    io.emit("Update_Sequence_List", data);
  });
});
