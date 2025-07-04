// question.model.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { 
        type: String, 
        required: true 
    },
    options: [{ 
        type: String, 
        required: true 
    }],
    answer: { 
        type: String, 
        required: true 
    },
    level: { 
        type: Number, 
        required: true 
    }, // Level of the question
    category: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);