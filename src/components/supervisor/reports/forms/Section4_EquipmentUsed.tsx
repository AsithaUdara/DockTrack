// src/components/supervisor/reports/forms/Section4_EquipmentUsed.tsx
import { useState } from 'react';
import { mockEquipmentUsed, EquipmentUsed } from '@/data/mock-daily-activity';

export default function Section4_EquipmentUsed() {
  const [equipment, setEquipment] = useState<EquipmentUsed[]>(mockEquipmentUsed);

  const addEquipment = () => {
    setEquipment([...equipment, { name: '', hours: 0, status: 'Working' }]);
  };

  const updateEquipment = (index: number, field: keyof EquipmentUsed, value: string | number) => {
    const updatedEquipment = [...equipment];
    updatedEquipment[index] = { ...updatedEquipment[index], [field]: value };
    setEquipment(updatedEquipment);
  };

  const removeEquipment = (index: number) => {
    setEquipment(equipment.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 4: Equipment Used</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Equipment Status</h3>
        <div className="space-y-2">
          {equipment.map((equip, index) => (
            <div key={index} className="flex items-center space-x-2 py-2 border-b border-gray-200">
              <input
                type="text"
                value={equip.name}
                onChange={(e) => updateEquipment(index, 'name', e.target.value)}
                placeholder="Equipment Name"
                className="flex-1 p-2 border border-gray-300 rounded-md text-gray-800"
              />
              <input
                type="number"
                value={equip.hours}
                onChange={(e) => updateEquipment(index, 'hours', parseFloat(e.target.value))}
                placeholder="Hours"
                className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-600"
              />
              <select
                value={equip.status}
                onChange={(e) => updateEquipment(index, 'status', e.target.value as EquipmentUsed['status'])}
                className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-600"
              >
                <option value="Working">Working</option>
                <option value="Needs Service">Needs Service</option>
                <option value="Out of Service">Out of Service</option>
              </select>
              <button
                onClick={() => removeEquipment(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addEquipment}
          className="font-semibold text-blue-600 hover:text-blue-800 text-sm mt-4"
        >
          + Add Equipment Row
        </button>
      </div>
    </div>
  );
}