import connectDB from "./db/connection.js"
import authRouter from "./modules/auth/auth.controller.js"
import bookingRouter from "./modules/Booking/booking.controller.js"
import cors from "cors";
const bootstrap =async (app , express)=>{
    // parse req
    app.use(express.json())
    app.use(cors())
    // connection db 
   await connectDB()
   //auth
   app.use("/auth" , authRouter)
   app.use("/booking" , bookingRouter)
  
}
export default bootstrap    