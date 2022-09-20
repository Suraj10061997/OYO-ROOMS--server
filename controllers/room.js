import RoomModel from "../models/room.js";

export const getAllRooms = async(req,res)=>{
    try{
        const rooms = await RoomModel.find({});
        res.status(200).json(rooms);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

export const getSingleRoom = async(req,res)=>{
    const {roomId} = req.params;
    try{
        const room = await RoomModel.findById(roomId);
        res.status(200).json(room);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

