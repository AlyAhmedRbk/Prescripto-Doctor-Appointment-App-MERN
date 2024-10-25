import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";



export  const DoctorContext = createContext();

const DoctorContextProvider = (props) =>{
    const [dToken, setDToken] = useState(localStorage.getItem("dToken")?localStorage.getItem("dToken"):"");
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL; 


    const getAppointments = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + "api/doctors/appointments", {headers : {dToken}});

            if(data.success){
                setAppointments(data.appointments);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const completeAppointment = async (appointmentId) => {


        try {
            const {data} = await axios.post(backendUrl + "api/doctors/complete-appointment", {appointmentId}, {headers : {dToken}})

            if(data.success){
                toast.success(data.message);
                getAppointments();
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const cancelAppointment = async (appointmentId) => {


        try {
            const {data} = await axios.post(backendUrl + "api/doctors/cancel-appointment", {appointmentId}, {headers : {dToken}})

            if(data.success){
                toast.success(data.message);
                getAppointments();
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    
    const getDashData = async () => {
        
        try {

            const {data} = await axios.get(backendUrl + "api/doctors/dashboard", {headers : {dToken}});
            
            if(data.success){
                setDashData(data.dashData);
            }else{
                toast.error(data.message);
            }            
        } catch (error) {        
            console.log(error);
            toast.error(error.message);
        }
    }

    const getProfileData = async () => {

        try {

            const {data} = await axios.get(backendUrl + "api/doctors/profile", {headers : {dToken}});
            
            if(data.success){
                setProfileData(data.profileData);
                console.log(data.profileData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);      
        }
    }


    const value = {
        dToken, setDToken, backendUrl,
        getAppointments, setAppointments, appointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData, getDashData,
        profileData, setProfileData, getProfileData
    }

    

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}


export default DoctorContextProvider;