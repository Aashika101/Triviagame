// seed.js (run this file once to populate the database)
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Question } from "../models/question.model.js";

dotenv.config();

const questions = [
    
    // Level 1 Questions
    { question: "What is the capital of France?", options: ["Rome", "Paris", "Madrid", "Berlin"], answer: "Paris", level: 1, category: "General Knowledge" },
    { question: "Which planet is known as the 'Red Planet'?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars", level: 1, category: "General Knowledge" },
    { question: "How many colors are in a rainbow?", options: ["5", "6", "7", "8"], answer: "7", level: 1, category: "General Knowledge" },
    { question: "Which animal is known as the 'King of the Jungle'?", options: ["Elephant", "Lion", "Tiger", "Gorilla"], answer: "Lion", level: 1, category: "General Knowledge" },
    { question: "What do bees produce?", options: ["Milk", "Nectar", "Honey", "Oil"], answer: "Honey", level: 1, category: "General Knowledge" },
    
    // Level 2 Questions
    { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: "George Washington", level: 2, category: "History" },
    { question: "In which year did World War II end?", options: ["1941", "1943", "1945", "1947"], answer: "1945", level: 2, category: "History" },
    { question: "Which ancient civilization built the pyramids?", options: ["Roman", "Egyptian", "Greek", "Persian"], answer: "Egyptian", level: 2, category: "History" },
    { question: "Who was the famous nurse known for her work during the Crimean War?", options: ["Florence Nightingale", "Clara Barton", "Marie Curie", "Mother Teresa"], answer: "Florence Nightingale", level: 2, category: "History" },
    { question: "What was the name of the ship on which the Pilgrims traveled to America in 1620?", options: ["Santa Maria", "Mayflower", "Victoria", "Enterprise"], answer: "Mayflower", level: 2, category: "History" },
    
    // Level 3 Questions
    { question: "What is the chemical symbol for the element Iron?", options: ["Ir", "I", "Fe", "In"], answer: "Fe", level: 3, category: "Science" },
    { question: "What part of the cell is often referred to as the 'powerhouse of the cell'?", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], answer: "Mitochondria", level: 3, category: "Science" },
    { question: "Which planet has the most moons in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Mars"], answer: "Saturn", level: 3, category: "Science" },
    { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon Dioxide"], answer: "Carbon Dioxide", level: 3, category: "Science" },
    { question: "Which element has the highest melting point?", options: ["Gold", "Iron", "Carbon", "Tungsten"], answer: "Tungsten", level: 3, category: "Science" },
    
    // Level 4 Questions
    { question: "Who wrote 'Pride and Prejudice'?", options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Emily Brontë"], answer: "Jane Austen", level: 4, category: "Literature" },
    { question: "In George Orwell's '1984', what is the name of the totalitarian regime's leader?", options: ["Big Brother", "The Commander", "Supreme Leader", "Comrade Napoleon"], answer: "Big Brother", level: 4, category: "Literature" },
    { question: "What is the first line of 'Moby-Dick'?", options: ["It was the best of times, it was the worst of times.", "In the beginning, God created the heavens and the earth.", "Call me Ishmael.", "It was a bright cold day in April, and the clocks were striking thirteen."], answer: "Call me Ishmael.", level: 4, category: "Literature" },
    { question: "Which author wrote 'The Picture of Dorian Gray'?", options: ["F. Scott Fitzgerald", "Oscar Wilde", "Leo Tolstoy", "Mark Twain"], answer: "Oscar Wilde", level: 4, category: "Literature" },
    { question: "In J.K. Rowling’s Harry Potter series, what is the full name of Dumbledore?", options: ["Albus Percival Wulfric Brian Dumbledore", "Albus Severus Brian Dumbledore", "Albus Brian Sirius Dumbledore", "Albus Brian Lupin Dumbledore"], answer: "Albus Percival Wulfric Brian Dumbledore", level: 4, category: "Literature" },
    
    // Level 5 Questions
    { question: "What is the longest river in South America?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Amazon", level: 5, category: "Geography" },
    { question: "Which country has the most natural lakes?", options: ["Russia", "Canada", "United States", "Brazil"], answer: "Canada", level: 5, category: "Geography" },
    { question: "Which city is known as the 'City of Canals'?", options: ["Amsterdam", "Venice", "Stockholm", "Bangkok"], answer: "Venice", level: 5, category: "Geography" },
    { question: "What is the largest desert in the world?", options: ["Arabian Desert", "Gobi Desert", "Sahara Desert", "Antarctic Desert"], answer: "Antarctic Desert", level: 5, category: "Geography" },
    { question: "Mount Everest lies on the border of which two countries?", options: ["Nepal and China", "India and China", "Nepal and India", "Bhutan and China"], answer: "Nepal and China", level: 5, category: "Geography" },
    

];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected!");

        await Question.deleteMany({});
        await Question.insertMany(questions);
        console.log("Database seeded!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();