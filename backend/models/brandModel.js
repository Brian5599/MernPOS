import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
