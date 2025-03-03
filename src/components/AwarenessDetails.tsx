// src/components/AwarenessDetails.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { useSelector } from "react-redux";
import { getStatusColor, getRingColor } from "@/utils/colorUtils";

interface AwarenessDetailsProps {
  constructData: any;
  pinnacleData: any;
}

const AwarenessDetails = ({ constructData, pinnacleData }: AwarenessDetailsProps) => {
  const [showCompetitors, setShowCompetitors] = useState(false);
  // Get the detailed awareness data from the awareness slice
  const detailedAwarenessData = useSelector((state) => state.awareness);
  
  // Check if data is available before accessing properties
  const competitorPositioning = detailedAwarenessData?.competitorPositioning || {
    awareness: { 
      yourPosition: "N/A", 
      percentile: "N/A", 
      gap: "N/A" 
    }
  };

  return (
    <>
      <motion.div 
        className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-b pb-4 mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
            Awareness Analysis
          </h3>
          <p className={`text-center font-medium ${getStatusColor(constructData.status)}`}>
          Measures your brand's visibility across digital channels including website traffic, social media presence, and industry mentions.
          </p>
        </div>
        
        <p className="text-gray-700 mb-6">{constructData.details}</p>
        
       {/* Main Metrics Section - Traffic, Engagement, Social */}
       <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-4">Key Metrics:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Traffic Gauge */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Traffic</span>
                <span className="text-sm font-medium" style={{ color: getRingColor(constructData.traffic) }}>{constructData.traffic}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 cursor-help group relative">
                <div className="h-2.5 rounded-full" style={{ width: `${constructData.traffic}%`, backgroundColor: getRingColor(constructData.traffic) }}></div>
                
                {/* Detailed tooltip for Traffic */}
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-44 w-72 left-1/2 transform -translate-x-1/2">
                  <p className="font-bold mb-1">Website Traffic</p>
                  <p className="mb-2">Only 20% of industry benchmark for total visitors</p>
                  <div>
                    <p className="font-semibold border-b pb-1 mb-1">Monthly Stats</p>
                    <div className="flex justify-between my-1">
                      <span>Website Visits:</span>
                      <span>989,533</span>
                    </div>
                    <div className="flex justify-between my-1">
                      <span>Unique Website Visits:</span>
                      <span>181,052</span>
                    </div>
                    <div className="flex justify-between my-1">
                      <span>Dedupe Visits:</span>
                      <span>138,541</span>
                    </div>
                    {detailedAwarenessData?.competitorPositioning?.traffic && (
                      <div className="mt-2 pt-1 border-t border-gray-600">
                        <div className="flex justify-between my-1 text-xs text-gray-300">
                          <span>Industry Leader:</span>
                          <span>22,230,000 visits</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">Very low website traffic (20% of benchmark)</p>
            </div>

            {/* Engagement Gauge */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Engagement</span>
                <span className="text-sm font-medium" style={{ color: getRingColor(constructData.engagement) }}>{constructData.engagement}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 cursor-help group relative">
                <div className="h-2.5 rounded-full" style={{ width: `${constructData.engagement}%`, backgroundColor: getRingColor(constructData.engagement) }}></div>
                
                {/* Detailed tooltip for Engagement */}
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-44 w-72 left-1/2 transform -translate-x-1/2">
                  <p className="font-bold mb-1">User Engagement</p>
                  <p className="mb-2">Poor engagement with high bounce rate</p>
                  <div>
                    <p className="font-semibold border-b pb-1 mb-1">Engagement Metrics</p>
                    <div className="flex justify-between my-1">
                      <span>Visitor Time on Website:</span>
                      <span>3:03</span>
                    </div>
                    <div className="flex justify-between my-1">
                      <span>Pages per Visit:</span>
                      <span>1.66</span>
                    </div>
                    <div className="flex justify-between my-1">
                      <span>Bounce Rate:</span>
                      <span>58.10%</span>
                    </div>
                    {detailedAwarenessData?.trafficMetrics && (
                      <div className="mt-2 pt-1 border-t border-gray-600">
                        <div className="flex justify-between my-1 text-xs text-gray-300">
                          <span>Industry Average:</span>
                          <span>~18% bounce rate</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">High bounce rate (194% of industry average)</p>
            </div>

            {/* Social Gauge */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Social</span>
                <span className="text-sm font-medium" style={{ color: getRingColor(constructData.social) }}>{constructData.social}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 cursor-help group relative">
                <div className="h-2.5 rounded-full" style={{ width: `${constructData.social}%`, backgroundColor: getRingColor(constructData.social) }}></div>
                
                {/* Detailed tooltip for Social */}
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-56 w-72 left-1/2 transform -translate-x-1/2">
                  <p className="font-bold mb-1">Social Media Presence</p>
                  <p className="mb-2">Nearly non-existent social media presence</p>
                  <div>
                    <p className="font-semibold border-b pb-1 mb-1">Social Followers</p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      <div className="flex justify-between my-1">
                        <span>LinkedIn:</span>
                        <span>20,200</span>
                      </div>
                      <div className="flex justify-between my-1">
                        <span>Facebook:</span>
                        <span>354</span>
                      </div>
                      <div className="flex justify-between my-1">
                        <span>X:</span>
                        <span>207</span>
                      </div>
                      <div className="flex justify-between my-1">
                        <span>Instagram:</span>
                        <span>520</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-1 border-t border-gray-600">
                      <div className="flex justify-between my-1 text-xs text-gray-300">
                        <span>LinkedIn vs Benchmark:</span>
                        <span>40% of target</span>
                      </div>
                      <div className="flex justify-between my-1 text-xs text-gray-300">
                        <span>Other Platforms:</span>
                        <span>1-8% of benchmarks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">Nearly non-existent social media (1-2% of benchmarks)</p>
            </div>
          </div>
        </div>

        {/* Social Media Presence Section */}
        <div className="mt-8">
          <h4 className="font-medium text-gray-700 mb-4">Social Media Presence:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {constructData.socialChannels.map((channel, idx) => {
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

      {/* Competitor Analysis Section */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md mb-10">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowCompetitors(!showCompetitors)}
        >
          <h3 className="text-xl font-semibold text-gray-700">
            Competitor Analysis: Awareness
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
                    <td className="px-3 py-4 whitespace-nowrap text-center">{constructData.score}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{constructData.traffic}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{constructData.engagement}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{constructData.social}</td>
                    <td className={`px-3 py-4 whitespace-nowrap text-center ${getStatusColor(constructData.status)}`}>{constructData.status}</td>
                  </tr>
                  {/* Competitor rows */}
                  {constructData.competitors.map((competitor: any, idx: number) => (
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
                          style={{ width: `${constructData.score}%` }}
                        ></div>
                        
                        {/* Tooltip with positioning data */}
                        <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-32 left-1/2 transform -translate-x-1/2 w-64">
                          <p className="font-bold mb-1 border-b pb-1">Competitive Position</p>
                          <div className="flex justify-between my-1">
                            <span>Your Position:</span>
                            <span>{competitorPositioning.awareness.yourPosition}</span>
                          </div>
                          <div className="flex justify-between my-1">
                            <span>Percentile:</span>
                            <span>{competitorPositioning.awareness.percentile}</span>
                          </div>
                          <div className="flex justify-between my-1">
                            <span>Gap:</span>
                            <span>{competitorPositioning.awareness.gap}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{constructData.score}</span>
                  </div>
                </div>
                
                {constructData.competitors.map((competitor: any, idx: number) => (
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
    </>
  );
};

export default AwarenessDetails;