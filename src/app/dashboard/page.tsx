"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRobot, FaExclamationTriangle, FaChevronDown, FaChevronUp, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { useSelector } from "react-redux";
import { AwarenessState } from "../features/dashboard/awarenessSlice";

type Competitor = {
  name: string;
  overallScore: number;
  status: string;
  awareness: number;
  perception: number;
  competition: number;
  insight: number;
  keyStrengths: string[];
  areasForImprovement: string[];
};

// Utility function: red→green gradient based on score 0–100
function getRingColor(score: number): string {
  const hue = (score / 100) * 120; 
  return `hsl(${hue}, 100%, 45%)`;
}

// Utility to get status color
function getStatusColor(status: string): string {
  switch(status) {
    case "Strong Performer": return "text-green-600";
    case "Below Average": return "text-yellow-600";
    case "Underperformer": return "text-orange-600";
    case "Critically Behind": return "text-red-600";
    default: return "text-gray-600";
  }
}

export default function DashboardPage() {
  // Get data from Redux store
  const pinnacleData = useSelector((state) => state.dashboard.pinnacleData);
  const constructs = useSelector((state) => state.dashboard.constructs);
  const awarenessData = useSelector((state) => state.dashboard.awarenessData);
  // Get the detailed awareness data from the awareness slice
  const detailedAwarenessData = useSelector((state) => state.awareness);
  
  const [selectedConstructIndex, setSelectedConstructIndex] = useState<number | null>(null); // No default selection
  const [showCompetitors, setShowCompetitors] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);

  const handleConstructClick = (index: number) => {
    setLogoRotation((prev) => prev + 360);
    setSelectedConstructIndex(index);
  };

  // Get the selected construct data if a construct is selected
  const selectedConstruct = selectedConstructIndex !== null ? constructs[selectedConstructIndex] : null;
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Centered Q logo + greeting */}
      <div className="flex flex-col items-center mt-4">
        <motion.div
          animate={{ rotate: logoRotation }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src="/staticLogo.png"
            alt="Qusaiq Logo"
            width={120}
            height={120}
            className="spinIn"
          />
        </motion.div>
        <h1 className="mt-2 text-xl md:text-2xl font-semibold text-gray-700">
          Welcome to your QBV-Report for {pinnacleData.name}
        </h1>
      </div>

      {/* Alert for Critical Status */}
      <div className="max-w-4xl mx-auto mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
        <div className="flex items-center">
          <FaExclamationTriangle className="text-red-500 mr-3 text-xl" />
          <div>
            <h3 className="text-red-600 font-medium">Critical Status Alert</h3>
            <p className="text-sm text-red-700">Your overall QBV score is {pinnacleData.overallScore}, placing you in "{pinnacleData.status}" status. Immediate action is required.</p>
          </div>
        </div>
      </div>

      {/* Main Report Card with Overall QBV Score */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {pinnacleData.name} QBV Score
          </h2>
          <div className="mt-4 flex justify-center">
            <div 
              className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold relative group cursor-help"
              style={{ backgroundColor: getRingColor(pinnacleData.overallScore) }}
            >
              {pinnacleData.overallScore}
              
              {/* Overall score tooltip */}
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs w-64 left-1/2 transform -translate-x-1/2 -bottom-48">
                <p className="font-bold mb-2 border-b pb-1">QBV Score Breakdown</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                  <span>Awareness:</span>
                  <span>{detailedAwarenessData.score}/100</span>
                  <span>Traffic:</span>
                  <span>{detailedAwarenessData.traffic}/100</span>
                  <span>Engagement:</span>
                  <span>{detailedAwarenessData.engagement}/100</span>
                  <span>Social:</span>
                  <span>{detailedAwarenessData.social}/100</span>
                </div>
                <p className="mt-2 text-xs italic">The QBV score aggregates multiple factors to evaluate your overall digital brand presence.</p>
              </div>
            </div>
          </div>
          <p className={`mt-2 font-semibold text-xl ${getStatusColor(pinnacleData.status)}`}>
            {pinnacleData.status}
          </p>
        </div>

        <p className="text-gray-700 text-center max-w-2xl mx-auto">
          We analyzed your digital presence and benchmarked against competitors to determine your brand's quantitative value.
        </p>
      </div>

      {/* The 4 Constructs Circle Display */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
          QBV Construct Scores
        </h3>
        <p className="text-center text-gray-600 mb-8">
          Select a construct to view detailed analysis
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-10">
          {constructs.map((construct, idx) => (
            <motion.div
              key={idx}
              className="cursor-pointer flex flex-col items-center"
              onClick={() => handleConstructClick(idx)}
              animate={{ 
                scale: selectedConstructIndex === idx ? 1.1 : 1,
                opacity: selectedConstructIndex === idx ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Outer ring (colored border) */}
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                style={{
                  border: `6px solid ${getRingColor(construct.value)}`,
                  boxShadow: selectedConstructIndex === idx ? '0 0 12px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                {/* Inner circle (white background + numeric score) */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white text-gray-800 text-lg md:text-xl font-bold">
                  {construct.value}
                </div>
              </div>
              <div className={`text-center mt-2 text-sm md:text-base font-medium ${selectedConstructIndex === idx ? 'text-gray-800' : 'text-gray-500'}`}>
                {construct.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* EXPANDED DETAILS for Selected Construct - Only shown when a construct is selected */}
      {selectedConstruct && (
        <motion.div 
          className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={selectedConstructIndex} // This forces re-animation when changing constructs
        >
        <div className="border-b pb-4 mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
            {selectedConstruct.name} Analysis
          </h3>
          <p className={`text-center font-medium ${getStatusColor(selectedConstruct.data.status)}`}>
            {selectedConstruct.data.status}
          </p>
        </div>
        
        <p className="text-gray-700 mb-6">{selectedConstruct.details}</p>
        
        {/* Subconstructs Section */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-4">Key Metrics:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedConstruct.data.subconstructs.map((sub: any, idx: number) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                  <span className="text-sm font-medium" style={{ color: getRingColor(sub.score) }}>{sub.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 cursor-help group relative">
                  <div className="h-2.5 rounded-full" style={{ width: `${sub.score}%`, backgroundColor: getRingColor(sub.score) }}></div>
                  
                  {/* Only show detailed tooltip for subconstructs in the awareness section that match detailed data */}
                  {selectedConstructIndex === 0 && (
                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-24 w-64 left-1/2 transform -translate-x-1/2">
                      <p className="font-bold mb-1">{sub.name}</p>
                      <p className="mb-2">{sub.description}</p>
                      {sub.name === "Website Traffic" && detailedAwarenessData.trafficMetrics && (
                        <div>
                          <p className="font-semibold border-b pb-1 mb-1">Key Metrics</p>
                          {detailedAwarenessData.trafficMetrics.slice(0, 2).map((metric, i) => (
                            <div key={i} className="flex justify-between my-1">
                              <span>{metric.name}:</span>
                              <span>{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {sub.name === "Bounce Rate" && detailedAwarenessData.trafficMetrics && (
                        <div>
                          <p className="font-semibold border-b pb-1 mb-1">Detailed Data</p>
                          <div className="flex justify-between my-1">
                            <span>Your Bounce Rate:</span>
                            <span>{detailedAwarenessData.trafficMetrics.find(m => m.name === "Bounce Rate")?.value}</span>
                          </div>
                          <div className="flex justify-between my-1">
                            <span>Industry Average:</span>
                            <span>{detailedAwarenessData.trafficMetrics.find(m => m.name === "Bounce Rate")?.competitorData["Industry Average"]}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">{sub.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Only render social channels for Awareness */}
        {selectedConstruct && selectedConstructIndex === 0 && (
          <div className="mt-8">
            <h4 className="font-medium text-gray-700 mb-4">Social Media Presence:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {awarenessData.socialChannels.map((channel, idx) => {
                // Use dynamic import for icons
                const Icon = channel.icon === 'FaLinkedin' 
                  ? FaLinkedin 
                  : channel.icon === 'FaFacebook' 
                    ? FaFacebook 
                    : channel.icon === 'FaTwitter' || channel.icon === 'FaX' || channel.icon === 'SiX'
                      ? SiX 
                      : FaInstagram;
                
                return (
                  <div 
                    key={idx} 
                    style={{backgroundColor: channel.color}} 
                    className="text-white p-4 rounded-md text-center relative group cursor-help"
                  >
                    <Icon className="mx-auto text-2xl mb-2" />
                    <h4 className="font-medium">{channel.name}</h4>
                    <p className="text-xl font-bold">{channel.score}%</p>
                    <p className="text-xs">of benchmark</p>
                    
                    {/* Tooltip with detailed data */}
                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs left-0 right-0 -top-40 mx-auto w-64">
                      <p className="font-bold mb-1 border-b pb-1">Detailed Stats</p>
                      <p className="flex justify-between my-1">
                        <span>Followers:</span>
                        <span>{detailedAwarenessData.socialChannels.find(c => 
                          // Check for both X and Twitter for compatibility
                          c.name === channel.name || 
                          (c.name === 'X' && channel.name === 'Twitter') || 
                          (c.name === 'Twitter' && channel.name === 'X'))?.followers.toLocaleString() || 'N/A'}</span>
                      </p>
                      <p className="font-bold mt-2 mb-1 border-b pb-1">Competitor Data</p>
                      {Object.entries(detailedAwarenessData.socialChannels.find(c => 
                        // Check for both X and Twitter for compatibility
                        c.name === channel.name || 
                        (c.name === 'X' && channel.name === 'Twitter') || 
                        (c.name === 'Twitter' && channel.name === 'X'))?.competitorData || {}).map(([key, value], i) => (
                        <p key={i} className="flex justify-between my-1">
                          <span>{key}:</span>
                          <span>{value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-md">
              <h4 className="font-medium text-yellow-800 mb-2">Priority Action Required</h4>
              <p className="text-sm text-gray-700">
                Your social media presence is critically behind industry standards. LinkedIn is your strongest channel but still only at 40% of benchmark. Other platforms have minimal presence, limiting your digital reach and brand awareness.
              </p>
            </div>
          </div>
        )}

        {/* Strengths & Weaknesses */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
            {pinnacleData.keyStrengths.length > 0 ? (
              <ul className="text-sm">
                {pinnacleData.keyStrengths.map((strength, idx) => (
                  <li key={idx} className="mb-1 flex items-start text-green-950">
                    <span className="mr-2 text-green-950">•</span> {strength}
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
                <li key={idx} className="mb-1 flex items-start text-red-950">
                  <span className="mr-2 text-red-950">•</span> {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8 p-5 bg-blue-50 rounded-md">
          <h4 className="font-medium text-blue-800 mb-3">Recommendations</h4>
          <ul className="space-y-2">
            {selectedConstruct.data.recommendations.map((rec: string, idx: number) => (
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
      )}

      {/* Competitor Analysis for Awareness - Only shown when Awareness is selected */}
      {selectedConstructIndex === 0 && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md mb-10">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowCompetitors(!showCompetitors)}
          >
            <h3 className="text-xl font-semibold text-gray-700">
              Competitor Analysis: {selectedConstruct.name}
            </h3>
            {showCompetitors ? 
              <FaChevronUp className="text-gray-500" /> : 
              <FaChevronDown className="text-gray-500" />
            }
          </div>
          
          {showCompetitors && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Traffic</th>
                      <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                      <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Social</th>
                      <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Pinnacle row */}
                    <tr className="bg-pink-50">
                      <td className="px-3 py-4 whitespace-nowrap font-medium">Pinnacle</td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">{awarenessData.score}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">{awarenessData.traffic}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">{awarenessData.engagement}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">{awarenessData.social}</td>
                      <td className={`px-3 py-4 whitespace-nowrap text-center ${getStatusColor(awarenessData.status)}`}>{awarenessData.status}</td>
                    </tr>
                    {/* Competitor rows */}
                    {awarenessData.competitors.map((competitor: any, idx: number) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-3 py-4 whitespace-nowrap font-medium">{competitor.name}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.score}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.traffic}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.engagement}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.social}</td>
                        <td className={`px-3 py-4 whitespace-nowrap text-center ${getStatusColor(competitor.status)}`}>{competitor.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Visual comparison - Bar chart */}
              <div className="mt-8">
                <h4 className="font-medium text-gray-700 mb-4">Visual Comparison: Awareness Scores</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">Pinnacle</span>
                      <div className="flex-1 ml-2 relative group">
                        <div className="w-full bg-gray-200 rounded-full h-4 cursor-help">
                          <div 
                            className="h-4 rounded-full bg-red-500" 
                            style={{ width: `${awarenessData.score}%` }}
                          ></div>
                          
                          {/* Tooltip with positioning data */}
                          <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-32 left-1/2 transform -translate-x-1/2 w-64">
                            <p className="font-bold mb-1 border-b pb-1">Competitive Position</p>
                            <div className="flex justify-between my-1">
                              <span>Your Position:</span>
                              <span>{detailedAwarenessData.competitorPositioning.awareness.yourPosition}</span>
                            </div>
                            <div className="flex justify-between my-1">
                              <span>Percentile:</span>
                              <span>{detailedAwarenessData.competitorPositioning.awareness.percentile}</span>
                            </div>
                            <div className="flex justify-between my-1">
                              <span>Gap:</span>
                              <span>{detailedAwarenessData.competitorPositioning.awareness.gap}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="ml-2 text-sm font-medium">{awarenessData.score}</span>
                    </div>
                  </div>
                  
                  {awarenessData.competitors.map((competitor: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex items-center">
                        <span className="w-24 text-sm">{competitor.name}</span>
                        <div className="flex-1 ml-2 relative group">
                          <div className="w-full bg-gray-200 rounded-full h-4 cursor-help">
                            <div 
                              className="h-4 rounded-full" 
                              style={{ 
                                width: `${competitor.score}%`,
                                backgroundColor: getRingColor(competitor.score)
                              }}
                            ></div>
                            
                            {/* Detailed competitor info tooltip */}
                            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-32 left-1/2 transform -translate-x-1/2 w-64">
                              <p className="font-bold mb-1 border-b pb-1">{competitor.name}</p>
                              <div className="grid grid-cols-2 gap-x-2 gap-y-1 my-1">
                                <span>Traffic:</span>
                                <span>{competitor.traffic}/100</span>
                                <span>Engagement:</span>
                                <span>{competitor.engagement}/100</span>
                                <span>Social:</span>
                                <span>{competitor.social}/100</span>
                              </div>
                              <p className="font-semibold mt-2 mb-1">Top Strength:</p>
                              <p className="text-xs italic">{competitor.keyStrengths[0]}</p>
                            </div>
                          </div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{competitor.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}