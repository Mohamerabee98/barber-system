import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY || "booking-secret";

export const encrypt = (text) => {
  if (!text) return "";
  return CryptoJS.AES.encrypt(text.toString(), SECRET_KEY).toString();
};

export const decrypt = (cipher) => {
  if (!cipher) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decrypt error:", error);
    return "";
  }
};
