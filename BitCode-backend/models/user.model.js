import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    
    universityregistrationnumber: {
      type: String,
      trim: true,
      max: 20,
    },
   
    
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    university:{
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
      default: false,
    },
    
    

    trend: { type: String,  default: "" }, // this is for the trend of the user
    trend2: { type: String, default: "" },// this is for the trend of the user
    trend3: { type: String, default: "" }, // this is for the trend of the user
    trend4: { type: String, default: "" },// this is for the trend of the user
    trend5: { type: String, default: "" }, // this is for the trend of the user
    trend6: { type: String, default: "" },// this is for the trend of the user
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
