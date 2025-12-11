import React, { useState, useEffect } from 'react';
import Guideline from './Guideline';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isRadians, setIsRadians] = useState(true);

  const handleNumber = (num: string) => {
    if (display === '0' || display === 'Error') {
      if (num === '.') {
        setDisplay('0.');
      } else {
        setDisplay(num);
      }
    } else {
      if (num === '.' && display.includes('.')) return;
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleBackspace = () => {
    if (display === 'Error' || display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleScientific = (func: string) => {
    try {
      const val = parseFloat(display);
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
      setDisplay(res.toString());
      setExpression(`${func}(${val}) =`);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const calculate = () => {
    try {
      const fullExpr = expression + display;
      // Note: In a production app, use a safer math parser.
      // For this demo, we sanitize and use Function constructor.
      if (!/^[0-9+\-*/().\s]+$/.test(fullExpr)) {
         throw new Error("Invalid Input");
      }
      
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${fullExpr}`)();
      
      // Fix floating point precision
      const final = Math.round(result * 100000000) / 100000000;
      
      setDisplay(final.toString());
      setExpression('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        handleNumber(key);
      } else if (key === '.') {
        e.preventDefault();
        handleNumber('.');
      } else if (key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (key === '*' || key.toLowerCase() === 'x') {
        e.preventDefault();
        handleOperator('*');
      } else if (key === '/') {
        e.preventDefault();
        handleOperator('/');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
      } else if (key === 'Escape') {
        e.preventDefault();
        handleClear();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const buttons = [
    { label: 'C', type: 'func', action: handleClear, wide: false },
    { label: '±', type: 'func', action: () => setDisplay((parseFloat(display) * -1).toString()) },
    { label: '%', type: 'func', action: () => setDisplay((parseFloat(display) / 100).toString()) },
    { label: '÷', type: 'op', action: () => handleOperator('/') },
    
    { label: 'sin', type: 'sci', action: () => handleScientific('sin') },
    { label: 'cos', type: 'sci', action: () => handleScientific('cos') },
    { label: 'tan', type: 'sci', action: () => handleScientific('tan') },
    { label: 'deg/rad', type: 'sci', action: () => setIsRadians(!isRadians) },

    { label: '7', type: 'num', action: () => handleNumber('7') },
    { label: '8', type: 'num', action: () => handleNumber('8') },
    { label: '9', type: 'num', action: () => handleNumber('9') },
    { label: '×', type: 'op', action: () => handleOperator('*') },

    { label: 'x²', type: 'sci', action: () => handleScientific('pow2') },
    { label: '√', type: 'sci', action: () => handleScientific('sqrt') },
    { label: 'log', type: 'sci', action: () => handleScientific('log') },
    { label: 'ln', type: 'sci', action: () => handleScientific('ln') },

    { label: '4', type: 'num', action: () => handleNumber('4') },
    { label: '5', type: 'num', action: () => handleNumber('5') },
    { label: '6', type: 'num', action: () => handleNumber('6') },
    { label: '-', type: 'op', action: () => handleOperator('-') },

    { label: '1', type: 'num', action: () => handleNumber('1') },
    { label: '2', type: 'num', action: () => handleNumber('2') },
    { label: '3', type: 'num', action: () => handleNumber('3') },
    { label: '+', type: 'op', action: () => handleOperator('+') },

    { label: '0', type: 'num', action: () => handleNumber('0'), wide: true },
    { label: '.', type: 'num', action: () => handleNumber('.') },
    { label: '=', type: 'eq', action: calculate },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-2xl shadow-2xl shadow-cyan-900/20">
        <div className="mb-6 bg-slate-900/80 p-6 rounded-xl border border-slate-700 text-right font-display shadow-inner">
          <div className="h-6 text-sm text-slate-400 mb-1">{expression}</div>
          <div className="text-4xl md:text-5xl text-neon-blue tracking-wider truncate">{display}</div>
          <div className="mt-2 text-xs text-slate-600 font-mono text-left uppercase">{isRadians ? 'RAD' : 'DEG'}</div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.action}
              className={`
                relative overflow-hidden rounded-xl p-4 text-lg md:text-xl font-medium transition-all duration-200
                active:scale-95 hover:brightness-125
                ${btn.wide ? 'col-span-2' : ''}
                ${btn.type === 'num' ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : ''}
                ${btn.type === 'op' ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-500/30' : ''}
                ${btn.type === 'func' ? 'bg-slate-700 text-slate-300' : ''}
                ${btn.type === 'sci' ? 'bg-slate-800/50 text-neon-pink border border-neon-pink/20 text-sm md:text-base' : ''}
                ${btn.type === 'eq' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue shadow-neon-blue' : ''}
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <Guideline
        title="Scientific Calculator"
        steps={[
          "Use the number pad to enter values.",
          "Select operations (+, -, ×, ÷) to perform basic arithmetic.",
          "Use scientific functions (sin, cos, log, etc.) for advanced calculations.",
          "Toggle between Degrees (DEG) and Radians (RAD) using the 'deg/rad' button.",
          "Press '=' to see the result.",
          "Use 'C' to clear the current entry or reset the calculator.",
        ]}
        tips="Keyboard support enabled: Use numbers, +, -, *, /, Enter (=), Esc (Clear), and Backspace."
      />
    </div>
  );
};

export default Calculator;