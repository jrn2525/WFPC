import React from 'react';
import type { PrintOptions } from '../types';

interface OptionsSelectorProps {
  options: PrintOptions;
  onChange: (options: PrintOptions) => void;
  disabled?: boolean;
}

export function OptionsSelector({ options, onChange, disabled = false }: OptionsSelectorProps) {
  const handleChange = (field: keyof PrintOptions) => (value: any) => {
    if (field === 'grommets' && !value) {
      onChange({ ...options, grommets: false, grommetQuantity: 0 });
    } else {
      onChange({ ...options, [field]: value });
    }
  };

  return (
    <div className={`space-y-4 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="mounting"
            checked={options.mounting}
            onChange={(e) => handleChange('mounting')(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            disabled={disabled}
          />
          <label htmlFor="mounting" className="ml-2 block text-sm text-gray-700">
            Add Mounting (+$3.00/sq ft)
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rush"
            checked={options.rush}
            onChange={(e) => handleChange('rush')(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            disabled={disabled}
          />
          <label htmlFor="rush" className="ml-2 block text-sm text-gray-700">
            Rush Order (+25%)
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="grommets"
              checked={options.grommets}
              onChange={(e) => handleChange('grommets')(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              disabled={disabled}
            />
            <label htmlFor="grommets" className="ml-2 block text-sm text-gray-700">
              Add Grommets ($1.00 each)
            </label>
          </div>
          
          {options.grommets && (
            <div className="ml-6">
              <label htmlFor="grommetQuantity" className="block text-sm text-gray-600 mb-1">
                Quantity:
              </label>
              <input
                type="number"
                id="grommetQuantity"
                min="1"
                value={options.grommetQuantity}
                onChange={(e) => handleChange('grommetQuantity')(parseInt(e.target.value) || 0)}
                className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:ring-1 
                         focus:ring-primary focus:border-primary"
                disabled={disabled}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}