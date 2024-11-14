import React from 'react';
import type { Dimensions } from '../types';

interface DimensionsInputProps {
  dimensions: Dimensions;
  onChange: (dimensions: Dimensions) => void;
  disabled?: boolean;
}

export function DimensionsInput({ dimensions, onChange, disabled = false }: DimensionsInputProps) {
  const handleChange = (field: keyof Dimensions) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onChange({ ...dimensions, [field]: value });
  };

  const feetToInches = (feet: number) => {
    return Math.round(feet * 12);
  };

  const handleFeetChange = (field: keyof Dimensions) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const feet = parseFloat(e.target.value) || 0;
    const inches = feetToInches(feet);
    onChange({ ...dimensions, [field]: inches });
  };

  const inchesToFeet = (inches: number) => {
    return (inches / 12).toFixed(2);
  };

  return (
    <div className={`space-y-4 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <h3 className="text-sm font-medium text-gray-700">Dimensions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Width</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                value={dimensions.width || ''}
                onChange={handleChange('width')}
                placeholder="Inches"
                disabled={disabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
              <span className="text-xs text-gray-500 mt-1">inches</span>
            </div>
            <div>
              <input
                type="number"
                value={dimensions.width ? inchesToFeet(dimensions.width) : ''}
                onChange={handleFeetChange('width')}
                placeholder="Feet"
                disabled={disabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
              <span className="text-xs text-gray-500 mt-1">feet</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Height</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                value={dimensions.height || ''}
                onChange={handleChange('height')}
                placeholder="Inches"
                disabled={disabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
              <span className="text-xs text-gray-500 mt-1">inches</span>
            </div>
            <div>
              <input
                type="number"
                value={dimensions.height ? inchesToFeet(dimensions.height) : ''}
                onChange={handleFeetChange('height')}
                placeholder="Feet"
                disabled={disabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
              <span className="text-xs text-gray-500 mt-1">feet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}