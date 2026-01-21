
export const validateBookingForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  const ageNum = parseInt(formData.age, 10);
  if (isNaN(ageNum) || ageNum < 5 || ageNum > 120) {
    errors.age = "Age must be a number between 5 and 120";
  }

  if (!/^\d{11}$/.test(formData.phone)) {
    errors.phone = "Phone must be exactly 11 digits";
  }

  if (!formData.service) {
    errors.service = "Please select a service";
  }

  if (!formData.day) {
    errors.day = "Please select a day";
  }

  if (!formData.time) {
    errors.time = "Please select a time";
  }

  return errors;
};
