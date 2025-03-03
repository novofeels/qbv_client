// src/components/dashboard/Awareness.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust path if needed

const Awareness: React.FC = () => {
  // Get the awareness data from Redux store
  const awarenessData = useSelector((state: RootState) => state.awareness);

  // Show loading state if data is loading
  if (awarenessData.isLoading) {
    return <div>Loading awareness data...</div>;
  }

  // Show error if there's an error
  if (awarenessData.error) {
    return <div>Error: {awarenessData.error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Awareness Score: {awarenessData.score}</h2>
      <p className="mb-4">{awarenessData.details}</p>
      
      <h3 className="font-medium mb-2">Key Metrics:</h3>
      <ul className="mb-4">
        <li>Traffic: {awarenessData.traffic}</li>
        <li>Engagement: {awarenessData.engagement}</li>
        <li>Social: {awarenessData.social}</li>
      </ul>
      
      <h3 className="font-medium mb-2">Subconstructs:</h3>
      <div className="space-y-2">
        {awarenessData.subconstructs.map((subconstruct, index) => (
          <div key={index} className="border p-3 rounded">
            <div className="flex justify-between">
              <span>{subconstruct.name}</span>
              <span>{subconstruct.score}%</span>
            </div>
            <p className="text-sm text-gray-600">{subconstruct.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awareness;