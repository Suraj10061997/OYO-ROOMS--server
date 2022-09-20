import express from "express";
import auth from "../middlewares/auth.js";

const router = express.Router();

import {
    singleBooking,
    userBookings,
    bookingCancelling,
    getAllBookings
} from "../controllers/booking.js";

router.post("/singleBooking",auth,singleBooking);
router.post("/userBookings",auth,userBookings);
router.post("/bookingCancelling",auth,bookingCancelling);
router.get("/admin/allBookings",auth,getAllBookings);

export default router;