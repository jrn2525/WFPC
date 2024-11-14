import React, { forwardRef, useEffect } from 'react';
import { Printer } from 'lucide-react';
import type { Dimensions, Material, PrintOptions, MaterialType, ContactInfo, BlueprintOptions } from '../types';

interface QuoteViewProps {
  contactInfo: ContactInfo;
  dimensions: Dimensions;
  material: Material;
  materials: MaterialType[];
  options: PrintOptions;
  total: number;
  quoteNumber: string;
  onClose: () => void;
  blueprintOptions: BlueprintOptions;
}

export const QuoteView = forwardRef<HTMLDivElement, QuoteViewProps>(({
  contactInfo,
  dimensions,
  material,
  materials,
  options,
  total,
  quoteNumber,
  onClose,
  blueprintOptions
}, ref) => {
  const selectedMaterial = materials.find(m => m.id === material);
  const area = (dimensions.width * dimensions.height) / 144;
  const date = new Date().toLocaleDateString();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-content, .print-content * {
          visibility: visible;
        }
        .print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        @page {
          size: auto;
          margin: 20mm;
          count: 1;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 print:p-0 print:bg-white">
      <div className="bg-white rounded-lg max-w-2xl w-full print:shadow-none print:max-w-none" ref={ref}>
        <div className="print-content p-8 space-y-6">
          {/* Quote Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary-dark">Print Quote</h1>
              <p className="text-sm text-gray-500">Quote #: {quoteNumber}</p>
              <p className="text-sm text-gray-500">Date: {date}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-primary">Wide Format Printing</h2>
              <p className="text-sm text-gray-500">Professional Print Services</p>
            </div>
          </div>

          {/* Customer Information */}
          {(contactInfo.name || contactInfo.phone || contactInfo.email) && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-dark">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.name && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-primary-dark">{contactInfo.name}</p>
                  </div>
                )}
                {contactInfo.phone && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-primary-dark">{contactInfo.phone}</p>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-primary-dark">{contactInfo.email}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Print Details */}
          {!blueprintOptions.enabled && area > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-dark">Print Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Dimensions</p>
                  <p className="text-primary-dark">{dimensions.width}″ × {dimensions.height}″</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Area</p>
                  <p className="text-primary-dark">{area.toFixed(2)} sq ft</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Material</p>
                  <p className="text-primary-dark">{selectedMaterial?.name}</p>
                </div>
                {options.mounting && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mounting</p>
                    <p className="text-primary-dark">Included</p>
                  </div>
                )}
                {options.grommets && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Grommets</p>
                    <p className="text-primary-dark">{options.grommetQuantity} pieces</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Blueprint Details */}
          {blueprintOptions.enabled && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-dark">Blueprint Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pages per Set</p>
                  <p className="text-primary-dark">{blueprintOptions.pagesPerSet}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Number of Sets</p>
                  <p className="text-primary-dark">{blueprintOptions.numberOfSets}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Pages</p>
                  <p className="text-primary-dark">{blueprintOptions.pagesPerSet * blueprintOptions.numberOfSets}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Bindings</p>
                  <p className="text-primary-dark">{blueprintOptions.bindingsPerSet * blueprintOptions.numberOfSets}</p>
                </div>
              </div>
            </div>
          )}

          {/* Rush Order */}
          {options.rush && !blueprintOptions.enabled && (
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-primary-dark font-medium">Rush Order Requested</p>
              <p className="text-sm text-primary-dark/80">This order will be processed with priority (+25% fee applied)</p>
            </div>
          )}

          {/* Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-primary-dark">Total Amount</p>
              <p className="text-2xl font-bold text-primary">${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Terms */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>Terms & Conditions:</p>
            <ul className="list-disc list-inside">
              <li>Quote valid for 30 days</li>
              <li>50% deposit required to begin production</li>
              <li>Final payment due upon completion</li>
              <li>Rush orders subject to availability</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons - Hidden in Print */}
        <div className="border-t border-gray-200 p-4 flex justify-end space-x-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark 
                     flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Quote
          </button>
        </div>
      </div>
    </div>
  );
});

QuoteView.displayName = 'QuoteView';