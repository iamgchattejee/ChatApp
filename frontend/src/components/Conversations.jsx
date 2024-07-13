import useGetConversations from "../hooks/useGetConversation";
import { getRandomEmoji } from "../utils/emojis";
import Conversation from "./Conversation";
import { useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Conversations = () => {
	//const { loading, conversations } = useGetConversations();
	const [conversation,setConversation] = useState([]);
	const [loading,setLoading] = useState(false);


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


	//console.log("CONVERSATIONS: "+conversation);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversation.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversation.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};

export default Conversations;