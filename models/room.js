import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name:{type:String,required:true},
    maxcount:{type:Number,required:true},
    phonenumber:{type:Number,required:true},//phone number of the hotel
    rentperDay:{type:Number,required:true},
    imageurls:[],
    currentbookings:[], //A room can have more than one current booking
    type:{type:String,required:true},
    description:{type:String,required:true},
},{
    timestamps:true
})

/*
Explanation: Upon execution, the mongodb shell will retrieve the date-time associated with the object id passed. The return will be in the ISODate format, with the exact date and time of the operation. 
Refer the below screenshot for output:

ObjectId("5ec2f8f009f2b0337b4197fe").getTimestamp();
Ans->  ISODate("2020-05-18T21:06:56Z")
*/
const RoomModel = mongoose.model("Room",roomSchema);
export default RoomModel;