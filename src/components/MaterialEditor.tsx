import React, { useState } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import type { MaterialType } from '../types';

interface MaterialEditorProps {
  materials: MaterialType[];
  onMaterialsChange: (materials: MaterialType[]) => void;
  onClose: () => void;
}

interface MaterialFormData {
  id: string;
  name: string;
  price: string;
  isNew?: boolean;
  hasChanges?: boolean;
}

export function MaterialEditor({ materials, onMaterialsChange, onClose }: MaterialEditorProps) {
  const [formData, setFormData] = useState<MaterialFormData[]>(
    materials.map(m => ({
      id: m.id,
      name: m.name,
      price: m.price.toString(),
      hasChanges: false
    }))
  );

  const handleChange = (id: string, field: 'name' | 'price', value: string) => {
    setFormData(prev => prev.map(item => 
      item.id === id 
        ? { ...item, [field]: value, hasChanges: true }
        : item
    ));
  };

  const handleAdd = () => {
    const newId = `material-${Date.now()}`;
    setFormData(prev => [...prev, {
      id: newId,
      name: '',
      price: '',
      isNew: true,
      hasChanges: true
    }]);
  };

  const handleDelete = (id: string) => {
    setFormData(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = (id: string) => {
    const item = formData.find(f => f.id === id);
    if (!item || !item.name || !item.price) return;

    const updatedMaterials = formData
      .filter(f => f.name && f.price)
      .map(f => ({
        id: f.id,
        name: f.name,
        price: parseFloat(f.price) || 0
      }));

    onMaterialsChange(updatedMaterials);
    setFormData(prev => prev.map(f => 
      f.id === id ? { ...f, hasChanges: false, isNew: false } : f
    ));
  };

  const handleSaveAll = () => {
    const validMaterials = formData
      .filter(f => f.name && f.price)
      .map(f => ({
        id: f.id,
        name: f.name,
        price: parseFloat(f.price) || 0
      }));

    onMaterialsChange(validMaterials);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary-dark">Manage Materials</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {formData.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr,120px,auto] gap-3 items-center">
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                className="p-2 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Material name"
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleChange(item.id, 'price', e.target.value)}
                  className="p-2 pl-7 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary w-full"
                  min="0"
                  step="0.01"
                  placeholder="Price"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSave(item.id)}
                  disabled={!item.hasChanges}
                  className={`p-2 rounded-lg transition-colors ${
                    item.hasChanges
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-300'
                  }`}
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add Material
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}