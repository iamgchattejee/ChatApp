import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from 'axios';
const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    const logout = async () => {
        setLoading(true)
        try{
            const res = await axios.post("/api/auth/logout",{withCredentials: true});
            localStorage.removeItem("Bearer");
            setAuthUser(null);
        }
        catch(err){
            toast.error(err.message);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        {loading,logout}
      )
}

export default useLogout