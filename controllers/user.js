import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


export const userRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new UserModel({
            ...req.body,
            password: hashPassword,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}


export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not exists" });
        }
        const oldPassword = user.password;
        const correctPassword = await bcrypt.compare(password, oldPassword);
        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        user.password=undefined;
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.secret, { expiresIn: "10h" });
        console.log(token);
        res.status(200).json({ token: token, result : user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}


export const getAllUsers = async(req,res) =>{
    try{
        const allUsers = await UserModel.find({});
        res.status(200).json(allUsers);
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}