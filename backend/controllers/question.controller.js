import { Question } from "../models/question.model.js";

export const getQuestions = async (req, res) => {
    const level = parseInt(req.query.level); // Get level from query parameters
    try {
        const questions = await Question.find({ level }).limit(5); // Fetch 5 questions for the specified level
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};