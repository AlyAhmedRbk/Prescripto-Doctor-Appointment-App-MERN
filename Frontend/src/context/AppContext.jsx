import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import axios from "axios";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [userData, setUserData] = useState(false);

    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):false);

    const getDoctorsData = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + "/api/doctors/list")

            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const loadProfileData = async () => {

        try {
            
            const {data} = await axios.get(backendUrl + "/api/user/get-profile", { headers : {token}});

            if(data.success){
                setUserData(data.userData);
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getDoctorsData()
    }, [])

    useEffect(()=>{
        if(token){
            loadProfileData()
        }else{
            setUserData(false)
        }
    }, [token])

    const value = {
        doctors,currencySymbol,getDoctorsData,
        token, setToken, backendUrl,
        userData, setUserData, loadProfileData,
    }

  



    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;