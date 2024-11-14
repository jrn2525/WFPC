import React, { useState, useCallback } from 'react';
import { Calculator, Printer, Settings2, RefreshCw } from 'lucide-react';
import { MaterialSelector } from './components/MaterialSelector';
import { DimensionsInput } from './components/DimensionsInput';
import { OptionsSelector } from './components/OptionsSelector';
import { BlueprintSelector } from './components/BlueprintSelector';
import { PriceSummary } from './components/PriceSummary';
import { ContactForm } from './components/ContactForm';
import { calculatePrice } from './utils/pricing';
import type { Material, PrintOptions, Dimensions, MaterialType, ContactInfo, BlueprintOptions } from './types';

const defaultOptions: PrintOptions = {
  rush: false,
  grommets: false,
  grommetQuantity: 0,
  mounting: false
};

const defaultBlueprintOptions: BlueprintOptions = {
  enabled: false,
  pagesPerSet: 1,
  numberOfSets: 1,
  bindingsPerSet: 0,
  pagePrice: 0.75,
  bindingPrice: 2.00
};

const defaultDimensions: Dimensions = { width: 0, height: 0 };

const defaultContactInfo: ContactInfo = {
  name: '',
  phone: '',
  email: ''
};

const initialMaterials: MaterialType[] = [
  { id: 'vinyl', name: 'Vinyl Banner', price: 3.5 },
  { id: 'canvas', name: 'Canvas', price: 5.0 },
  { id: 'paper', name: 'Photo Paper', price: 2.5 },
  { id: 'fabric', name: 'Fabric', price: 4.5 }
];

export default function App() {
  const [dimensions, setDimensions] = useState<Dimensions>(defaultDimensions);
  const [material, setMaterial] = useState<Material>(initialMaterials[0].id);
  const [options, setOptions] = useState<PrintOptions>(defaultOptions);
  const [materials, setMaterials] = useState<MaterialType[]>(initialMaterials);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [blueprintOptions, setBlueprintOptions] = useState<BlueprintOptions>(defaultBlueprintOptions);

  const handleCalculate = useCallback(() => {
    if (blueprintOptions.enabled) return 0;
    const selectedMaterial = materials.find(m => m.id === material);
    return calculatePrice(dimensions, selectedMaterial?.price || 0, options);
  }, [dimensions, material, materials, options, blueprintOptions.enabled]);

  const handleClear = () => {
    setDimensions(defaultDimensions);
    setMaterial(materials[0].id);
    setOptions(defaultOptions);
    setContactInfo(defaultContactInfo);
    setBlueprintOptions(defaultBlueprintOptions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Printer className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Wide Format Print Calculator</h1>
          </div>
          <p className="text-primary-dark text-lg">Professional Wide Format Printing Price Estimation</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 border-l-4 border-accent">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-primary-dark">Print Specifications</h2>
              </div>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary 
                         hover:bg-primary/5 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Clear All
              </button>
            </div>
            
            <ContactForm 
              contactInfo={contactInfo}
              onChange={setContactInfo}
            />

            <DimensionsInput 
              dimensions={dimensions}
              onChange={setDimensions}
              disabled={blueprintOptions.enabled}
            />
            
            <MaterialSelector 
              selected={material}
              onChange={setMaterial}
              materials={materials}
              onMaterialsChange={setMaterials}
              disabled={blueprintOptions.enabled}
            />
            
            <OptionsSelector 
              options={options}
              onChange={setOptions}
              disabled={blueprintOptions.enabled}
            />

            <BlueprintSelector
              options={blueprintOptions}
              onChange={setBlueprintOptions}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-accent">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-primary-dark">Price Summary</h2>
            </div>
            
            <PriceSummary 
              dimensions={dimensions}
              material={material}
              materials={materials}
              options={options}
              blueprintOptions={blueprintOptions}
              calculatePrice={handleCalculate}
              contactInfo={contactInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}