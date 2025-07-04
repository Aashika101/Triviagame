// score.controller.js
import { User } from "../models/user.model.js";


export const updateScore = async (req, res) => {
    const { level, score } = req.body; // Expecting level and score from request
    
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log(`Updating score for User ID: ${user._id}`);
        console.log(`Current Scores: ${user.scores}`); // Log current scores
        console.log(`Level: ${level}, Submitted Score: ${score}`); // Log level and submitted score

        // Update user's score for the specific level
        user.scores[level - 1] = score; // Level is 1-indexed, but scores array is 0-indexed
        user.currentLevel = Math.max(user.currentLevel, level + (score >= 3 ? 1 : 0)); // Unlock next level if score >= 3
        
        await user.save();

        console.log(`Updated Scores: ${user.scores}`); // Log updated scores
        
        res.status(200).json({ success: true, message: "Score updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};