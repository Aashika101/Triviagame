// DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../components/ProfilePopup';
import ScorePopup from '../components/ScorePopup'; // Importing the ScorePopup

const DashboardPage = () => {
    const { user, logout } = useAuthStore();
    const [showProfile, setShowProfile] = useState(false);
    const [showScorePopup, setShowScorePopup] = useState(false); // State for ScorePopup
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
        >
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
                Dashboard
            </h2>

            <div className='flex items-center justify-center mb-6'>
                <FaUserCircle className='text-green-400 text-6xl mr-4 cursor-pointer' onClick={toggleProfile} /> 
                <div>
                    <h3 className='text-xl font-semibold text-green-400'>{user.name}</h3>
                    <p className='text-green-400'>Current Level: {user.currentLevel}</p>
                </div>
            </div>

            {showProfile && (
                <ProfilePopup user={user} onClose={toggleProfile} />
            )}


            {/* Select Level to Play */}
            <h3 className='text-lg font-semibold text-green-400 mb-4 text-center'>Select Level to Play:</h3>
            <div className='grid grid-cols-3 gap-4 mb-4'>
                {[1, 2, 3, 4, 5].map(level => (
                    <motion.button
                        key={level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => level <= user.currentLevel ? navigate(`/quiz/level/${level}`) : null}
                        className={`w-full py-3 bg-gradient-to-r from-${level <= user.currentLevel ? "green-500" : "gray-500"} to-${level <= user.currentLevel ? "emerald-600" : "gray-600"} text-white font-bold rounded-lg shadow-lg`}
                        disabled={level > user.currentLevel} // Disable button if level is locked
                    >
                        Level {level} {level > user.currentLevel && "(Locked)"}
                    </motion.button>
                ))}
            </div>

        
            {/* Button to open Score Popup */}
            <button
                onClick={() => setShowScorePopup(true)}
                className='w-full py-3  bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg mb-4'
            >
                View Scores
            </button>

            {/* Logout Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'>
                Logout
            </motion.button>


            {showScorePopup && (
                <ScorePopup
                    scores={user.scores} // Pass user's scores to the ScorePopup
                    onClose={() => setShowScorePopup(false)} // Function to close popup
                />
            )}
        </motion.div>
    );
};

export default DashboardPage;