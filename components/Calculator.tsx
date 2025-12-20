import React, { useState, useEffect } from 'react';
import Guideline from './Guideline';

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState<string | null>(null);
  const [isRadians, setIsRadians] = useState(true);

  const handleInput = (char: string) => {
    setResult(null);
    if (expression === '0' || expression === 'Error') {
      if (char === '.') setExpression('0.');
      else if (['+', '*', '/', ')'].includes(char)) return; // Prevent leading ops
      else setExpression(char);
    } else {
      // Prevent double operators
      const lastChar = expression.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(char)) {
        setExpression(expression.slice(0, -1) + char);
      } else {
        setExpression(expression + char);
      }
    }
  };

  const handleClear = () => {
    setExpression('0');
    setResult(null);
  };

  const handleDelete = () => {
    setResult(null);
    if (expression.length <= 1 || expression === 'Error') {
      setExpression('0');
    } else {
      setExpression(expression.slice(0, -1));
    }
  };

  const handleScientific = (func: string) => {
    try {
      // Evaluate current expression first
      const val = calculateInternal(expression);
      let res = 0;
      switch (func) {
        case 'sin':
          res = isRadians ? Math.sin(val) : Math.sin(val * Math.PI / 180);
          break;
        case 'cos':
          res = isRadians ? Math.cos(val) : Math.cos(val * Math.PI / 180);
          break;
        case 'tan':
          res = isRadians ? Math.tan(val) : Math.tan(val * Math.PI / 180);
          break;
        case 'sqrt':
          res = Math.sqrt(val);
          break;
        case 'log':
          res = Math.log10(val);
          break;
        case 'ln':
          res = Math.log(val);
          break;
        case 'pow2':
          res = Math.pow(val, 2);
          break;
        default:
          break;
      }
      const final = Math.round(res * 100000000) / 100000000;
      setExpression(final.toString());
      setResult(null);
    } catch (e) {
      setExpression('Error');
    }
  };

  const calculateInternal = (expr: string): number => {
    const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/');
    if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) {
      throw new Error("Invalid Input");
    }
    // eslint-disable-next-line no-new-func
    return new Function(`return ${sanitized}`)();
  };

  const performCalculation = () => {
    try {
      const finalResult = calculateInternal(expression);
      const rounded = Math.round(finalResult * 100000000) / 100000000;
      setResult(rounded.toString());
    } catch (e) {
      setExpression('Error');
      setResult(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9+\-*/().]$/.test(e.key)) {
        e.preventDefault();
        handleInput(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        performCalculation();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  const buttons = [
    { label: 'C', type: 'func', action: handleClear },
    { label: '(', type: 'func', action: () => handleInput('(') },
    { label: ')', type: 'func', action: () => handleInput(')') },
    { label: '÷', type: 'op', action: () => handleInput('/') },
    
    { label: 'sin', type: 'sci', action: () => handleScientific('sin') },
    { label: 'cos', type: 'sci', action: () => handleScientific('cos') },
    { label: 'tan', type: 'sci', action: () => handleScientific('tan') },
    { label: 'rad', type: 'sci', action: () => setIsRadians(!isRadians), active: isRadians },

    { label: '7', type: 'num', action: () => handleInput('7') },
    { label: '8', type: 'num', action: () => handleInput('8') },
    { label: '9', type: 'num', action: () => handleInput('9') },
    { label: '×', type: 'op', action: () => handleInput('*') },

    { label: '4', type: 'num', action: () => handleInput('4') },
    { label: '5', type: 'num', action: () => handleInput('5') },
    { label: '6', type: 'num', action: () => handleInput('6') },
    { label: '-', type: 'op', action: () => handleInput('-') },

    { label: '1', type: 'num', action: () => handleInput('1') },
    { label: '2', type: 'num', action: () => handleInput('2') },
    { label: '3', type: 'num', action: () => handleInput('3') },
    { label: '+', type: 'op', action: () => handleInput('+') },

    { label: '0', type: 'num', action: () => handleInput('0') },
    { label: '.', type: 'num', action: () => handleInput('.') },
    { label: 'DEL', type: 'del', action: handleDelete },
    { label: '=', type: 'eq', action: performCalculation },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-2xl shadow-2xl border-slate-800">
        <div className="mb-6 bg-slate-900/90 p-8 rounded-xl border border-slate-700 text-right font-display min-h-[140px] flex flex-col justify-end">
          <div className="text-slate-500 text-xs mb-2 flex justify-between uppercase tracking-widest font-bold">
            <span>{isRadians ? 'Radians' : 'Degrees'} Mode</span>
            <span>Expression</span>
          </div>
          <div className="text-2xl md:text-3xl text-slate-400 tracking-wider break-all mb-2 overflow-hidden h-8">
            {expression}
          </div>
          <div className="text-4xl md:text-6xl text-neon-blue font-black tracking-tighter truncate">
            {result ? result : ''}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.action}
              className={`
                relative overflow-hidden rounded-xl p-4 md:p-5 text-lg md:text-xl font-bold transition-all duration-200
                active:scale-95 shadow-lg
                ${btn.type === 'num' ? 'bg-slate-800 text-slate-100 hover:bg-slate-700 hover:shadow-slate-700/20' : ''}
                ${btn.type === 'op' ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-900/60' : ''}
                ${btn.type === 'func' ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700' : ''}
                ${btn.type === 'sci' ? `bg-slate-800/40 border text-xs md:text-sm ${btn.active ? 'border-neon-pink text-neon-pink shadow-neon-pink/20' : 'border-slate-700 text-slate-400'}` : ''}
                ${btn.type === 'del' ? 'bg-red-900/20 text-red-400 border border-red-500/30 hover:bg-red-900/40' : ''}
                ${btn.type === 'eq' ? 'bg-neon-blue text-slate-900 shadow-neon-blue hover:scale-105' : ''}
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <Guideline
        title="Professional Scientific Calculator & Online Calculator"
        steps={[
          "Chain calculations: Use this online calculator to enter complex expressions like (10 + 5) * 2 / 3.",
          "Mathematical Functions: Access sine, cosine, tangent, and logs for free scientific calculation.",
          "Correction Tool: The DEL button allows you to fix errors in your expression without restarting.",
          "Angular Modes: Toggle between Radians and Degrees for advanced trigonometry calculations.",
          "PEMDAS Compliant: This free calculator follows standard mathematical order of operations automatically."
        ]}
        tips="Bookmark this free scientific calculator for quick access during homework or professional engineering tasks. It's the most reliable calculator online."
      />
    </div>
  );
};

export default Calculator;