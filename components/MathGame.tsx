import React, { useState, useEffect } from 'react';
import Guideline from './Guideline';
import { generateMathQuestions } from '../services/geminiService';
import { MathQuestion, Difficulty } from '../types';

const MathGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startGame = async () => {
    setLoading(true);
    setGameState('playing');
    setScore(0);
    setCurrentIndex(0);
    const qs = await generateMathQuestions(difficulty);
    setQuestions(qs);
    setLoading(false);
  };

  const handleAnswer = (option: number) => {
    if (selectedOption !== null) return; // Prevent double click
    setSelectedOption(option);
    
    if (option === questions[currentIndex].answer) {
      setScore(s => s + 10);
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setGameState('end');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-panel p-8 rounded-2xl min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none"></div>

        {gameState === 'start' && (
          <div className="space-y-8 z-10 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display text-white">
              Neon Math <span className="text-neon-pink">Challenge</span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Test your skills with AI-generated math problems. Select your difficulty and start solving!
            </p>
            
            <div className="flex gap-4 justify-center">
              {Object.values(Difficulty).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    difficulty === d 
                    ? 'border-neon-blue bg-neon-blue/20 text-white shadow-neon-blue' 
                    : 'border-slate-700 text-slate-500 hover:border-slate-500'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <button
              onClick={startGame}
              className="px-8 py-3 bg-neon-pink hover:bg-fuchsia-400 text-white font-bold rounded-full shadow-neon-pink transition-all transform hover:scale-105"
            >
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && loading && (
          <div className="flex flex-col items-center gap-4 z-10">
            <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-neon-blue animate-pulse">Summoning equations...</p>
          </div>
        )}

        {gameState === 'playing' && !loading && questions.length > 0 && (
          <div className="w-full max-w-2xl z-10">
            <div className="flex justify-between items-center mb-8 text-sm uppercase tracking-widest text-slate-500 font-bold">
              <span>Question {currentIndex + 1}/{questions.length}</span>
              <span className="text-neon-green">Score: {score}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-display text-white mb-8">
              {questions[currentIndex].question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {questions[currentIndex].options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === questions[currentIndex].answer;
                
                let btnStyle = "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200";
                
                if (selectedOption !== null) {
                   if (isCorrect) btnStyle = "bg-green-500/20 border-green-500 text-green-400";
                   else if (isSelected) btnStyle = "bg-red-500/20 border-red-500 text-red-400";
                   else btnStyle = "bg-slate-800/50 text-slate-600 border-transparent";
                } else {
                   btnStyle = "bg-slate-800 hover:bg-slate-700 border-slate-600 text-white hover:border-neon-blue hover:shadow-[0_0_10px_#00f3ff40]";
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleAnswer(opt)}
                    className={`p-4 rounded-xl border-2 text-xl font-bold transition-all duration-300 ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="animate-fade-in-up">
                <div className="bg-slate-900/80 border border-slate-700 p-4 rounded-lg mb-6 text-left">
                  <p className="text-slate-400 text-sm mb-1">Explanation:</p>
                  <p className="text-slate-200">{questions[currentIndex].explanation}</p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="px-8 py-3 bg-neon-blue text-slate-900 font-bold rounded-full hover:bg-cyan-300 transition-colors"
                >
                  {currentIndex < questions.length - 1 ? "Next Question" : "Finish Game"}
                </button>
              </div>
            )}
          </div>
        )}

        {gameState === 'end' && (
          <div className="z-10 animate-fade-in space-y-6">
            <h2 className="text-4xl font-display text-white">Game Over!</h2>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink">
              {score} pts
            </div>
            <p className="text-slate-400">
              {score === questions.length * 10 ? "Perfect Score! You're a math wizard!" : "Great effort! Keep practicing."}
            </p>
            <button
              onClick={() => setGameState('start')}
              className="px-8 py-3 border border-slate-600 hover:border-neon-blue text-white rounded-full transition-all"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <Guideline
        title="Math Game"
        steps={[
          "Choose your difficulty level (Easy, Medium, Hard).",
          "Press 'Start Game' to let our AI generate unique questions for you.",
          "Select the correct answer from the multiple-choice options.",
          "Read the explanation to learn from your mistakes.",
          "Aim for a high score!"
        ]}
        tips="The questions are generated in real-time by AI, so they are different every time you play!"
      />
    </div>
  );
};

export default MathGame;