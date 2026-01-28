import express from "express";
import {
  createBooking,
  getBookings,
  deleteBooking,
  searchBarberByPhone,
  barberArrived,

} from "./booking.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorization.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { createBookingSchema } from "./booking.validation.js";

const router = express.Router();

/* ================= CREATE BOOKING ================= */
// for all Customer 
router.post(
  "/create",
  isValid(createBookingSchema), 
  createBooking, 
);

/* ================= GET BOOKINGS ================= */

router.get(
  "/",
  authenticate,
  authorize("admin"), 
  getBookings,
);

/* ================= DELETE BOOKING ================= */

router.delete("/:id", authenticate, authorize("admin"), deleteBooking);

router.get("/search",authenticate,
  authorize("admin"), searchBarberByPhone);


router.patch(
  "/arrived/:id",
  authenticate,
  authorize("admin"),
  barberArrived
);

export default router;
