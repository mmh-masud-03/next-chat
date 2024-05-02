import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    profileImage:{
        type: String,
        default: ""
    },
    chats:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref:"Chat"}],
        default: []
    }
});

const User = mongoose.models.User || mongoose.model.Schema("User", UserSchema);

export default User;