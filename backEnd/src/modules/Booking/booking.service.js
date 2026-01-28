import mongoose from "mongoose";
import Booking from "../../db/models/Booking.model.js";
import { decrypt, encrypt } from "../../../utils/crypto.js";
import { getIO } from "../../socket/socket.js";

/* ================= CREATE BOOKING ================= */
export const createBooking = async (req, res, next) => {
  try {
    const { name, age, phone, service, price, day, time } = req.body;


    const count = await Booking.countDocuments({ day, time });
    if (count >= 5) {
      return next(new Error("This slot is full", { cause: 400 }));
    }

    const booking = await Booking.create({
      name,
      age,
      phone: encrypt(phone),
      service,
      price,
      day,
      time,
    });

    const bookingForAdmin = {
      ...booking._doc,
      phone: decrypt(booking.phone),
    };

    getIO().emit("newBooking", bookingForAdmin);

    res.status(201).json({
      message: "Booking created successfully",
      booking: bookingForAdmin,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    next(error);
  }
};


export const searchBarberByPhone = async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) {
      return res.status(400).json({ message: "Phone query is required" });
    }

  const barber = await Booking.findOne({ phone: phone.trim() });

    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    res.json(barber);
  } catch (error) {
    console.error("searchBarberByPhone error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const barberArrived = async (req, res) => {
  try {
    const barber = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "arrived" },
      { new: true }
    );

    if (!barber)
      return res.status(404).json({ message: "Barber not found" });

    barber.phone = decrypt(barber.phone);

    getIO().emit("barberArrived", barber);

    res.json({ message: "Barber arrived successfully", barber });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ================= GET BOOKINGS ================= */
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ day: 1, time: 1 });

    const decryptedBookings = bookings.map((booking) => ({
      ...booking._doc,
      phone: decrypt(booking.phone),
    }));

    res.json({ bookings: decryptedBookings });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/* ================= DELETE BOOKING ================= */
export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error("Invalid booking ID", { cause: 400 }));
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return next(new Error("Booking not found", { cause: 404 }));
    }

    await Booking.findByIdAndDelete(id);

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// controller/service:
// export const deleteAllBookings = async (req, res, next) => {
//   try {
//     const { confirm } = req.query;

//     if (confirm !== "true") {
//       return res.status(400).json({
//         message: "Confirmation required",
//       });
//     }

//     await Booking.deleteMany({});
//     res.status(200).json({
//       message: "All bookings deleted successfully",
//     });
//   } catch (error) {
//     next(error); 
//   }
// };
