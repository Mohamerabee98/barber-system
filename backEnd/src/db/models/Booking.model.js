import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true
    },
    phone:{
      type :String,
      required :true,
      unique : true

    },

    service: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    day: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true

    },
        status: {
      type: String,
      enum: ["pending", "on_way", "arrived"],
      default: "pending",
    },
 },
  {
    timestamps: true
  }
);
// Hooks



export default mongoose.model("Booking", bookingSchema);
