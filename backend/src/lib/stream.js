import {StreamChat} from 'stream-chat';
import 'dotenv/config';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream API key or Secret key is missing");

}

const StreamClient  = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStream = async(userData) =>{
    try{
        await StreamClient.upsertUsers([userData]);
        return userData;
    } catch(error){
        console.error("Error upserting Stream user: ",error)
    }
};

export const generateStreamToken = (userId)=>{
     try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return StreamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};