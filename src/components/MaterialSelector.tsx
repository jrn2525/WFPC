import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import type { Material, MaterialType } from '../types';
import { MaterialEditor } from './MaterialEditor';

interface MaterialSelectorProps {
  selected: Material;
  onChange: (material: Material) => void;
  materials: MaterialType[];
  onMaterialsChange: (materials: MaterialType[]) => void;
  disabled?: boolean;
}

export function MaterialSelector({ 
  selected, 
  onChange, 
  materials, 
  onMaterialsChange,
  disabled = false
}: MaterialSelectorProps) {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className={`space-y-4 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-primary-dark">Material</h3>
        <button
          onClick={() => setShowEditor(true)}
          className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
          disabled={disabled}
        >
          <Settings className="w-4 h-4" />
          Manage Materials
        </button>
      </div>

      <div className="space-y-2">
        {materials.map((material) => (
          <div
            key={material.id}
            className={`
              flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer
              ${selected === material.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/30'
              }
            `}
            onClick={() => !disabled && onChange(material.id)}
          >
            <span className="font-medium text-primary-dark">{material.name}</span>
            <span className="text-primary-dark">${material.price.toFixed(2)}/sq ft</span>
          </div>
        ))}
      </div>

      {showEditor && (
        <MaterialEditor
          materials={materials}
          onMaterialsChange={onMaterialsChange}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}