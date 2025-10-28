import { useState } from 'react';

interface SafetyObservation {
  briefing: boolean;
  briefingTime?: string;
  attendees?: string;
  ppeCompliance: string;
  incidents: boolean;
  incidentDescription?: string;
}

const mockSafetyObservation: SafetyObservation = {
  briefing: false,
  briefingTime: '',
  attendees: '',
  ppeCompliance: '100%',
  incidents: false,
  incidentDescription: '',
};

export default function Section5_SafetyObservations() {
  const [safety, setSafety] = useState<SafetyObservation>(mockSafetyObservation);

  const updateSafety = (field: keyof SafetyObservation, value: string | boolean) => {
    setSafety({ ...safety, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 5: Safety Observations</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Safety Information</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <p className="text-gray-800 w-1/3">Safety Briefing:</p>
            <div className="flex items-center space-x-2">
              <select
                value={safety.briefing ? 'Yes' : 'No'}
                onChange={(e) => updateSafety('briefing', e.target.value === 'Yes')}
                className="p-2 border border-gray-300 rounded-md text-gray-600"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {safety.briefing && (
                <>
                  <input
                    type="text"
                    value={safety.briefingTime || ''}
                    onChange={(e) => updateSafety('briefingTime', e.target.value)}
                    placeholder="Time (e.g., 7:00 AM, 08:30)"
                    className="p-2 border border-gray-300 rounded-md text-gray-600"
                  />
                  <input
                    type="text"
                    value={safety.attendees || ''}
                    onChange={(e) => updateSafety('attendees', e.target.value)}
                    placeholder="Number of Attendees (e.g., 15, 20, 8)"
                    className="p-2 border border-gray-300 rounded-md text-gray-600 w-56"
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-gray-800 w-1/3">PPE Compliance:</p>
            <input
              type="text"
              value={safety.ppeCompliance}
              onChange={(e) => updateSafety('ppeCompliance', e.target.value)}
              placeholder="PPE Compliance Rate (e.g., 100%, 95%)"
              className="p-2 border border-gray-300 rounded-md text-gray-600"
            />
          </div>
          <div className="flex items-center">
            <p className="text-gray-800 w-1/3">Incidents Today:</p>
            <select
              value={safety.incidents ? 'Yes' : 'No'}
              onChange={(e) => updateSafety('incidents', e.target.value === 'Yes')}
              className="p-2 border border-gray-300 rounded-md text-gray-600"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {safety.incidents && (
            <div className="flex items-start">
              <p className="text-gray-800 w-1/3">Incident Description:</p>
              <textarea
                value={safety.incidentDescription || ''}
                onChange={(e) => updateSafety('incidentDescription', e.target.value)}
                placeholder="Describe the incident in detail (What happened? When? Where? Who was involved? What actions were taken?)"
                rows={4}
                className="flex-1 p-2 border border-gray-300 rounded-md text-gray-600"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}