import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 9000;
import admin from "./admin.js";
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");
  const msgCollecton = db.collection("messages");
  const changeStream = msgCollecton.watch();
  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.sender_id,
        received: messageDetails.receiver_id,
        timestamp: messageDetails.timestamp,
        message: messageDetails.message,
      });
    } else {
      console.log("Error Triggered...");
    }
  });
});

const uri =
  "mongodb+srv://admin:admin@cluster0.n7um3.mongodb.net/smartids?retryWrites=true&w=majority";
console.log(uri);
mongoose.connect(uri, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/admin", admin);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/admin/getadmindetails", (req, res) => {
  res.send("Hello World!");
});

app.get("/fetchalerts", (req, res) => {
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
