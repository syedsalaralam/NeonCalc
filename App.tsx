import React, { useState } from 'react';
import Calculator from './components/Calculator';
import Converter from './components/Converter';
import MathGame from './components/MathGame';
import AdSpace from './components/AdSpace';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CALCULATOR);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case AppView.CALCULATOR:
        return <Calculator />;
      case AppView.CONVERTER:
        return <Converter />;
      case AppView.GAME:
        return <MathGame />;
      default:
        return <Calculator />;
    }
  };

  const navItems = [
    { id: AppView.CALCULATOR, label: 'Calculator', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/></svg>
    )},
    { id: AppView.CONVERTER, label: 'Converter', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.9 8.41a2 2 0 0 0-.66 2.47l7 12.23 6.06-4.07a2 2 0 0 0 .66-2.47l-7-12.23"/><path d="m14.25 17.5 3.53-7.55"/><path d="m8.5 21.28 3.53-7.55"/></svg>
    )},
    { id: AppView.GAME, label: 'Math Game', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    )},
  ];

  return (
    <div className="min-h-screen flex bg-dark-bg text-slate-200 font-sans selection:bg-neon-pink selection:text-white">
      
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-4 md:hidden">
        <h1 className="font-display text-xl text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple font-bold">
          NeonCalc
        </h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="mb-10 hidden md:block">
            <h1 className="font-display text-2xl font-bold tracking-tighter">
              <span className="text-neon-blue">NEON</span>
              <span className="text-slate-100">CALC</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Tools & Games</p>
          </div>

          <nav className="flex-1 space-y-2 mt-16 md:mt-0">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${currentView === item.id 
                    ? 'bg-neon-blue/10 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.1)] border border-neon-blue/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                `}
              >
                <div className={`transition-transform duration-300 ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
                {currentView === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_8px_#00f3ff]"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Ad Space in Sidebar */}
          <div className="mt-auto pt-6">
             <AdSpace className="w-full h-40 bg-slate-950/50" label="Sidebar Ad" />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto pt-20 pb-10 px-4 md:pt-10 md:px-10">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Top Ad Banner */}
          <AdSpace className="w-full h-24 hidden md:flex" label="Top Banner Ad" />

          {/* View Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-down">
            <div>
              <h2 className="text-3xl font-display text-white font-bold">{
                navItems.find(n => n.id === currentView)?.label
              }</h2>
              <p className="text-slate-400 text-sm mt-1">
                {currentView === AppView.CALCULATOR && "Advanced scientific calculations made simple."}
                {currentView === AppView.CONVERTER && "Convert between units instantly."}
                {currentView === AppView.GAME && "Challenge yourself with AI math problems."}
              </p>
            </div>
          </div>

          {/* Content Component */}
          <div className="animate-fade-in-up">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;