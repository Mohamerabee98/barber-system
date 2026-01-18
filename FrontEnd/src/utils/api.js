import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // سيرفر الباك اند بتاعك
});

// مثال: create booking
export const createBooking = (data) => API.post("/booking/create", data);

// login admin
export const loginAdmin = (data) => API.post("/auth/login", data);

// get all bookings
export const getBookings = (token) =>
  API.get("/booking", { headers: { Authorization: `Bearer ${token}` } });

// delete booking
export const deleteBooking = (id, token) =>
  API.delete(`/booking/${id}`, { headers: { Authorization: `Bearer ${token}` } });
