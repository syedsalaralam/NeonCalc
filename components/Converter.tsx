import React, { useState, useMemo } from 'react';
import Guideline from './Guideline';
import { ConverterCategory } from '../types';

const categories: ConverterCategory[] = [
  {
    name: "Length",
    units: ["Meters", "Kilometers", "Centimeters", "Millimeters", "Inches", "Feet", "Yards", "Miles"],
    rates: {
      "Meters": 1,
      "Kilometers": 0.001,
      "Centimeters": 100,
      "Millimeters": 1000,
      "Inches": 39.3701,
      "Feet": 3.28084,
      "Yards": 1.09361,
      "Miles": 0.000621371
    }
  },
  {
    name: "Weight",
    units: ["Kilograms", "Grams", "Milligrams", "Pounds", "Ounces"],
    rates: {
      "Kilograms": 1,
      "Grams": 1000,
      "Milligrams": 1000000,
      "Pounds": 2.20462,
      "Ounces": 35.274
    }
  },
  {
    name: "Data",
    units: ["Bytes", "Kilobytes", "Megabytes", "Gigabytes", "Terabytes"],
    rates: {
      "Bytes": 1099511627776,
      "Kilobytes": 1073741824,
      "Megabytes": 1048576,
      "Gigabytes": 1024,
      "Terabytes": 1
    }
  }
];

const Converter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ConverterCategory>(categories[0]);
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>(categories[0].units[0]);
  const [toUnit, setToUnit] = useState<string>(categories[0].units[1]);

  // Handle category change
  const handleCategoryChange = (catName: string) => {
    const cat = categories.find(c => c.name === catName) || categories[0];
    setActiveCategory(cat);
    setFromUnit(cat.units[0]);
    setToUnit(cat.units[1]);
    setAmount('1');
  };

  // Calculation Logic
  const result = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val)) return '---';

    // Convert to base, then to target
    // Base unit value = value / rate[from]
    // Target value = base_unit_value * rate[to]
    
    // Actually, simpler logic:
    // val in base = val / rates[from]
    // result = val in base * rates[to]
    
    // Wait, my rates definition above is "How many Units per Base".
    // e.g. 100 cm per 1 meter.
    // So 1 meter = 100 cm.
    // To go Meter -> cm: 1 * 100.
    // To go cm -> Meter: 100 / 100.
    
    // Formula: (amount / rates[from]) * rates[to]  <-- This is wrong if rate is "units per base"
    
    // Let's re-verify: 
    // Base: Meter (rate 1).
    // From: KM (rate 0.001). 1 Meter = 0.001 KM.
    // Input: 1 KM. 
    // To Base: 1 / 0.001 = 1000 Meters. Correct.
    // To Target: CM (rate 100). 1 Meter = 100 CM.
    // Result: 1000 Meters * 100 = 100,000 CM.
    
    // Formula: (amount / rates[from]) * rates[to]
    
    const baseAmount = val / activeCategory.rates[fromUnit];
    const finalAmount = baseAmount * activeCategory.rates[toUnit];
    
    // Format nice string
    if (finalAmount < 0.000001 || finalAmount > 1000000) {
      return finalAmount.toExponential(4);
    }
    return parseFloat(finalAmount.toFixed(6)).toString();
  }, [amount, fromUnit, toUnit, activeCategory]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => handleCategoryChange(cat.name)}
            className={`
              px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all
              ${activeCategory.name === cat.name 
                ? 'bg-neon-blue text-slate-900 shadow-neon-blue' 
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-2xl relative">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          
          {/* From Section */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold">From</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-neon-blue text-2xl p-4 rounded-xl focus:outline-none focus:border-neon-blue focus:shadow-neon-blue transition-all font-display placeholder-slate-700"
              placeholder="0"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-slate-800 border-none text-slate-300 p-3 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
            >
              {activeCategory.units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          {/* Icon */}
          <div className="flex justify-center">
             <div className="p-3 bg-slate-800 rounded-full text-neon-pink">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16"/><path d="m16 6 4 6-4 6"/></svg>
             </div>
          </div>

          {/* To Section */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold">To</label>
            <div className="w-full bg-slate-900/50 border border-dashed border-slate-700 text-slate-200 text-2xl p-4 rounded-xl font-display overflow-hidden text-ellipsis">
              {result}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-slate-800 border-none text-slate-300 p-3 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
            >
              {activeCategory.units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

        </div>
      </div>

      <Guideline
        title="Unit Converter"
        steps={[
          "Select a category (Length, Weight, Data) from the top tabs.",
          "Enter the value you want to convert in the left input box.",
          "Choose the 'From' unit and the 'To' unit using the dropdown menus.",
          "The result will automatically appear in the right box."
        ]}
        tips="Use this tool for quick homework checks or cooking conversions!"
      />
    </div>
  );
};

export default Converter;