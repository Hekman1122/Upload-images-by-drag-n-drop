import mongoose from "mongoose";
const { Schema } = mongoose;

const imagesSchema = new Schema({
  name: String,
  date: { type: Date, default: Date.now },
  url: String,
});

const Image = mongoose.model("Image", imagesSchema);

export default Image;
