import React from 'react';
import { AppView } from '../types';

interface HomeProps {
  onNavigate: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 glass-panel rounded-3xl border-neon-blue/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
          Online <span className="text-neon-blue">Calculator</span> & Free Math Tools
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Welcome to NeonCalc, your premier destination for a <strong>free online calculator</strong>. 
          Whether you need a scientific calculator for complex physics problems, a unit converter for engineering, 
          or interactive math games to sharpen your logic, we provide a complete professional suite 100% free.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => onNavigate(AppView.CALCULATOR)}
            className="px-8 py-4 bg-neon-blue text-slate-900 font-bold rounded-full shadow-neon-blue hover:scale-105 transition-transform"
          >
            Start Online Calculator
          </button>
          <button 
            onClick={() => onNavigate(AppView.GAME)}
            className="px-8 py-4 border border-neon-pink text-neon-pink font-bold rounded-full hover:bg-neon-pink/10 transition-colors"
          >
            Play Free Math Game
          </button>
        </div>
      </section>

      {/* Feature Articles / Publisher Content */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl border-slate-800">
          <h2 className="text-2xl font-display text-white mb-4">Free Scientific Calculator Online</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Our <strong>scientific calculator</strong> is built for accuracy and speed. Unlike a basic desk calculator, 
            this tool supports full algebraic expressions, trigonometry, and logarithms. It is the perfect 
            <em>online calculator</em> for students and professionals who require precision without downloading software.
          </p>
          <p className="text-slate-400 leading-relaxed">
            By utilizing advanced JavaScript math engines, NeonCalc ensures that every computation is processed with 
            floating-point reliability, making it a trusted resource for academic research and professional engineering.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border-slate-800">
          <h2 className="text-2xl font-display text-white mb-4">Universal Unit Converter Tool</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Easily convert between different measurement systems with our integrated converter. We support 
            Length, Weight, and Digital Data categories. As a <strong>free calculator utility</strong>, 
            we strive to offer the most intuitive interface for quick conversions in global environments.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Our data is updated regularly to ensure conversion factors for metric and imperial systems are 
            perfectly synchronized with international standards (ISO/NIST).
          </p>
        </div>
      </section>

      {/* SEO Keyword Directory (Good for AdSense crawler and users) */}
      <section className="glass-panel p-8 rounded-2xl border-slate-800/50 text-center">
        <h3 className="text-sm font-display text-slate-500 uppercase tracking-widest mb-6">Quick Links & Resources</h3>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-400 text-sm">
          <span className="hover:text-neon-blue cursor-pointer transition-colors" onClick={() => onNavigate(AppView.CALCULATOR)}>Online Calculator</span>
          <span className="hover:text-neon-blue cursor-pointer transition-colors" onClick={() => onNavigate(AppView.CALCULATOR)}>Scientific Calculator</span>
          <span className="hover:text-neon-blue cursor-pointer transition-colors" onClick={() => onNavigate(AppView.CALCULATOR)}>Free Calculator</span>
          <span className="hover:text-neon-pink cursor-pointer transition-colors" onClick={() => onNavigate(AppView.GAME)}>Math Games</span>
          <span className="hover:text-neon-pink cursor-pointer transition-colors" onClick={() => onNavigate(AppView.GAME)}>Online Math Quiz</span>
          <span className="hover:text-neon-green cursor-pointer transition-colors" onClick={() => onNavigate(AppView.CONVERTER)}>Unit Converter</span>
          <span className="hover:text-neon-green cursor-pointer transition-colors" onClick={() => onNavigate(AppView.BLOG)}>Math Knowledge Base</span>
        </div>
      </section>

      {/* Educational Section */}
      <section className="glass-panel p-10 rounded-2xl border-neon-purple/20">
        <h2 className="text-3xl font-display text-neon-purple mb-6 text-center">Educational Mathematics Resource</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            At NeonCalc, we aim to bridge the gap between simple tools and deep learning. Our <strong>math games</strong> 
            and knowledge articles are designed to provide a comprehensive educational environment. Whether you are 
            looking for a <em>calculator online</em> to solve a quick problem or looking to understand the fundamentals 
            of trigonometry, we have the resources you need.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4">
              <div className="text-neon-blue text-4xl font-black mb-2">FREE</div>
              <div className="text-slate-500 uppercase text-xs tracking-tighter">Tools Access</div>
            </div>
            <div className="text-center p-4">
              <div className="text-neon-pink text-4xl font-black mb-2">ONLINE</div>
              <div className="text-slate-500 uppercase text-xs tracking-tighter">24/7 Availability</div>
            </div>
            <div className="text-center p-4">
              <div className="text-neon-green text-4xl font-black mb-2">SECURE</div>
              <div className="text-slate-500 uppercase text-xs tracking-tighter">Private Computing</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;