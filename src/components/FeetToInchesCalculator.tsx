import React, { useState } from 'react';

interface FeetToInchesCalculatorProps {
  onConvert: (inches: { width: number; height: number }) => void;
}

export function FeetToInchesCalculator({ onConvert }: FeetToInchesCalculatorProps) {
  const [feet, setFeet] = useState({ width: '', height: '' });

  const handleChange = (field: 'width' | 'height') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFeet(prev => ({ ...prev, [field]: value }));
  };

  const handleConvert = () => {
    const widthInches = parseFloat(feet.width) * 12;
    const heightInches = parseFloat(feet.height) * 12;
    
    if (!isNaN(widthInches) && !isNaN(heightInches)) {
      onConvert({ width: widthInches, height: heightInches });
      setFeet({ width: '', height: '' }); // Reset after conversion
    }
  };

  return (
    <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
      <div className="text-sm font-medium text-indigo-700">Feet to Inches Calculator</div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-indigo-600 mb-1">Width (ft)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={feet.width}
            onChange={handleChange('width')}
            placeholder="Enter feet"
            className="w-full p-2 rounded border-2 border-indigo-100 focus:border-indigo-500 
                     focus:ring-indigo-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-indigo-600 mb-1">Height (ft)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={feet.height}
            onChange={handleChange('height')}
            placeholder="Enter feet"
            className="w-full p-2 rounded border-2 border-indigo-100 focus:border-indigo-500 
                     focus:ring-indigo-500 text-sm"
          />
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 
                 transition-colors text-sm font-medium"
      >
        Convert to Inches
      </button>
    </div>
  );
}