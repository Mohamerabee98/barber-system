import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getBookings, deleteBooking } from "../../utils/api.js"; // تأكد إنك عملت API function للـ deleteAllBookings
import "./Css/dashboard.css";
import { Helmet } from "react-helmet-async";

const socket = io("http://localhost:3000");

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // ✅ Protected Route
  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  // fetch bookings from backend
  const fetchBookings = async () => {
    try {
      const { data } = await getBookings(token);
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch bookings!",
        "error"
      );
    }
  };

  // delete single booking
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteBooking(id, token);
        setBookings((prev) => prev.filter((b) => b._id !== id));
        Swal.fire("Deleted!", "Booking has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Failed to delete booking!",
          "error"
        );
      }
    }
  };

  // const handleDeleteAll = async () => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "This will delete ALL bookings permanently!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete all!",
  //     cancelButtonText: "Cancel",
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       await deleteAllBookings(token); 
  //       setBookings([]);
  //       Swal.fire("Deleted!", "All bookings have been deleted.", "success");
  //     } catch (error) {
  //       Swal.fire(
  //         "Error",
  //         error.response?.data?.message || "Failed to delete all bookings!",
  //         "error"
  //       );
  //     }
  //   }
  // };

  // socket.io for real-time updates
  useEffect(() => {
    fetchBookings();

    const handleNewBooking = (booking) => {
      setBookings((prev) => [booking, ...prev]);
      Swal.fire({
        icon: "success",
        title: "New Booking",
        text: `${booking.name} booked ${booking.service}`,
        toast: true,
        position: "top-right",
        timer: 2000,
        showConfirmButton: false,
      });
    };

    socket.on("newBooking", handleNewBooking);
    return () => socket.off("newBooking", handleNewBooking);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Helmet>
          <title>Admin Dashboard</title>
        </Helmet>
        <h2>Admin Dashboard</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#555", margin: 0 }}>
            Total Bookings:{" "}
            <span
              style={{
                backgroundColor: "#1abc9c",
                color: "#fff",
                padding: "3px 8px",
                borderRadius: "12px",
                fontSize: "14px",
              }}
            >
              {bookings.length}
            </span>
          </p>

          {/* {bookings.length > 0 && (
            <button
              className="delete-all-btn"
              onClick={handleDeleteAll}
              style={{
                backgroundColor: "#e74c3c",
                color: "#fff",
                padding: "5px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete All
            </button>
          )} */}
        </div>
      </div>

      {/* Desktop Table */}
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
          {bookings.length > 0 ? (
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
                  <button
                    onClick={() => handleDelete(b._id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      padding: "3px 8px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div key={b._id} className="card">
              <p>
                <strong>Name:</strong> {b.name}
              </p>
              <p>
                <strong>Age:</strong> {b.age}
              </p>
              <p>
                <strong>Phone:</strong> {b.phone}
              </p>
              <p>
                <strong>Service:</strong> {b.service}
              </p>
              <p>
                <strong>Price:</strong> {b.price} EGP
              </p>
              <p>
                <strong>Day:</strong> {b.day}
              </p>
              <p>
                <strong>Time:</strong> {b.time}
              </p>
              <button onClick={() => handleDelete(b._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
