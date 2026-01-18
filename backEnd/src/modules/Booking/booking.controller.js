import express from "express";
import { createBooking, getBookings, deleteBooking } from "./booking.service.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();


router.post("/create", createBooking);


router.get("/", protect, getBookings);


router.delete("/:id", protect, deleteBooking);

export default router;

