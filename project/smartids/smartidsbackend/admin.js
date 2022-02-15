import admindetails from "./mongoose/admindetails.js";
import express from "express";
import axios from "axios";
import nodemailer from "nodemailer";

let router = express.Router();
router.use(express.json());
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
router.post("/addusers", (req, res) => {
  let temp1 = req.body;
  console.log("Jidas");
  admindetails.create(temp1, function (error, data) {
    if (error) {
      console.log(error);
      console.log(req.body);
    } else {
      console.log("Successfully Added");
      res.json({ status: "success" });
    }
  });
});

router.post("/getusers", (req, res) => {
  console.log("Jidas");
  admindetails.find({}, function (error, data) {
    if (error) {
      console.log(error);
      console.log(req.body);
    } else {
      console.log(data);
      res.json({ status: "success", data: data });
      console.log(res);
    }
  });
});

router.post("/addusers", (req, res) => {
  let temp1 = req.body;
  console.log("Jidas");
  admindetails.create(temp1, function (error, data) {
    if (error) {
      console.log(error);
      console.log(req.body);
    } else {
      console.log("Successfully Added");
      res.json({ status: "success" });
    }
  });
});

router.post("/generatereport", (req, res) => {
  console.log("Jidas");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "emailid",
      pass: "password",
    },
  });
  let tt = [];
  const t = async () => {
    tt = await axios.get('http://192.168.43.165/alert');
    console.log(tt.data);
    tt = tt.data;
    const tempsplit = tt.split('\n');
    console.log(tempsplit.length);
    for (let i = 0; i < tempsplit.length; i += 1) {
      tempsplit[i] += '\n';
      // console.log(i);
      if ((i + 1) % 6 === 0) {
        // console.log('hi');
        // tempsplit[i + 1] += '‎';
        tempsplit[i + 1] += '\n';
      }
    }
    // issetAlert(tempsplit);
    // const newtempsplit = tempsplit.map((ts) => <li>{ts}</li>);
    var mailOptions = {
      from: "netflix39039@gmail.com",
      to: ["pranavggajjar01@gmail.com", "shahdhruvi897@gmail.com"],
      subject: "Security Alert Report",
      html: tempsplit + "TCP Packet: 1010<br>UDP Packets: 111<br>Other Packets: 53<br>Total Alerts: 123",

    };
    console.log("tempmid");

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({ success: false });
      } else {
        console.log("Email sent: " + info.response);
        res.json({ success: true });
      }
    });
  };
  t();
});

export default router;
