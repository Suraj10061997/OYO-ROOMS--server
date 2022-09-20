import express from 'express';

const router = express.Router();

import {
    getAllRooms,
    getSingleRoom
} from "../controllers/room.js";

router.get("/getAllRooms",getAllRooms);
router.get("/getSingleRoom/:roomId",getSingleRoom);



export default router;