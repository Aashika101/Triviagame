import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

const QuizPage = () => {
    const { level } = useParams(); // Get level from URL parameters
    const { user, setUser } = useAuthStore(); // Destructure setUser from useAuthStore
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [showTryAgain, setShowTryAgain] = useState(false);
    const [equation, setEquation] = useState(null);
    const [userEquationAnswer, setUserEquationAnswer] = useState(''); // User's answer for the equation
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Updated score:", score);
        
    }, [score]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`http://localhost:5001/api/quiz/questions?level=${level}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user.token}`,
                },
            });

            const data = await response.json();
            setQuestions(data);
        };

        fetchQuestions();
    }, [user.token, level]);

    const handleAnswer = async (selectedOption) => {
        const correctAnswer = questions[currentQuestionIndex].answer;
        const correct = correctAnswer === selectedOption;
        const currentScore = correct ? score +1 : score - 1;

        if (correct) {
            setScore(score + 1);  
        } else {
            setIncorrectCount(incorrectCount + 1);
        }

        setUserAnswers([...userAnswers, selectedOption]);

        if (((currentQuestionIndex + 1) - currentScore) == 3) {
            await triggerExternalAPI();
        } else {
            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                handleQuizEnd(correct ? score + 1 : score - 1);
            }
        }
    };

    const triggerExternalAPI = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/external/external-data', {
                headers: {
                    Authorization: `${user.token}`,
                },
            });
            console.log('Fetched Equation Response:', response.data); // Log the response in the terminal
            setEquation(response.data);
            setShowTryAgain(true);
        } catch (error) {
            console.error('Error calling external API:', error);
        }
    };

    const handleTryAgainClick = () => {
        // Reset the user's answer for the equation
        setUserEquationAnswer('');
        triggerExternalAPI();
    };

    const handleEquationAnswerSubmit = async () => {
        if (equation && userEquationAnswer) {
            // Compare the user's answer with the fetched solution
            if (parseInt(equation.solution) === parseInt(userEquationAnswer)) {
                // If the answer is correct, continue the game at the same level
                alert("Correct answer! You can continue.");
                setShowTryAgain(false); // Hide the try again section
            } else {
                // Game over logic
                alert("Game Over! Your score: " + score);
                await updateScore(score);
                navigate('/'); // Redirect to dashboard
            }
        }
    };

    const handleQuizEnd = async (score) => {
        alert(`Quiz Finished! Your score: ${score} out of ${questions.length}`);
        await updateScore(score);

        // Update user's level
        console.log(user);
        setUser((prevUser) => ({ ...prevUser, currentLevel: Math.max(prevUser.currentLevel, parseInt(level) + 1) }));
        // setUser(prevUser => ({ ...prevUser, currentLevel: Math.max(prevUser.currentLevel, parseInt(level) + 1) }));

        navigate('/'); // Navigate back to the dashboard
    };

    const updateScore = async (finalScore) => {
        try {
            const response = await axios.post('http://localhost:5001/api/score/update-score', {
                level: parseInt(level),
                score: finalScore,
            }, {
                headers: {
                    Authorization: `${user.token}`,
                }
            });

            if (response.data.success) {
                console.log("Score updated successfully:", response.data);
            } else {
                console.error("Failed to update score:", response.data.message);
            }
        } catch (error) {
            console.error('Failed to update score:', error);
        }
    };

    if (questions.length === 0) {
        return <div>Loading questions...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
        >
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
                Level {level} Quiz
            </h2>

            {showTryAgain ? (
                <div className='text-center'>
                    <h3 className='text-lg font-semibold text-red-500'>You've made too many incorrect attempts! solve the equation to continue</h3>
                    <input
                        type="text"
                        placeholder="Your answer"
                        value={userEquationAnswer}
                        onChange={(e) => setUserEquationAnswer(e.target.value)}
                        className='mt-4 p-2 rounded'
                    />
                    <button
                        onClick={handleEquationAnswerSubmit}
                        className='mt-4 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg'
                    >
                        Submit
                    </button>
                    {equation && (
                        <div className='mt-4'>
                            <h4 className='text-lg text-white font-semibold'>Solve Equation:</h4>
                            <img src={equation.question} alt="Equation" className='mt-2' />
                        </div>
                    )}
                </div>
            ) : (
                <div className='mb-6 text-white'>
                    <h3 className='text-lg font-semibold'>
                        Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
                    </h3>
                    <div className='mt-4'>
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAnswer(option)}
                                className='block w-full py-2 mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg'
                            >
                                {option}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default QuizPage;