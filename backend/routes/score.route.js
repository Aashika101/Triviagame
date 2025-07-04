// score.route.js
import express from 'express';
import { verifyToken } from "../middleware/verifyToken.js";
import { updateScore } from '../controllers/score.controller.js';

const router = express.Router();

router.post('/update-score', verifyToken, updateScore); 

export default router;