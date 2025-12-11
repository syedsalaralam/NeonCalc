import React from 'react';

interface GuidelineProps {
  title: string;
  steps: string[];
  tips?: string;
}

const Guideline: React.FC<GuidelineProps> = ({ title, steps, tips }) => {
  return (
    <div className="mt-8 p-6 glass-panel rounded-xl border border-neon-blue/20 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-neon-blue/50 group-hover:bg-neon-blue transition-colors duration-300"></div>
      <h3 className="text-xl font-display text-neon-blue mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        User Guidelines: {title}
      </h3>
      <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm md:text-base">
        {steps.map((step, index) => (
          <li key={index} className="leading-relaxed pl-2">{step}</li>
        ))}
      </ol>
      {tips && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 text-sm text-slate-400 italic">
          <span className="text-neon-pink font-semibold not-italic mr-2">Pro Tip:</span>
          {tips}
        </div>
      )}
    </div>
  );
};

export default Guideline;