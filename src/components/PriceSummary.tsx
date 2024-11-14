import React, { useMemo, useState, useRef } from 'react';
import { QuoteView } from './QuoteView';
import type { Dimensions, Material, PrintOptions, MaterialType, ContactInfo, BlueprintOptions } from '../types';

interface PriceSummaryProps {
  dimensions: Dimensions;
  material: Material;
  materials: MaterialType[];
  options: PrintOptions;
  blueprintOptions: BlueprintOptions;
  calculatePrice: () => number;
  contactInfo: ContactInfo;
}

export function PriceSummary({ 
  dimensions, 
  material, 
  materials, 
  options,
  blueprintOptions,
  calculatePrice,
  contactInfo
}: PriceSummaryProps) {
  const [showQuote, setShowQuote] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);

  const { subtotal, fees, total, blueprintTotal } = useMemo(() => {
    const basePrice = calculatePrice();
    const additionalFees = basePrice * (options.rush ? 0.25 : 0);
    const blueprintPages = blueprintOptions.enabled ? 
      blueprintOptions.pagesPerSet * blueprintOptions.numberOfSets * blueprintOptions.pagePrice : 0;
    const bindingsCost = blueprintOptions.enabled ? 
      blueprintOptions.numberOfSets * blueprintOptions.bindingPrice : 0;
    
    return {
      subtotal: basePrice,
      fees: additionalFees,
      total: basePrice + additionalFees,
      blueprintTotal: blueprintPages + bindingsCost
    };
  }, [calculatePrice, options, blueprintOptions]);

  const area = dimensions.width * dimensions.height / 144;
  const selectedMaterial = materials.find(m => m.id === material);

  const isFormValid = (dimensions.width > 0 && dimensions.height > 0) || 
                     (blueprintOptions.enabled && blueprintOptions.pagesPerSet > 0 && blueprintOptions.numberOfSets > 0);

  const generateQuoteNumber = () => {
    const date = new Date();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `Q${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${random}`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-primary-dark">Customer Details</h3>
        <div className="bg-gray-custom p-4 rounded-lg space-y-2 border-l-4 border-accent">
          <div className="flex justify-between text-sm">
            <span className="text-primary-dark">Name:</span>
            <span>{contactInfo.name || '—'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-primary-dark">Phone:</span>
            <span>{contactInfo.phone || '—'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-primary-dark">Email:</span>
            <span>{contactInfo.email || '—'}</span>
          </div>
        </div>
      </div>

      {area > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-primary-dark">Print Details</h3>
          <div className="bg-gray-custom p-4 rounded-lg space-y-2 border-l-4 border-accent">
            <div className="flex justify-between text-sm">
              <span className="text-primary-dark">Dimensions:</span>
              <span>{dimensions.width}″ × {dimensions.height}″</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-primary-dark">Total Area:</span>
              <span>{area.toFixed(2)} sq ft</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-primary-dark">Material:</span>
              <span>{selectedMaterial?.name}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="font-medium text-primary-dark">Price Breakdown</h3>
        <div className="bg-gray-custom p-4 rounded-lg space-y-3 border-l-4 border-accent">
          {subtotal > 0 && (
            <div className="flex justify-between">
              <span className="text-primary-dark font-medium">Print Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          )}
          {blueprintOptions.enabled && blueprintTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-primary-dark font-medium">Blueprint Total:</span>
              <span>${blueprintTotal.toFixed(2)}</span>
            </div>
          )}
          {options.rush && (
            <div className="flex justify-between text-sm">
              <span className="text-primary-dark">Rush Order (25%):</span>
              <span>+${fees.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-primary/20 pt-2 flex justify-between font-medium">
            <span className="text-primary">Total:</span>
            <span className="text-2xl text-primary">${(total + blueprintTotal).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        disabled={!isFormValid}
        onClick={() => setShowQuote(true)}
        className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2
                   transition-colors ${
                     isFormValid 
                     ? 'bg-primary text-white hover:bg-primary-dark' 
                     : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                   }`}
      >
        Generate Quote
      </button>
      {!isFormValid && (
        <p className="text-sm text-red-500 text-center">
          Please enter dimensions or blueprint details to generate a quote
        </p>
      )}

      {showQuote && (
        <QuoteView
          ref={quoteRef}
          contactInfo={contactInfo}
          dimensions={dimensions}
          material={material}
          materials={materials}
          options={options}
          blueprintOptions={blueprintOptions}
          total={total + blueprintTotal}
          quoteNumber={generateQuoteNumber()}
          onClose={() => setShowQuote(false)}
        />
      )}
    </div>
  );
}