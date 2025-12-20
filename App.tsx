import React, { useState } from 'react';
import Home from './components/Home';
import Calculator from './components/Calculator';
import Converter from './components/Converter';
import MathGame from './components/MathGame';
import Blog from './components/Blog';
import { PrivacyPolicy, TermsOfService, AboutUs } from './components/Legal';
import AdSpace from './components/AdSpace';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Home onNavigate={setCurrentView} />;
      case AppView.CALCULATOR:
        return <Calculator />;
      case AppView.CONVERTER:
        return <Converter />;
      case AppView.GAME:
        return <MathGame />;
      case AppView.BLOG:
        return <Blog />;
      case AppView.PRIVACY:
        return <PrivacyPolicy />;
      case AppView.TERMS:
        return <TermsOfService />;
      case AppView.ABOUT:
        return <AboutUs />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  const mainNav = [
    { id: AppView.HOME, label: 'Home', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    )},
    { id: AppView.CALCULATOR, label: 'Calculator', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="16" y2="18"/></svg>
    )},
    { id: AppView.CONVERTER, label: 'Converter', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M21 16v5h-5"/><path d="M3 16v5h5"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    )},
    { id: AppView.GAME, label: 'Math Game', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    )},
    { id: AppView.BLOG, label: 'Knowledge Base', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
    )},
  ];

  const footerNav = [
    { id: AppView.ABOUT, label: 'About Us' },
    { id: AppView.PRIVACY, label: 'Privacy Policy' },
    { id: AppView.TERMS, label: 'Terms of Service' },
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
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="mb-10 hidden md:block">
            <h1 className="font-display text-2xl font-bold tracking-tighter">
              <span className="text-neon-blue">NEON</span>
              <span className="text-slate-100">CALC</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Tools & Learning</p>
          </div>

          <nav className="space-y-1 mt-16 md:mt-0">
            {mainNav.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${currentView === item.id 
                    ? 'bg-neon-blue/10 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.05)] border border-neon-blue/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                `}
              >
                <div className={`transition-transform duration-300 ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Sidebar Nav (AdSense compliance) */}
        <div className="mt-auto p-6 space-y-4 border-t border-slate-800/50">
          <div className="space-y-1">
            {footerNav.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                  currentView === item.id ? 'text-neon-pink' : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <AdSpace className="w-full h-32 bg-slate-950/30" label="Sidebar Promo" />
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
        <div className="max-w-5xl mx-auto">
          
          {/* Main Top Ad Banner */}
          <div className="mb-10">
            <AdSpace className="w-full h-24 hidden md:flex" label="Premium Ad Placement" />
          </div>

          {/* View Header (Only for tools) */}
          {(currentView === AppView.CALCULATOR || currentView === AppView.CONVERTER || currentView === AppView.GAME) && (
            <div className="mb-8 animate-fade-in-down">
              <h2 className="text-3xl font-display text-white font-bold">{
                mainNav.find(n => n.id === currentView)?.label
              }</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-transparent mt-2"></div>
            </div>
          )}

          {/* Content Component */}
          <div className="animate-fade-in-up">
            {renderContent()}
          </div>

          {/* Page Footer */}
          <footer className="mt-20 pt-10 border-t border-slate-800 text-center text-slate-600 text-sm">
            <p className="mb-4">© 2023 NeonCalc & Play. All rights reserved.</p>
            <div className="flex justify-center gap-6">
              <button onClick={() => setCurrentView(AppView.PRIVACY)} className="hover:text-slate-400">Privacy</button>
              <button onClick={() => setCurrentView(AppView.TERMS)} className="hover:text-slate-400">Terms</button>
              <button onClick={() => setCurrentView(AppView.ABOUT)} className="hover:text-slate-400">About</button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;