import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// Api to register user
const registerUser = async (req, res) => {
    try {

        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.json({success : false, message : "Missing details!"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success : false, message : "Please Provide a valid email!"});
        }
        
        if(password.length < 8){
            return res.json({success : false, message : "Enter a strong password!"});
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // creating token for user
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        res.json({success : true, token})

    } catch (error) {
        res.json({success : false, message : error.message})
        console.log(error)
    }
}

// API for user login
const loginUser =  async (req, res) =>{
    try {
        
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.json({success : false, message : "User doesn't Exisits!"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
        const  token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        res.json({success : true, token});
    }else{
        res.json({success : false, message : "Invalid Cradentials"});
    }


    } catch (error) {
        res.json({success : false, message : error.message})
        console.log(error)
    }
}

// Api to get User Profile
const getProfile = async (req, res) => {

    try {
        
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select("-password");

        res.json({success : true, userData})

    } catch (error) {
        res.json({success : false, message : error.message})
        console.log(error)
    }

}

// API to update user profile
const updateProfile = async (req, res) => {
    try {

        const {userId, name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !dob || !gender || !address){
            return res.json({success : false, message : "Data Missing!"})
        }
        
        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender});

        if(imageFile){

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type : "image"});
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {image : imageUrl});
        }

        res.json({success : true, message : "Profile Updated Successfully!"})
        
    } catch (error) {
        res.json({success : false, message : error.message})
        console.log(error);
    }
}

// API to Book Appointment
const bookAppointment = async (req, res) => {

    try {
        
        const {userId, docId, slotDate, slotTime} = req.body;

        const docData = await doctorModel.findById(docId).select("-password");

        if(!docData.available){
            return res.json({success : false, message : "Doctor Not Available"});
        }

        let slots_booked = docData.slots_booked;

        // checking for slots availablity
        if(slots_booked[slotDate]){
            if (slots_booked[slotDate].includes(slotTime)){
                return res.json({success : false, message : "Slot Not Available"});
            }else{
                slots_booked[slotDate].push(slotTime);
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select("-password");

        delete(docData.slots_booked);

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount : docData.fees,
            slotTime,
            slotDate,
            date : Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots in docs data
        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        res.json({success : true, message : "Appointment Booked!"})

    } catch (error) {
        res.json({success : false, message : error.message})
        console.log(error);
    }
}
// API to get users appointments for frontend my-apoointment page

const listAppointment = async (req, res) =>{
    

    try {
        
        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId});

        res.json({success : true, appointments})

    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

// API to cancel the appointment

const cancelAppointment = async (req, res) => {
    try {
        
        const {userId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        // Verify appointment user
        if(appointmentData.userId !== userId){
            return res.json({success : false, message : "Unauthorized Action!"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled : true});

        const {docId, slotDate, slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        res.json({success : true, message : "Appointment Cancelled!"});

    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment};