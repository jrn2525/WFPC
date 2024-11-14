import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface BlueprintPriceEditorProps {
  pagePrice: number;
  bindingPrice: number;
  onSave: (pagePrice: number, bindingPrice: number) => void;
  onClose: () => void;
}

export function BlueprintPriceEditor({ 
  pagePrice, 
  bindingPrice, 
  onSave, 
  onClose 
}: BlueprintPriceEditorProps) {
  const [formData, setFormData] = useState({
    pagePrice: pagePrice.toString(),
    bindingPrice: bindingPrice.toString()
  });

  const handleChange = (field: 'pagePrice' | 'bindingPrice') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    const newPagePrice = parseFloat(formData.pagePrice) || 0;
    const newBindingPrice = parseFloat(formData.bindingPrice) || 0;
    onSave(newPagePrice, newBindingPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary-dark">Manage Blueprint Prices</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price per Page ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <input
                type="number"
                value={formData.pagePrice}
                onChange={handleChange('pagePrice')}
                min="0"
                step="0.01"
                className="w-full pl-7 pr-3 py-2 border rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price per Binding ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <input
                type="number"
                value={formData.bindingPrice}
                onChange={handleChange('bindingPrice')}
                min="0"
                step="0.01"
                className="w-full pl-7 pr-3 py-2 border rounded-lg 
                         focus:ring-1 focus:ring-primary focus:border-primary
                         bg-[#E6E7EB]"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}