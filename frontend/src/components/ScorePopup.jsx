// ScorePopup.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ScorePopup = ({ scores, onClose }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className='bg-gray-800 rounded-lg shadow-lg p-6 w-80'
            >
                <h3 className='text-lg font-semibold text-green-400 mb-4'>Your Scores</h3>
                <ul className='list-disc pl-5 mb-4'>
                    {scores.map((score, index) => (
                        <li key={index} className='text-green-400'>
                            Level {index + 1}: {score} points {score >= 3 ? "(Unlocked)" : "(Locked)"}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={onClose}
                    className='w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg'
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default ScorePopup;