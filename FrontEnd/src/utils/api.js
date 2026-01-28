import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // رابط السيرفر
});

// =================== Bookings ===================

// create booking
export const createBooking = (data) => API.post("/booking/create", data);

// get all bookings
export const getBookings = (token) =>
  API.get("/booking", { headers: { Authorization: `Bearer ${token}` } });

// delete booking
export const deleteBooking = (id, token) =>
  API.delete(`/booking/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// =================== Admin ===================

// login admin
export const loginAdmin = (data) => API.post("/auth/login", data);

// =================== Barber API ===================
// mark barber as arrived (admin only)
export const barberArrived = (id, token) =>
  API.patch(`/booking/arrived/${id}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
