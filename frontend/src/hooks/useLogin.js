import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading,setloading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const login = async (username, password) => {
        setloading(true);
        try{
            if(!username || !password) {
                toast.error("Please fill all fields");
                return;
            }
            const res = await axios.post("/api/auth/login",{username,password},{
                withCredentials: true 
            });
            const data = res.data;
            console.log(data);
            if (data.error) {
				throw new Error(data.error);
			}
            localStorage.setItem("Bearer",JSON.stringify(data.token));
            await setAuthUser(data);
        }
        catch(error){
            toast.error(error.message);
            setloading(false);
        }
        finally{
            setloading(false);
        }
    }
    return {loading,login}
}

export default useLogin