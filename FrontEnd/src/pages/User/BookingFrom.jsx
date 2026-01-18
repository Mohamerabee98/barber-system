import React, { useState } from "react";
import Swal from "sweetalert2";
import { createBooking } from "../../utils/api.js";
import "./booking.css";

const servicesList = [
  { name: " قص شعر ", price: 50 },
  { name: "قص شعر + استشوار ", price: 30 },
  { name: "قص شعر + دقن + استشوار ", price: 70 },
  { name: "تنظيف بشره عميق", price: 40 },
];

const timesList = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00"
];


const daysList = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    service: "",
    price: "",
    day: "",
    time: "",
  });


  const handleServiceChange = (e) => {
    const selectedService = servicesList.find(s => s.name === e.target.value);
    setFormData({
      ...formData,
      service: e.target.value,
      price: selectedService ? selectedService.price : ""
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.phone || !formData.service || !formData.price || !formData.day || !formData.time) {
      return Swal.fire("Error", "All fields are required!", "error");
    }

    try {
      await createBooking(formData);
      Swal.fire("Success", "Booking Created Successfully!", "success");

      setFormData({
        name: "",
        age: "",
        phone: "",
        service: "",
        price: "",
        day: "",
        time: "",
      });
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Booking Failed!", "error");
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Appointment</h2>
      <form className="booking-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleServiceChange}
          required
          autoComplete="off"
        >
          <option value="">Select Service</option>
          {servicesList.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name} - EGP{s.price}
            </option>
          ))}
        </select>

        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          required
          autoComplete="off"
        >
          <option value="">Select Day</option>
          {daysList.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          autoComplete="off"
        >
          <option value="">Select Time</option>
          {timesList.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
