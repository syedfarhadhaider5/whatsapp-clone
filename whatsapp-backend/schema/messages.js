import mongoose  from "mongoose";

const allmessages = mongoose.Schema({
    name: String,
    message: String,
    timestamp: String,
    received: Boolean,
});

export default mongoose.model("messages",allmessages);