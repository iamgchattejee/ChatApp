import User from "../models/user.model";
import Conversation from "../models/conversation";

export const sendMessage = async (req,res) => {
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.userId;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new MessageChannel({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        })

        if(newMessage){
            conversation.messages.push(newMessage);
            await conversation.save();
            res.status(201).json(newMessage);
        }

    }
    catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const getMessages = async (req,res) => {
    try{
        const {id:userToChatId} = req.params;
        const senderId = await User.findById(req.userId).select("-password");

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages");

        if(!conversation){
            return res.status(404).json({message:"Conversation not found"});
        }

        res.status(200).json(conversation.messages);

    }
    catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }
};