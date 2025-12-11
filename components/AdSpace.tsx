import React from 'react';

interface AdSpaceProps {
  className?: string;
  label?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ className, label = "Advertisement" }) => {
  return (
    <div className={`flex flex-col items-center justify-center border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-4 ${className}`}>
      <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Sponsored</span>
      <div className="text-slate-600 font-display text-sm text-center">
        {label}<br/>
        <span className="text-xs opacity-50">Space Available</span>
      </div>
    </div>
  );
};

export default AdSpace;