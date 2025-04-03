// src/components/CompetitionDetails.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaTrophy, FaChartLine, FaExchangeAlt } from "react-icons/fa";
import { getStatusColor, getRingColor } from "@/utils/colorUtils";

// Add these type definitions
interface MarketPositionItem {
  name: string;
  score: number;
  description: string;
}

interface CompetitorData {
  name: string;
  score: number;
  awarenessScore: number;
  perceptionScore: number;
  status: string;
  keyStrengths: string[];
}

interface CompetitionDetailsProps {
  constructData: {
    score: number;
    status: string;
    details: string;
    marketPosition: MarketPositionItem[];
    recommendations: string[];
    competitors: CompetitorData[];
    swotAnalysis?: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    }
  };
  pinnacleData: {
    name: string;
    keyStrengths: string[];
    areasForImprovement: string[];
  };
  companyId?: string;
}

const CompetitionDetails = ({ constructData, pinnacleData, companyId = 'pinnacle' }: CompetitionDetailsProps) => {
  const [showCompetitors, setShowCompetitors] = useState(false);
  const [activeSwotTab, setActiveSwotTab] = useState('strengths');
  
  // Helper to get the correct data based on company ID
  const getCompetitionData = () => {
    // Set default data structure first
    const defaultData = {
      score: constructData.score,
      status: constructData.status,
      details: "Your competitive position is below industry average. This analysis examines how effectively you compete against direct rivals in your market space.",
      marketPosition: [
        {
          name: "Market Share",
          score: 15,
          description: "Significantly below market leaders"
        },
        {
          name: "Growth Rate",
          score: 32,
          description: "Growing but slower than industry average"
        },
        {
          name: "Differentiation",
          score: 45,
          description: "Some unique features but not strongly differentiated"
        }
      ],
      swotAnalysis: {
        strengths: [
          "Strong customer loyalty from existing clients",
          "Above-average perception scores among customers who know you",
          "Efficient internal processes with good cost management"
        ],
        weaknesses: [
          "Very low market awareness hampering growth",
          "Limited digital footprint compared to competitors",
          "Smaller market share than key competitors"
        ],
        opportunities: [
          "Expand digital presence to reach new customer segments",
          "Develop stronger brand differentiation strategy",
          "Leverage existing customer satisfaction for referral programs"
        ],
        threats: [
          "Larger competitors with greater marketing budgets",
          "Market consolidation reducing available customer base",
          "Increasing customer acquisition costs in the industry"
        ]
      },
      recommendations: [
        "Develop targeted campaigns to increase awareness in key market segments",
        "Create a unique brand positioning to differentiate from larger competitors",
        "Leverage higher perception scores in marketing materials"
      ],
      competitors: []
    };

    // Now update with company-specific data
    if (companyId === 'pinnacle') {
      defaultData.score = 18;
      defaultData.status = "Critically Behind";
      defaultData.details = "Your competitive position is significantly weaker than major players in your industry. While your perception metrics are positive, your critical awareness gap is severely limiting your competitive effectiveness.";
      defaultData.marketPosition = [
        {
          name: "Market Share",
          score: 8,
          description: "Extremely low compared to industry leaders"
        },
        {
          name: "Growth Rate",
          score: 22,
          description: "Growing but much slower than industry average"
        },
        {
          name: "Differentiation",
          score: 31,
          description: "Limited brand differentiation in the marketplace"
        }
      ];
      defaultData.competitors = [
        {
          name: "Truist Bank",
          score: 83,
          awarenessScore: 87,
          perceptionScore: 59,
          status: "Market Leader",
          keyStrengths: ["Dominant market awareness", "Strong digital presence", "Scale advantages"]
        },
        {
          name: "Regions Bank",
          score: 76,
          awarenessScore: 77, 
          perceptionScore: 50,
          status: "Strong Performer",
          keyStrengths: ["Established regional presence", "Strong branch network", "Effective marketing"]
        },
        {
          name: "First Horizon",
          score: 47,
          awarenessScore: 44,
          perceptionScore: 57,
          status: "Average",
          keyStrengths: ["Good customer perception", "Efficient operations", "Community involvement"]
        },
        {
          name: "Old National Bank",
          score: 32,
          awarenessScore: 26,
          perceptionScore: 43,
          status: "Below Average",
          keyStrengths: ["Local market focus", "Loyal customer base", "Traditional banking appeal"]
        }
      ];
    } else {
      // Ghost-Cat data
      defaultData.score = 32;
      defaultData.status = "Below Average";
      defaultData.details = "Your competitive position ranks 4th in a field of 6 major competitors. Your strong Instagram presence provides competitive advantages, but limited website traffic and broader market visibility restrict your ability to compete effectively with market leaders.";
      defaultData.marketPosition = [
        {
          name: "Market Share",
          score: 22,
          description: "Limited share in a growing market"
        },
        {
          name: "Growth Rate",
          score: 45,
          description: "Growing at industry average rate"
        },
        {
          name: "Differentiation",
          score: 58,
          description: "Good design differentiation but limited feature differentiation"
        }
      ];
      defaultData.swotAnalysis = {
        strengths: [
          "Strong Instagram following creating brand visibility",
          "Good customer engagement metrics",
          "Distinct visual identity and brand aesthetic"
        ],
        weaknesses: [
          "Very limited website traffic compared to competitors",
          "Minimal presence on platforms beyond Instagram",
          "Product durability concerns affecting competitive position"
        ],
        opportunities: [
          "Convert Instagram followers to website visitors",
          "Expand to LinkedIn for B2B sales opportunities",
          "Address durability concerns to compete on quality"
        ],
        threats: [
          "Market leader (Goat Power) with much stronger metrics",
          "New entrants with heavy marketing investment",
          "Established competitors with broader product lines"
        ]
      };
      defaultData.recommendations = [
        "Leverage Instagram success to drive website traffic",
        "Develop targeted campaigns to highlight product differentiation",
        "Address product durability issues to compete on quality metrics",
        "Expand social presence beyond Instagram to reach new markets"
      ];
      defaultData.competitors = [
        {
          name: "Goat Power",
          score: 86,
          awarenessScore: 90,
          perceptionScore: 72,
          status: "Market Leader",
          keyStrengths: ["Dominant market awareness", "Strong website traffic", "Best-in-class perception"]
        },
        {
          name: "E-Cells",
          score: 59,
          awarenessScore: 58,
          perceptionScore: 65,
          status: "Above Average",
          keyStrengths: ["Balanced marketing approach", "Strong Facebook presence", "Good perception metrics"]
        },
        {
          name: "Wired-Freedom",
          score: 42,
          awarenessScore: 40,
          perceptionScore: 47,
          status: "Average",
          keyStrengths: ["Good website traffic", "Growing brand", "Focused marketing strategy"]
        },
        {
          name: "Philodo",
          score: 39,
          awarenessScore: 41,
          perceptionScore: 38,
          status: "Below Average",
          keyStrengths: ["Excellent engagement metrics", "Loyal customer base", "Efficient conversion"]
        },
        {
          name: "Meelod",
          score: 26,
          awarenessScore: 28,
          perceptionScore: 23,
          status: "Underperformer",
          keyStrengths: ["Rapid recent growth", "Budget pricing", "Niche market focus"]
        }
      ];
    }

    return defaultData;
  };

  // Get the appropriate competition data
  const data = getCompetitionData();
  
  // Company-specific theme colors
  const themeColor = companyId === 'pinnacle' ? 'text-blue-600' : 'text-green-600';
  const bgThemeColor = companyId === 'pinnacle' ? 'bg-blue-50' : 'bg-green-50';

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
            Competition Analysis
          </h3>
          <p className="text-center font-medium">
            Measures how effectively you compete against direct rivals in your market space.
          </p>
        </div>
        
        <p className="text-gray-700 mb-6">{data.details}</p>
        
        {/* Market Position Metrics */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-4">Competitive Position:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.marketPosition.map((position, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{position.name}</span>
                  <span className="text-sm font-medium" style={{ color: getRingColor(position.score) }}>{position.score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ width: `${position.score}%`, backgroundColor: getRingColor(position.score) }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{position.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Competitive Position */}
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <div className="flex items-center mb-3">
            <FaTrophy className="text-amber-600 mr-2" />
            <h4 className="font-medium text-gray-800">Overall Competitive Position</h4>
          </div>
          <div className="text-sm text-gray-700">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                <div 
                  className="h-4 rounded-full" 
                  style={{ 
                    width: `${data.score}%`, 
                    backgroundColor: getRingColor(data.score)
                  }}
                ></div>
              </div>
              <span className="font-medium" style={{ color: getRingColor(data.score) }}>{data.score}/100</span>
            </div>
            <p className="mt-2 mb-4">
              Your competitive score of <span className="font-medium">{data.score}/100</span> places you in the 
              "<span className={`font-medium ${getStatusColor(data.status)}`}>{data.status}</span>" category
              {companyId === 'pinnacle' ? 
                " and significantly behind market leaders. While you have some competitive advantages, your critical awareness gap limits your ability to compete effectively." : 
                " compared to competitors. You have some strong areas, particularly in social media, but trail behind market leaders in overall competitive position."}
            </p>
            
            {/* Company-specific competitive position details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 p-3 rounded-md shadow-sm">
                <h5 className="font-medium text-gray-800 mb-2">Competitive Strengths</h5>
                <ul className="text-xs space-y-1 text-gray-700">
                  {companyId === 'pinnacle' ? (
                    <>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">+</span> Above-average perception score (62/100)
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">+</span> Strong customer satisfaction among existing clients
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">+</span> Solid operational efficiency metrics
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">+</span> Strong Instagram presence (89% of market leader)
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">+</span> Good customer engagement metrics (54/100)
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">+</span> Visual brand differentiation in the marketplace
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-red-50 p-3 rounded-md shadow-sm">
                <h5 className="font-medium text-gray-800 mb-2">Competitive Weaknesses</h5>
                <ul className="text-xs space-y-1 text-gray-700">
                  {companyId === 'pinnacle' ? (
                    <>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-1">-</span> Critically low awareness score (11/100)
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-1">-</span> Minimal social media presence (6/100)
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-1">-</span> Very low website traffic (9/100)
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-1">-</span> Very limited website traffic (14/100)
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-1">-</span> Minimal presence on platforms beyond Instagram
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-1">-</span> Product durability concerns affecting competitiveness
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            
            {/* Market leader comparison */}
            <div className="bg-amber-50 p-3 rounded-md mt-4">
              <h5 className="font-medium text-amber-800 mb-2">Gap Analysis: Market Leader Comparison</h5>
              <p className="text-xs mb-2">
                {companyId === 'pinnacle' ? 
                  "Compared to market leader Truist Bank (score: 83/100), your competitive gap is 65 points." : 
                  "Compared to market leader Goat Power (score: 86/100), your competitive gap is 54 points."}
              </p>
              <div className="flex items-center mt-3">
                <span className="w-20 text-xs font-medium">You</span>
                <div className="flex-grow h-2 bg-gray-200 rounded-full mx-2">
                  <div 
                    className="h-2 rounded-full bg-red-500" 
                    style={{ width: `${data.score}%` }}
                  ></div>
                </div>
                <span className="w-8 text-xs font-medium">{data.score}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="w-20 text-xs font-medium">
                  {companyId === 'pinnacle' ? "Truist" : "Goat Power"}
                </span>
                <div className="flex-grow h-2 bg-gray-200 rounded-full mx-2">
                  <div 
                    className="h-2 rounded-full bg-green-500" 
                    style={{ width: `${companyId === 'pinnacle' ? 83 : 86}%` }}
                  ></div>
                </div>
                <span className="w-8 text-xs font-medium">{companyId === 'pinnacle' ? 83 : 86}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SWOT Analysis */}
        <div className="mt-8">
          <h4 className="font-medium text-gray-700 mb-4">SWOT Analysis:</h4>
          
          {/* Tabs for SWOT sections */}
          <div className="flex border-b mb-4">
            <button 
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeSwotTab === 'strengths' ? `${bgThemeColor} ${themeColor} border-b-2 border-current` : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveSwotTab('strengths')}
            >
              Strengths
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeSwotTab === 'weaknesses' ? `${bgThemeColor} ${themeColor} border-b-2 border-current` : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveSwotTab('weaknesses')}
            >
              Weaknesses
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeSwotTab === 'opportunities' ? `${bgThemeColor} ${themeColor} border-b-2 border-current` : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveSwotTab('opportunities')}
            >
              Opportunities
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeSwotTab === 'threats' ? `${bgThemeColor} ${themeColor} border-b-2 border-current` : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveSwotTab('threats')}
            >
              Threats
            </button>
          </div>
          
          {/* Content for active SWOT tab */}
          <div className="p-4 bg-gray-50 rounded-md">
            {activeSwotTab === 'strengths' && (
              <div>
                <h5 className="font-medium text-green-800 mb-2">Strengths</h5>
                <ul className="text-sm space-y-2">
                  {data.swotAnalysis?.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-green-500">•</span> {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeSwotTab === 'weaknesses' && (
              <div>
                <h5 className="font-medium text-red-800 mb-2">Weaknesses</h5>
                <ul className="text-sm space-y-2">
                  {data.swotAnalysis?.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-red-500">•</span> {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeSwotTab === 'opportunities' && (
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Opportunities</h5>
                <ul className="text-sm space-y-2">
                  {data.swotAnalysis?.opportunities.map((opportunity, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-blue-500">•</span> {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeSwotTab === 'threats' && (
              <div>
                <h5 className="font-medium text-orange-800 mb-2">Threats</h5>
                <ul className="text-sm space-y-2">
                  {data.swotAnalysis?.threats.map((threat, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-orange-500">•</span> {threat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Competitive Factor Analysis */}
        <div className="mt-8">
          <h4 className="font-medium text-gray-700 mb-4">Competitive Factor Comparison:</h4>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-800 mb-3">Awareness vs. Competition</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center">
                      <span className="w-24 text-xs">You</span>
                      <div className="flex-1 ml-2">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full bg-blue-500" 
                            style={{ width: `${companyId === 'pinnacle' ? 11 : 51}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-2 text-xs font-medium">{companyId === 'pinnacle' ? 11 : 51}</span>
                    </div>
                  </div>
                  
                  {data.competitors.slice(0, 3).map((competitor, idx) => (
                    <div key={idx}>
                      <div className="flex items-center">
                        <span className="w-24 text-xs">{competitor.name}</span>
                        <div className="flex-1 ml-2">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full" 
                              style={{ 
                                width: `${competitor.awarenessScore}%`,
                                backgroundColor: getRingColor(competitor.awarenessScore)
                              }}
                            ></div>
                          </div>
                        </div>
                        <span className="ml-2 text-xs font-medium">{competitor.awarenessScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 mb-3">Perception vs. Competition</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center">
                      <span className="w-24 text-xs">You</span>
                      <div className="flex-1 ml-2">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full bg-blue-500" 
                            style={{ width: `${companyId === 'pinnacle' ? 62 : 60}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-2 text-xs font-medium">{companyId === 'pinnacle' ? 62 : 60}</span>
                    </div>
                  </div>
                  
                  {data.competitors.slice(0, 3).map((competitor, idx) => (
                    <div key={idx}>
                      <div className="flex items-center">
                        <span className="w-24 text-xs">{competitor.name}</span>
                        <div className="flex-1 ml-2">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full" 
                              style={{ 
                                width: `${competitor.perceptionScore}%`,
                                backgroundColor: getRingColor(competitor.perceptionScore)
                              }}
                            ></div>
                          </div>
                        </div>
                        <span className="ml-2 text-xs font-medium">{competitor.perceptionScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-100">
              <h5 className="text-xs font-medium text-yellow-800 mb-1">Key Insight:</h5>
              <p className="text-xs text-gray-700">
                {companyId === 'pinnacle' 
                  ? "While your perception score (62) is competitive, your extremely low awareness score (11) prevents market penetration and limits your competitive position. Focus on awareness-building initiatives to improve competitive stance."
                  : "Your relatively balanced awareness (51) and perception (60) provide a foundation for competitive growth, but still lag behind market leaders. Focus on increasing website traffic and expanding social presence beyond Instagram."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8 p-5 bg-blue-50 rounded-md">
          <h4 className="font-medium text-blue-800 mb-3">Strategic Recommendations</h4>
          <ul className="space-y-2">
            {data.recommendations.map((rec: string, idx: number) => (
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
            Detailed Competitor Analysis
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
                    <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Competitive Score</th>
                    <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Awareness</th>
                    <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Perception</th>
                    <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Your company row */}
                  <tr className="bg-pink-50">
                    <td className="px-3 py-4 whitespace-nowrap font-medium">{pinnacleData.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{data.score}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{companyId === 'pinnacle' ? 11 : 51}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-center">{companyId === 'pinnacle' ? 62 : 60}</td>
                    <td className={`px-3 py-4 whitespace-nowrap text-center ${getStatusColor(data.status)}`}>{data.status}</td>
                  </tr>
                  {/* Competitor rows */}
                  {data.competitors.map((competitor: CompetitorData, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-3 py-4 whitespace-nowrap font-medium">{competitor.name}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.score}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.awarenessScore}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.perceptionScore}</td>
                      <td className={`px-3 py-4 whitespace-nowrap text-center ${getStatusColor(competitor.status)}`}>{competitor.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Visual comparison - Bar chart */}
            <div className="mt-8">
              <h4 className="font-medium text-gray-700 mb-4">Visual Comparison: Competitive Position</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">{pinnacleData.name.split(' ')[0]}</span>
                    <div className="flex-1 ml-2 relative group">
                      <div className="w-full bg-gray-200 rounded-full h-4 cursor-help">
                        <div 
                          className="h-4 rounded-full bg-red-500" 
                          style={{ width: `${data.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{data.score}</span>
                  </div>
                </div>
                
                {data.competitors.map((competitor: CompetitorData, idx: number) => (
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
                          
                          {/* Tooltip with competitor strengths */}
                          <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-32 left-1/2 transform -translate-x-1/2 w-64">
                            <p className="font-bold mb-1">{competitor.name}</p>
                            <p className="mb-2">Competitive Score: {competitor.score}/100</p>
                            <p className="font-semibold mb-1">Key Strengths:</p>
                            <ul className="space-y-1">
                              {competitor.keyStrengths.map((strength, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-400 mr-1">•</span> {strength}
                                </li>
                              ))}
                            </ul>
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

export default CompetitionDetails;