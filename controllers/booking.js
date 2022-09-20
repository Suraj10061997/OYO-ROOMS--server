
import BookingModel from "../models/booking.js";
import RoomModel from "../models/room.js";

export const singleBooking = async(req,res)=>{
    try{
        const length = await BookingModel.countDocuments({});
        const newBooking = new BookingModel({
            ...req.body,
            transactionId:`TRANS00${length+1}`,
        })
        await newBooking.save();

        const roomTemp = await RoomModel.findById(req.body.roomId);
        roomTemp.currentbookings.push({
            bookingId:newBooking._id,
            fromDate:newBooking.fromDate,
            toDate:newBooking.toDate,
            userId:newBooking.userId,
            status:newBooking.status
        })
        await roomTemp.save({validateBeforeSave:false});

        res.status(201).json(newBooking);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

export const userBookings = async(req,res)=>{
    const {userId} = req.body;
    try{
        const allBookings = await BookingModel.find({userId:userId});
        res.status(200).json(allBookings);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

export const bookingCancelling = async(req,res)=>{
    const {bookingId,roomId,userId} = req.body;
    console.log(bookingId);
    try{
        const booking = await BookingModel.findById(bookingId);
        booking.status="cancelled";
        await booking.save({validateBeforeSave:false});

        const room = await RoomModel.findById(roomId);
        const currentBookings = room.currentbookings;
        const filteredBookings = currentBookings.filter(booking => booking.bookingId.toString() !== bookingId);

        room.currentbookings = filteredBookings;
        room.save({validateBeforeSave:false});

        const allBookings = await BookingModel.find({userId:userId});
        res.status(200).json(allBookings);
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

export const getAllBookings = async(req,res) =>{
    try{
        const allBookings = await BookingModel.find({});
        res.status(200).json(allBookings);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}