import React, { useState } from "react";
import Swal from "sweetalert2";
import { createBooking } from "../../utils/api.js";
import "./booking.css";
import { Helmet } from "react-helmet-async";

import { validateBookingForm } from "./booking.validation.js";

const servicesList = [
  { name: "قص شعر", price: 50 },
  { name: "قص شعر + استشوار", price: 30 },
  { name: "قص شعر + دقن + استشوار", price: 70 },
  { name: "تنظيف بشره عميق", price: 40 },
];

const timesList = [
  "08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00",
];

const daysList = [
  "Monday","Tuesday","Wednesday","Thursday",
  "Friday","Saturday","Sunday",
];

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "", age: "", phone: "", service: "", price: "", day: "", time: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceChange = (e) => {
    const selected = servicesList.find(s => s.name === e.target.value);
    setFormData({ ...formData, service: e.target.value, price: selected ? selected.price : "" });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = validateBookingForm(formData);
  if (Object.keys(errors).length > 0) {
    const firstError = Object.values(errors)[0];
    return Swal.fire("Error", firstError, "error");
  }

  try {
    const response = await createBooking(formData);
    Swal.fire("تم الحجز بنجاح", response.data.message || "تم الحجز بنجاح", "success");
    setFormData({ name:"", age:"", phone:"", service:"", price:"", day:"", time:"" });
  } catch (error) {
    const msg = error.response?.data?.message;
    if (msg === "This slot is full") {
      Swal.fire("عفوًا!", "هذا اليوم والوقت محجوز بالكامل.", "warning");
    } else {
      Swal.fire("Error", msg || "Booking Failed!", "error");
    }
  }
};

  return (
    <div className="booking-container">
      <Helmet>
        <title>Book Your Appointment</title>
      </Helmet>
      <h2>Book Your Appointment</h2>
      <form className="booking-form" onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />

        <select name="service" value={formData.service} onChange={handleServiceChange}>
          <option value="">Select Service</option>
          {servicesList.map(s => <option key={s.name} value={s.name}>{s.name} - EGP{s.price}</option>)}
        </select>

        <select name="day" value={formData.day} onChange={handleChange}>
          <option value="">Select Day</option>
          {daysList.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select name="time" value={formData.time} onChange={handleChange}>
          <option value="">Select Time</option>
          {timesList.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
