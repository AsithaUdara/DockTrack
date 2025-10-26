// src/components/supervisor/reports/forms/Section2_Manpower.tsx
export default function Section2_Manpower() {
  const trades = ['Welders', 'Fitters', 'Painters', 'Electricians', 'Engineers'];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Section 2: Manpower & Man-Hours</h2>
      
      {/* Mobile-friendly table with horizontal scroll */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Workers</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours per Worker</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trades.map(trade => (
              <tr key={trade}>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{trade}</td>
                <td className="px-3 sm:px-6 py-4"><input type="number" className="w-20 sm:w-24 p-2 border border-gray-300 rounded-md text-sm" defaultValue="0"/></td>
                <td className="px-3 sm:px-6 py-4"><input type="number" className="w-20 sm:w-24 p-2 border border-gray-300 rounded-md text-sm" defaultValue="8"/></td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">0 Hours</td>
              </tr>
            ))}
          </tbody>
           <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-3 sm:px-6 py-3 text-right text-sm font-semibold text-gray-800">Total Man-Hours Today:</td>
                <td className="px-3 sm:px-6 py-3 text-sm font-bold text-gray-900">0 Hours</td>
              </tr>
          </tfoot>
        </table>
      </div>
      <button className="font-semibold text-blue-600 hover:text-blue-800 text-sm">
        + Add Another Trade
      </button>
    </div>
  );
}
