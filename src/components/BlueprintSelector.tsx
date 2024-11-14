import React, { useState } from 'react';
import type { BlueprintOptions } from '../types';
import { FileText, Settings } from 'lucide-react';
import { BlueprintPriceEditor } from './BlueprintPriceEditor';

interface BlueprintSelectorProps {
  options: BlueprintOptions;
  onChange: (options: BlueprintOptions) => void;
}

export function BlueprintSelector({ options, onChange }: BlueprintSelectorProps) {
  const [showPriceEditor, setShowPriceEditor] = useState(false);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, enabled: e.target.checked });
  };

  const handleChange = (field: keyof BlueprintOptions) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'pagePrice' || field === 'bindingPrice' 
      ? parseFloat(e.target.value) 
      : parseInt(e.target.value, 10);
    onChange({ ...options, [field]: value || 0 });
  };

  const handlePriceUpdate = (pagePrice: number, bindingPrice: number) => {
    onChange({ ...options, pagePrice, bindingPrice });
  };

  const totalPages = options.pagesPerSet * options.numberOfSets;
  const totalBindings = options.bindingsPerSet * options.numberOfSets;
  const pagesCost = totalPages * options.pagePrice;
  const bindingsCost = totalBindings * options.bindingPrice;
  const totalCost = pagesCost + bindingsCost;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-medium text-primary-dark">Blueprint Section</h3>
        </div>
        {options.enabled && (
          <button
            onClick={() => setShowPriceEditor(true)}
            className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <Settings className="w-4 h-4" />
            Manage Prices
          </button>
        )}
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="blueprint-enabled"
          checked={options.enabled}
          onChange={handleToggle}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="blueprint-enabled" className="ml-2 block text-sm text-gray-700">
          Blueprints
        </label>
      </div>

      {options.enabled && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Pages per Set
              </label>
              <input
                type="number"
                min="0"
                value={options.pagesPerSet || ''}
                onChange={handleChange('pagesPerSet')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Number of Sets
              </label>
              <input
                type="number"
                min="0"
                value={options.numberOfSets || ''}
                onChange={handleChange('numberOfSets')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Bindings per Set
              </label>
              <input
                type="number"
                min="0"
                value={options.bindingsPerSet || ''}
                onChange={handleChange('bindingsPerSet')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
            </div>
          </div>

          <div className="bg-gray-custom p-4 rounded-lg space-y-2 border-l-4 border-accent">
            <div className="flex justify-between text-sm">
              <span className="text-primary-dark font-medium">Total Pages:</span>
              <span>{totalPages} pages (${pagesCost.toFixed(2)})</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-primary-dark font-medium">Total Bindings:</span>
              <span>{totalBindings} bindings (${bindingsCost.toFixed(2)})</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-primary/20">
              <span className="text-primary">Blueprint Total:</span>
              <span className="text-primary text-lg">${totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {showPriceEditor && (
        <BlueprintPriceEditor
          pagePrice={options.pagePrice}
          bindingPrice={options.bindingPrice}
          onSave={handlePriceUpdate}
          onClose={() => setShowPriceEditor(false)}
        />
      )}
    </div>
  );
}