// src/components/supervisor/reports/forms/Section9_TomorrowPlan.tsx
import { useState } from 'react';
import { mockTomorrowPlan, TomorrowPlan } from '@/data/mock-daily-activity';

export default function Section9_TomorrowPlan() {
  const [plans, setPlans] = useState<TomorrowPlan[]>(mockTomorrowPlan);

  const addPlan = () => {
    setPlans([...plans, { task: '' }]);
  };

  const updatePlan = (index: number, value: string) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = { task: value };
    setPlans(updatedPlans);
  };

  const removePlan = (index: number) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 9: Tomorrow's Plan</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Planned Tasks</h3>
        <div className="space-y-2">
          {plans.map((plan, index) => (
            <div key={index} className="flex items-center space-x-2 py-2 border-b border-gray-200">
              <input
                type="text"
                value={plan.task}
                onChange={(e) => updatePlan(index, e.target.value)}
                placeholder="Task Description"
                className="flex-1 p-2 border border-gray-300 rounded-md text-gray-800"
              />
              <button
                onClick={() => removePlan(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addPlan}
          className="font-semibold text-blue-600 hover:text-blue-800 text-sm mt-4"
        >
          + Add Another Task
        </button>
      </div>
    </div>
  );
}
