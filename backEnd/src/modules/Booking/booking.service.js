import mongoose from "mongoose";
import Booking from "../../db/models/Booking.model.js";
import { decrypt, encrypt } from "../../../utils/crypto.js";

export const createBooking = async (req, res) => {
  try {
    const { name, age,phone, service, price, day, time } = req.body;

    if (!name || !age || !phone || !service || !price || !day || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBookings = await Booking.find({ day, time });
    if (existingBookings.length >= 5) {
      return res.status(400).json({ message: "This slot is full" });
    }

    const encryptedPhone  = encrypt(phone, 10);
    const booking = await Booking.create({ name, age,phone : encryptedPhone, service, price, day, time });
    res.status(201).json({ message: "Booking created successfully ", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ day: 1, time: 1 });
    const decryptedBookings = bookings.map((booking) => ({
      ...booking._doc,
      phone: decrypt(booking.phone),
    }));

  return  res.json({ bookings: decryptedBookings });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });


    await Booking.findByIdAndDelete(id);

    res.json({ message: "Booking deleted " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
