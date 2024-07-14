import { useState,useEffect } from "react"
import toast from "react-hot-toast";
import axios from "axios";
const useGetConversation = () => {
    const [loading,setLoading] = useState(false);
    const [conversation,setConversation] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try{
                const res = await axios.get("/api/users",{withCredentials: true});
                const data = await res.data;
                console.log(data);
                if(data.error){
                    throw new Error(data.error);
                }
                setConversation(data);
                
            } catch(err){
                toast.error(err.message);
            } finally{
                
                setLoading(false);
            }
        }
        getConversation();
    },[])
  return {loading,conversation};
}

export default useGetConversation;