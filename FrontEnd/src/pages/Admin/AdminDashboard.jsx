import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getBookings, deleteBooking } from "../../utils/api";
import "./Css/dashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("adminToken");

  const fetchBookings = async () => {
    try {
      const { data } = await getBookings(token);
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch bookings!", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id, token);
      Swal.fire("Deleted", "Booking deleted!", "success");
      fetchBookings();
    } catch (error) {
      Swal.fire("Error", "Failed to delete booking!", "error");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Price</th>
            <th>Day</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.age}</td>
                <td>{b.phone}</td>
                <td>{b.service}</td>
                <td>{b.price} EGP</td>
                <td>{b.day}</td>
                <td>{b.time}</td>
                <td>
                  <button className="deleteBtn" onClick={() => handleDelete(b._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
