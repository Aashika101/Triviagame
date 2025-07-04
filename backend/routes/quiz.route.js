// quiz.route.js
import express from 'express';
import { verifyToken } from "../middleware/verifyToken.js";
import { getQuestions } from '../controllers/question.controller.js';

const router = express.Router();

router.get('/questions', verifyToken, getQuestions); 

export default router;