import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
    // console.log("message send to senfire sensei", req.params.id, req.body.message);

    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;  //current loggedin user

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [{sender: senderId, message}]
            });
            const newMessage = new Message({
                senderId,
                receiverId,
                message,
            });

            if(newMessage){
                conversation.messages.push(newMessage._id);
            }
            await Promise.all([conversation.save(), newMessage.save()]);
            res.status(201).json({message: "Message sent successfully", newMessage});
        }
    } catch (error) {
        console.log("Error in Sending message" + error);
        res.status(500).json({message:"Internal server error"});
    }
};
