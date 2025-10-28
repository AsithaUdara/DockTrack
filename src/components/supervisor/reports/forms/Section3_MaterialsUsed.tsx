// src/components/supervisor/reports/forms/Section3_MaterialsUsed.tsx
import { useState } from 'react';
import { mockMaterialsUsed, MaterialUsed } from '@/data/mock-daily-activity';

export default function Section3_MaterialsUsed() {
  const [materials, setMaterials] = useState<MaterialUsed[]>(mockMaterialsUsed);

  const addMaterial = () => {
    setMaterials([...materials, { name: '', quantity: '' }]);
  };

  const updateMaterial = (index: number, field: keyof MaterialUsed, value: string) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    setMaterials(updatedMaterials);
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 3: Materials Used</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Materials List</h3>
        <div className="space-y-2">
          {materials.map((material, index) => (
            <div key={index} className="flex items-center space-x-2 py-2 border-b border-gray-200">
              <input
                type="text"
                value={material.name}
                onChange={(e) => updateMaterial(index, 'name', e.target.value)}
                placeholder="Material Name"
                className="flex-1 p-2 border border-gray-300 rounded-md text-gray-800"
              />
              <input
                type="text"
                value={material.quantity}
                onChange={(e) => updateMaterial(index, 'quantity', e.target.value)}
                placeholder="Quantity"
                className="w-1/3 p-2 border border-gray-300 rounded-md text-gray-600"
              />
              <button
                onClick={() => removeMaterial(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addMaterial}
          className="font-semibold text-blue-600 hover:text-blue-800 text-sm mt-4"
        >
          + Add Material Row
        </button>
      </div>
    </div>
  );
}