import { useContext, useState } from "react";
import {assets} from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {

    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setAToken, backendUrl} = useContext(AdminContext);
    const {setDToken, dToken} = useContext(DoctorContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if(state === "Admin"){
                const {data} = await axios.post(backendUrl + "api/admin/login", {email, password});

                if(data.success){
                    setAToken(data.token);
                    localStorage.setItem("aToken", data.token);
                }else{
                    toast.error(data.message);
                }
            }else{
                const {data} = await axios.post(backendUrl + "api/doctors/login", {email, password});
                if(data.success){
                    setDToken(data.token);
                    localStorage.setItem("dToken", data.token);
                    // console.log(dToken);
                }else{
                    toast.error(data.message);
                }
            }
        } catch (error) {
            
        }
    }


  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
            <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login</p>
            <div className="w-full">
                <p>Email</p>
                <input 
                    type="email" 
                    required
                    className="border border-[#dadada] rounded w-full p-2 mt-1"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}    
                />
                                    
            </div>
            <div className="w-full">
                <p>Password</p>
                <input
                    type="password" 
                    required
                    className="border border-[#dadada] rounded w-full p-2 mt-1" 
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}    
                />
                    
            </div>
            <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>

            {
                state === "Admin"
                ? <p className="mt-1">Doctor login?<span className="text-primary underline cursor-pointer" onClick={()=>{setState("Doctor")}}> Click Here!</span></p>
                : <p className="mt-1">Admin login?<span className="text-primary underline cursor-pointer" onClick={()=>{setState("Admin")}}> Click Here!</span></p>
            }
        </div>
    </form>
  )
}

export default Login