import Swal from "sweetalert2";

export const alertSuccess = (msg) =>
  Swal.fire("تم بنجاح", msg, "success");

export const alertError = (msg) =>
  Swal.fire("خطأ", msg, "error");

export const alertConfirmDelete = () =>
  Swal.fire({
    title: "هل أنت متأكد؟",
    text: "لا يمكن التراجع عن هذا الإجراء!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "نعم، احذف",
    cancelButtonText: "إلغاء",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

export const alertToastNewBooking = (text) =>
  Swal.fire({
    icon: "success",
    title: "حجز جديد",
    text,
    toast: true,
    position: "top-right",
    timer: 2000,
    showConfirmButton: false,
  });
