// src/components/AwarenessDetails.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { useSelector } from "react-redux";
import { getStatusColor, getRingColor } from "@/utils/colorUtils";
import { RootState } from "@/store";

// Add these type definitions
interface SocialChannel {
  name: string;
  score: number;
  iconName?: string;
  icon?: string;
  color: string;
  followers?: number;
  competitorData?: Record<string, string>;
}

interface CompetitorData {
  name: string;
  score: number;
  traffic: number;
  engagement: number;
  social: number;
  status: string;
  keyStrengths: string[];
}

interface AwarenessDetailsProps {
  constructData: {
    socialChannels: SocialChannel[];
    score: number;
    traffic: number;
    engagement: number;
    social: number;
    status: string;
    details: string;
    recommendations: string[];
    competitors: CompetitorData[];
  };
  pinnacleData: {
    name: string;
    keyStrengths: string[];
    areasForImprovement: string[];
  };
  companyId?: string; // Add this optional prop
}

const AwarenessDetails = ({ constructData, pinnacleData, companyId = 'pinnacle' }: AwarenessDetailsProps) => {
  const [showCompetitors, setShowCompetitors] = useState(false);
  // Get the detailed awareness data from the awareness slice
  const detailedAwarenessData = useSelector((state: RootState) => state.awareness);
  
  // Check if data is available before accessing properties
  const competitorPositioning = detailedAwarenessData?.competitorPositioning || {
    awareness: { 
      yourPosition: "N/A", 
      percentile: "N/A", 
      gap: "N/A" 
    }
  };

  // Get traffic description based on company
  const getTrafficDescription = () => {
    if (companyId === 'pinnacle') {
      return "Very low website traffic (20% of benchmark)";
    } else {
      return "Very limited website traffic (14/100, lowest among competitors)";
    }
  };

  // Get engagement description based on company
  const getEngagementDescription = () => {
    if (companyId === 'pinnacle') {
      return "High bounce rate (194% of industry average)";
    } else {
      return "Good engagement metrics (54/100, low bounce rate)";
    }
  };

  // Get social description based on company
  const getSocialDescription = () => {
    if (companyId === 'pinnacle') {
      return "Nearly non-existent social media (1-2% of benchmarks)";
    } else {
      return "Strong on Instagram (12.5K followers), minimal on other platforms";
    }
  };

  // Get social media alert message based on company
  const getSocialAlertMessage = () => {
    if (companyId === 'pinnacle') {
      return "Your social media presence is critically behind industry standards. LinkedIn is your strongest channel but still only at 40% of benchmark. Other platforms have minimal presence, limiting your digital reach and brand awareness.";
    } else {
      return "Your social media presence is concentrated on Instagram with 12,500 followers, which compares well with industry peers. Facebook has minimal presence (929 followers) and X/Twitter is virtually non-existent (15 followers). Consider leveraging your Instagram success to improve other channels.";
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
          <p className={`text-center font-medium`}>
          Measures your brand&apos;s visibility across digital channels including website traffic, social media presence, and industry mentions.
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
                  <p className="mb-2">
                    {companyId === 'pinnacle' ? 
                      "Only 20% of industry benchmark for total visitors" : 
                      "Only 36,175 total visits, lowest among tracked competitors"}
                  </p>
                  <div>
                    <p className="font-semibold border-b pb-1 mb-1">Monthly Stats</p>
                    <div className="flex justify-between my-1">
                      <span>Total Visits:</span>
                      <span>{companyId === 'pinnacle' ? '989,533' : '36,175'}</span>
                    </div>
                    <div className="flex justify-between my-1">
                      <span>Monthly Visits:</span>
                      <span>{companyId === 'pinnacle' ? '181,052' : '12,058'}</span>
                    </div>
                    <div className="flex justify-between my-1">
                      <span>Monthly Change:</span>
                      <span>{companyId === 'pinnacle' ? '+5.2%' : '-15.82%'}</span>
                    </div>
                    <div className="mt-2 pt-1 border-t border-gray-600">
                      <div className="flex justify-between my-1 text-xs text-gray-300">
                        <span>Industry Leader:</span>
                        <span>{companyId === 'pinnacle' ? 'Truist - 22.2M' : 'Goat Power - 251.5K'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">{getTrafficDescription()}</p>
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
                  <p className="mb-2">
                    {companyId === 'pinnacle' ? 
                      "Poor engagement with high bounce rate" : 
                      "Good engagement metrics with low bounce rate"}
                  </p>
                  <div>
                    <p className="font-semibold border-b pb-1 mb-1">Engagement Metrics</p>
                    <div className="flex justify-between my-1">
                      <span>Visit Duration:</span>
                      <span>{companyId === 'pinnacle' ? '3:03' : '2:06'}</span>
                    </div>
                    <div className="flex justify-between my-1">
                      <span>Pages per Visit:</span>
                      <span>{companyId === 'pinnacle' ? '1.66' : '2.75'}</span>
                    </div>
                    <div className="flex justify-between my-1">
                      <span>Bounce Rate:</span>
                      <span>{companyId === 'pinnacle' ? '58.10%' : '34.83%'}</span>
                    </div>
                    <div className="mt-2 pt-1 border-t border-gray-600">
                      <div className="flex justify-between my-1 text-xs text-gray-300">
                        <span>Industry Average:</span>
                        <span>~{companyId === 'pinnacle' ? '18%' : '39%'} bounce rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">{getEngagementDescription()}</p>
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
                  <p className="mb-2">
                    {companyId === 'pinnacle' ? 
                      "Nearly non-existent social media presence" : 
                      "Strong on Instagram, limited presence on other platforms"}
                  </p>
                  <div>
                    <p className="font-semibold border-b pb-1 mb-1">Social Followers</p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {companyId === 'pinnacle' ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between my-1">
                            <span>Instagram:</span>
                            <span>12,500</span>
                          </div>
                          <div className="flex justify-between my-1">
                            <span>Facebook:</span>
                            <span>929</span>
                          </div>
                          <div className="flex justify-between my-1">
                            <span>X:</span>
                            <span>15</span>
                          </div>
                          <div className="flex justify-between my-1">
                            <span>LinkedIn:</span>
                            <span>0</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-2 pt-1 border-t border-gray-600">
                      <div className="flex justify-between my-1 text-xs text-gray-300">
                        <span>{companyId === 'pinnacle' ? 'LinkedIn vs Benchmark:' : 'Instagram vs Benchmark:'}</span>
                        <span>{companyId === 'pinnacle' ? '40% of target' : '89% of leader'}</span>
                      </div>
                      <div className="flex justify-between my-1 text-xs text-gray-300">
                        <span>Total Social Followers:</span>
                        <span>{companyId === 'pinnacle' ? '21,281' : '13,444'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">{getSocialDescription()}</p>
            </div>
          </div>
        </div>

        {/* Social Media Presence Section */}
        <div className="mt-8">
          <h4 className="font-medium text-gray-700 mb-4">Social Media Presence:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {constructData.socialChannels.map((channel: SocialChannel, idx: number) => {
              // Use dynamic import for icons based on iconName or icon property
              const getIconComponent = (channel: SocialChannel) => {
                const iconName = channel.iconName || channel.icon;
                
                if (iconName === 'linkedin' || iconName === 'FaLinkedin') return FaLinkedin;
                if (iconName === 'facebook' || iconName === 'FaFacebook') return FaFacebook;
                if (iconName === 'x' || iconName === 'twitter' || iconName === 'FaTwitter' || iconName === 'FaX' || iconName === 'SiX') return SiX;
                if (iconName === 'instagram' || iconName === 'FaInstagram') return FaInstagram;
                if (iconName === 'youtube' || iconName === 'FaYoutube') return FaYoutube;
                return FaInstagram; // Default fallback
              };
              
              const Icon = getIconComponent(channel);
              
              // Set correct follower data based on actual data
              let followers = channel.followers;
              
              if (companyId === 'ghostcat') {
                if (channel.name === 'Instagram') {
                  followers = 12500;
                } else if (channel.name === 'Facebook') {
                  followers = 929;
                } else if (channel.name === 'X') {
                  followers = 15;
                } else if (channel.name === 'LinkedIn') {
                  followers = 0;
                }
              }
              
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
                      <span>{
                        companyId === 'pinnacle' ? 
                          (channel.name === 'LinkedIn' ? '20,200' : 
                           channel.name === 'Facebook' ? '354' : 
                           channel.name === 'X' ? '207' : 
                           channel.name === 'Instagram' ? '520' : 'N/A') : 
                          (channel.name === 'Instagram' ? '12,500' : 
                           channel.name === 'Facebook' ? '929' : 
                           channel.name === 'X' ? '15' : 
                           channel.name === 'LinkedIn' ? '0' : 'N/A')
                      }</span>
                    </p>
                    <p className="font-bold mt-2 mb-1 border-b pb-1">Industry Comparison</p>
                    <p className="flex justify-between my-1">
                      <span>Industry Leader:</span>
                      <span>{
                        companyId === 'pinnacle' ? 
                          (channel.name === 'LinkedIn' ? '166,000' : 
                           channel.name === 'Facebook' ? '359,300' : 
                           channel.name === 'X' ? '23,600' : 
                           channel.name === 'Instagram' ? '14,500' : 'N/A') : 
                          (channel.name === 'Instagram' ? '14,100 (Goat Power)' : 
                           channel.name === 'Facebook' ? '9,700 (E-Cells)' : 
                           channel.name === 'X' ? '172 (E-Cells)' : 
                           channel.name === 'LinkedIn' ? 'No presence' : 'N/A')
                      }</span>
                    </p>
                    <p className="flex justify-between my-1">
                      <span>Your Position:</span>
                      <span>{
                        companyId === 'pinnacle' ? 
                          (channel.name === 'LinkedIn' ? 'Bottom 10%' : 'Bottom 5%') : 
                          (channel.name === 'Instagram' ? '2nd place' : 
                           channel.name === 'Facebook' ? '4th place' : 
                           channel.name === 'X' ? '4th place' : 'No presence')
                      }</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className={`mt-6 p-4 ${companyId === 'pinnacle' ? 'bg-yellow-50' : 'bg-blue-50'} rounded-md`}>
            <h4 className={`font-medium ${companyId === 'pinnacle' ? 'text-yellow-800' : 'text-blue-800'} mb-2`}>
              {companyId === 'pinnacle' ? 'Priority Action Required' : 'Action Recommended'}
            </h4>
            <p className="text-sm text-gray-700">
              {getSocialAlertMessage()}
            </p>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
            {pinnacleData.keyStrengths.length > 0 ? (
              <ul className="text-sm">
                {pinnacleData.keyStrengths.map((strength: string, idx: number) => (
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
              {pinnacleData.areasForImprovement.map((area: string, idx: number) => (
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
                  {/* Your company row */}
                  <tr className="bg-pink-50">
                    <td className="px-3 py-4 whitespace-nowrap font-medium">{pinnacleData.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{constructData.score}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{constructData.traffic}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{constructData.engagement}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{constructData.social}</td>
                    <td className={`px-3 py-4 whitespace-nowrap text-center ${getStatusColor(constructData.status)}`}>{constructData.status}</td>
                  </tr>
                  {/* Competitor rows */}
                  {constructData.competitors.map((competitor: CompetitorData, idx: number) => (
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
                    <span className="w-24 text-sm">{pinnacleData.name.split(' ')[0]}</span>
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
                            <span>{competitorPositioning.awareness.yourPosition || 
                              (companyId === 'pinnacle' ? 'Bottom 5%' : 'Average')}</span>
                          </div>
                          <div className="flex justify-between my-1">
                            <span>Average:</span>
                            <span>{competitorPositioning.awareness.average || 
                              (companyId === 'pinnacle' ? '58.5' : '51.3')}</span>
                          </div>
                          <div className="flex justify-between my-1">
                            <span>Competitors:</span>
                            <span>{constructData.competitors.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{constructData.score}</span>
                  </div>
                </div>
                
                {constructData.competitors.map((competitor: CompetitorData, idx: number) => (
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