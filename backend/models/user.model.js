import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    email:{
         type:String,
         required:true,
         unique: true
    },
    password:{
        type:String,
        require:true,
        },
    name:{
         type:String,
         required:true
         },
    lastLogin: {
         type: Date,
         default: Date.now
    },
    isVerified: {
         type: Boolean,
         default: false
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    currentLevel: {
     type: Number,
     default: 1 // Start at level 1
 },
 scores: {
     type: [Number],
     default: [0, 0, 0, 0, 0] // Store scores for levels 1-5
 }
}, {timestamps:  true});

export const User  = mongoose.model('User', userSchema);
