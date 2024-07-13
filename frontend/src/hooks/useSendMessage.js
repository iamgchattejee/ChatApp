import useConversation from "../zustand/useConversation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {

    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    const sendMessage = async (message) => {
        setLoading(true);
        try{
            if(!message) return toast.error("Please enter a message");
            if(!selectedConversation) return toast.error("Please select a conversation");
            const res = await axios.post(`/api/messages/send/${selectedConversation._id}`,{message},{
                withCredentials:true
            });
            console.log(res.data)
            setMessages([...messages,res.data]);
        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            setLoading(false);
            
        }
    }
    return {loading,sendMessage}
}

export default useSendMessage;