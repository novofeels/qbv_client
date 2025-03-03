// src/components/InsightDetails.tsx
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getStatusColor, getRingColor } from "../utils/colorUtils";

interface InsightDetailsProps {
  constructData: any;
  pinnacleData: any;
}

const InsightDetails = ({ constructData, pinnacleData }: InsightDetailsProps) => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b pb-4 mb-6">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
          Insight Analysis
        </h3>
        <p className={`text-center font-medium ${getStatusColor(constructData.status)}`}>
          {constructData.status}
        </p>
      </div>
      
      <p className="text-gray-700 mb-6">{constructData.details}</p>
      
      {/* Subconstructs Section */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-700 mb-4">Key Metrics:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {constructData.subconstructs.map((sub: any, idx: number) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                <span className="text-sm font-medium" style={{ color: getRingColor(sub.score) }}>{sub.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="h-2.5 rounded-full" style={{ width: `${sub.score}%`, backgroundColor: getRingColor(sub.score) }}></div>
              </div>
              <p className="text-xs text-gray-500">{sub.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insight-specific information */}
      <div className="mt-8 p-4 bg-teal-50 rounded-md">
        <h4 className="font-medium text-teal-800 mb-2">Data Collection Status</h4>
        <p className="text-sm text-gray-700">
          Your organization has a critical lack of customer data collection and analysis infrastructure. 
          This severely limits your ability to understand customer behaviors, preferences, and needs.
          Without robust data collection processes, your decision-making remains largely uninformed by customer insights.
        </p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-md">
          <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
          {pinnacleData.keyStrengths.length > 0 ? (
            <ul className="text-sm">
              {pinnacleData.keyStrengths.map((strength, idx) => (
                <li key={idx} className="mb-1 flex items-start">
                  <span className="mr-2 text-green-500">•</span> {strength}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No significant strengths identified in this area.</p>
          )}
        </div>
        
        <div className="bg-red-50 p-4 rounded-md">
          <h4 className="font-medium text-red-800 mb-2">Areas for Improvement</h4>
          <ul className="text-sm">
            {pinnacleData.areasForImprovement.map((area, idx) => (
              <li key={idx} className="mb-1 flex items-start">
                <span className="mr-2 text-red-500">•</span> {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mt-8 p-5 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-800 mb-3">Recommendations</h4>
        <ul className="space-y-2">
          {constructData.recommendations.map((rec: string, idx: number) => (
            <li key={idx} className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 font-medium text-xs">{idx + 1}</span>
              </div>
              <div className="text-gray-700 text-sm">{rec}</div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default InsightDetails;