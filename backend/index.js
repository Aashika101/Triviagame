import express from 'express';
import dotenv  from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './db/connectDB.js';
import authRoutes  from './routes/auth.route.js';
import quizRoutes from './routes/quiz.route.js';
import scoreRoutes from './routes/score.route.js';
import externalApiRoutes from './routes/externalApi.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:5173", credentials:true}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes); 
app.use('/api/score', scoreRoutes);
app.use('/api/external', externalApiRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT)
});
