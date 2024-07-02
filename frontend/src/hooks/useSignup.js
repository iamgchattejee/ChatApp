import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const [authUser,setAuthUser] = useAuthContext();

    const signup = async ({fullName,username,password,confirmPassword,gender}) => {
        try{
            if(!fullName || !username || !password || !confirmPassword || !gender) {
                toast.error("Please fill all fields");
                return;
            }
            if(password!=confirmPassword) {
                toast.error("Paswords do not match");
                return;
            }
            if(password.length < 6) {
                toast.error("Password must be at least 6 characters long");
                return;
            }
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/auth/signup",{fullName,username,password,confirmPassword,gender});
            const data = res.data;
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("Bearer",JSON.stringify(data.token));
            setAuthUser(data);
            console.log(data);
        }
        catch(err){
            toast.error(err.message);
        }
        finally{
            setLoading(false);
        }
        
    }
  return (
    {loading,signup}
  )
}
