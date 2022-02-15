import mongoose from "mongoose";

const admindetails = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  imageurl: { type: String, required: true },
  role: { type: String, required: true },
  verified: { type: String, required: true },
});

export default mongoose.model("admindetails", admindetails);
