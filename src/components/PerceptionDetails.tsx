// src/components/PerceptionDetails.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaFacebook, FaYoutube, FaNewspaper } from "react-icons/fa";
import { getStatusColor, getRingColor } from "@/utils/colorUtils";

interface PerceptionDetailsProps {
  constructData: any;
  pinnacleData: any;
  companyId?: string; // Optional prop with default value
}

const PerceptionDetails = ({ constructData, pinnacleData, companyId = 'pinnacle' }: PerceptionDetailsProps) => {
  const [showCompetitors, setShowCompetitors] = useState(false);
  
  // Hardcoded data for both companies
  const perceptionData = {
    pinnacle: {
      overallScore: 62,
      status: "Good",
      details: "Your brand perception metrics show positive overall sentiment, with consistent ratings across news media and social channels. Customer reviews reflect strong satisfaction, though some service aspects require attention.",
      subconstructs: [
        { 
          name: "News Sentiment", 
          score: 55, 
          description: "Your news sentiment is on par with industry peers." 
        },
        { 
          name: "Social Sentiment", 
          score: 66, 
          description: "Your social sentiment is above average for the banking sector." 
        },
        { 
          name: "Customer Reviews", 
          score: 66, 
          description: "Customer reviews reflect strong satisfaction with your services." 
        }
      ],
      competitors: [
        { name: "Truist", score: 59, newsSentiment: 55, socialSentiment: 64, status: "above average" },
        { name: "Regions", score: 50, newsSentiment: 56, socialSentiment: 44, status: "Fair" },
        { name: "First Horizon", score: 57, newsSentiment: 57, socialSentiment: 56, status: "Fair" },
        { name: "Old National", score: 43, newsSentiment: 55, socialSentiment: 30, status: "Poor" }
      ],
      newsSentiment: {
        score: 55,
        insights: [
          "Your news sentiment score of 0.55 (55/100) is considered neutral to slightly positive.",
          "This score is on par with industry peers (Truist: 0.55, Regions: 0.56, First Horizon: 0.57, Old National: 0.55)."
        ]
      },
      socialSentiment: {
        score: 66,
        platform: "Facebook",
        insights: [
          "Your Facebook sentiment score of 0.66 (66/100) is above the industry average.",
          "Community-focused and celebratory posts generate strong positive sentiment and engagement.",
          "Posts highlighting team traditions, client appreciation, and social causes foster positive interactions and brand trust."
        ],
        negative: [
          "Lack of engagement in certain posts leads to weaker sentiment scores, indicating a need for more interactive content.",
          "Unaddressed service concerns or promotional posts with unclear benefits can contribute to negative sentiment trends."
        ]
      },
      customerReviews: {
        score: 66,
        averageRating: 4.06,
        sentimentScore: 0.66,
        positive: [
          "Many customers value the personalized and friendly service provided by staff.",
          "Security features and fraud prevention measures are commonly praised."
        ],
        neutral: [
          "Branch hours and accessibility are a point of mixed feedback among customers.",
          "Mobile banking services receive varied responses, with some customers finding them useful while others experience usability issues."
        ],
        negative: [
          "Long wait times and inconsistent customer service contribute significantly to customer dissatisfaction.",
          "Several customers report issues with account accessibility, transaction holds, and unexpected fees."
        ]
      },
      recommendations: [
        "Implement a more robust social media engagement strategy to respond promptly to customer concerns.",
        "Focus on improving mobile banking experience based on customer feedback.",
        "Develop a campaign highlighting your security features and fraud prevention measures.",
        "Address wait times and inconsistent service quality through staff training and process improvements."
      ]
    },
    ghostcat: {
      overallScore: 68,
      status: "Fair",
      details: "GhostCat Bikes shows a generally positive perception across YouTube reviews and Facebook engagement. Your products receive praise for performance and value, though some quality and durability concerns have been noted.",
      subconstructs: [
        { 
          name: "YouTube Sentiment", 
          score: 60, 
          description: "Product reviews show positive feedback on performance with some durability concerns." 
        },
        { 
          name: "Facebook Sentiment", 
          score: 59, 
          description: "Social sentiment reflects positive engagement with room for improvement." 
        }
      ],
      youtubeSentiment: {
        score: 60,
        sentimentLabel: "Neutral",
        positive: [
          "GhostCat e-bikes receive consistent praise for their speed, power, and affordability compared to competitors.",
          "Many reviewers appreciate the bike's off-road capability, citing strong suspension and handling."
        ],
        neutral: [
          "Battery performance opinions vary, with some reviews highlighting long range while others mention faster-than-expected drain.",
          "The weight of the bike is noted differently across reviews, with some finding it manageable while others struggle with transport."
        ],
        negative: [
          "Durability concerns appear in multiple reviews, with mentions of material quality and long-term reliability.",
          "Seat comfort is a frequent complaint, with some riders experiencing discomfort on extended rides."
        ]
      },
      facebookSentiment: {
        score: 59,
        sentimentLabel: "Neutral",
        positive: [
          "Posts announcing new partnerships or expansions consistently generate positive sentiment.",
          "Interactive posts where customers share experiences result in stronger engagement and approval."
        ],
        neutral: [
          "Inventory updates and logistics content generally produce neutral responses unless tied to service issues.",
          "Aesthetic or vague promotional posts gain visibility but offer limited emotional or transactional impact."
        ],
        negative: [
          "Posts lacking comments and engagement often perform poorly in sentiment despite product optimism.",
          "Limited customer feedback or questions left unanswered can lead to reduced perceived support."
        ]
      },
      competitors: [
        { name: "Goat Power", score: 72, youTube: 68, facebook: 76, status: "Good" },
        { name: "E-Cells", score: 65, youTube: 62, facebook: 68, status: "Fair" },
        { name: "CycleBot", score: 59, youTube: 55, facebook: 63, status: "Fair" }
      ],
      recommendations: [
        "Address durability and comfort concerns in your product development roadmap.",
        "Increase engagement on social media posts by answering customer questions promptly.",
        "Create more interactive content asking for customer experiences and feedback.",
        "Highlight your bikes' performance and value proposition in marketing materials."
      ]
    }
  };
  
  // Select company-specific data
  const data = companyId === 'pinnacle' ? perceptionData.pinnacle : perceptionData.ghostcat;
  
  // Company-specific theme colors
  const themeColor = companyId === 'pinnacle' ? 'text-blue-600' : 'text-green-600';
  const bgThemeColor = companyId === 'pinnacle' ? 'bg-blue-50' : 'bg-green-50';

  // Helper: Render detailed tooltip content based on the subconstruct name
  const renderTooltipContent = (subName: string) => {
    if (companyId === 'pinnacle') {
      if (subName === "News Sentiment") {
        return (
          <>
            <p className="font-bold mb-1">News Sentiment Details</p>
            {data.newsSentiment.insights.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs">{insight}</p>
            ))}
          </>
        );
      } else if (subName === "Social Sentiment") {
        return (
          <>
            <p className="font-bold mb-1">Social Sentiment Details</p>
            {data.socialSentiment.insights.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs">{insight}</p>
            ))}
            <p className="mt-2 font-semibold text-xs">Areas for Improvement:</p>
            {data.socialSentiment.negative.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs text-red-400">{insight}</p>
            ))}
          </>
        );
      } else if (subName === "Customer Reviews") {
        return (
          <>
            <p className="font-bold mb-1">Customer Reviews Overview</p>
            <p className="mb-1 text-xs">Average Rating: {data.customerReviews.averageRating}/5</p>
            <p className="mb-1 text-xs">Sentiment Score: {Math.round(data.customerReviews.sentimentScore * 100)}/100</p>
            <p className="mt-2 font-semibold text-xs">Positive Feedback:</p>
            {data.customerReviews.positive.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs text-green-400">{insight}</p>
            ))}
            <p className="mt-2 font-semibold text-xs">Negative Feedback:</p>
            {data.customerReviews.negative.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs text-red-400">{insight}</p>
            ))}
          </>
        );
      }
    } else {
      // ghostcat
      if (subName === "YouTube Sentiment") {
        return (
          <>
            <p className="font-bold mb-1">YouTube Reviews Details</p>
            <p className="mb-1 text-xs">Sentiment: {data.youtubeSentiment.sentimentLabel}</p>
            {data.youtubeSentiment.positive.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs text-green-400">{insight}</p>
            ))}
            <p className="mt-2 font-semibold text-xs">Areas of Concern:</p>
            {data.youtubeSentiment.negative.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs text-red-400">{insight}</p>
            ))}
          </>
        );
      } else if (subName === "Facebook Sentiment") {
        return (
          <>
            <p className="font-bold mb-1">Facebook Sentiment Details</p>
            <p className="mb-1 text-xs">Sentiment: {data.facebookSentiment.sentimentLabel}</p>
            {data.facebookSentiment.positive.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs text-green-400">{insight}</p>
            ))}
            <p className="mt-2 font-semibold text-xs">Areas of Concern:</p>
            {data.facebookSentiment.negative.map((insight: string, i: number) => (
              <p key={i} className="mb-1 text-xs text-red-400">{insight}</p>
            ))}
          </>
        );
      }
    }
    // Fallback: just show the subconstruct description.
    return <p className="text-xs">{subName}</p>;
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
            Perception Analysis
          </h3>
          <p className="text-center font-medium">
            Measures how your brand is perceived across news media, social channels, and customer reviews.
          </p>
        </div>
        
        <p className="text-gray-700 mb-6">{data.details}</p>
        
        {/* Key Metrics Section with Tooltips */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-4">Key Metrics:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.subconstructs.map((sub: any, idx: number) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                  <span className="text-sm font-medium" style={{ color: getRingColor(sub.score) }}>{sub.score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 cursor-help group relative">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ width: `${sub.score}%`, backgroundColor: getRingColor(sub.score) }}
                  ></div>
                  <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs -top-44 w-72 left-1/2 transform -translate-x-1/2">
                    {renderTooltipContent(sub.name)}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{sub.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company-specific sentiment sections */}
        {companyId === 'pinnacle' ? (
          <>



            {/* Customer Reviews Section */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-md">
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-600 mr-2">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <h4 className="font-medium text-gray-800">Customer Reviews Analysis</h4>
              </div>
              <div className="text-sm text-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-white p-3 rounded-md shadow-sm text-center">
                    <p className="text-xs text-gray-500">Average Rating</p>
                    <p className="text-xl font-bold text-black">4.06/5</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm text-center">
                    <p className="text-xs text-gray-500">Sentiment Score</p>
                    <p className="text-xl font-bold text-black">66/100</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm text-center">
                    <p className="text-xs text-gray-500">Positive Reviews</p>
                    <p className="text-xl font-bold text-green-600">68%</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm text-center">
                    <p className="text-xs text-gray-500">Negative Reviews</p>
                    <p className="text-xl font-bold text-red-600">12%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-100 p-3 rounded-md">
                    <p className="font-medium text-green-800 mb-1">Positive Insights</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.customerReviews.positive.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">+</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-gray-800 mb-1">Neutral Insights</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.customerReviews.neutral.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-gray-500 mr-1">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="font-medium text-red-800 mb-1">Negative Insights</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.customerReviews.negative.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-500 mr-1">-</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* YouTube Sentiment Section */}
            <div className="mt-8 p-4 bg-gray-100 rounded-md">
              <div className="flex items-center mb-3">
                <FaYoutube className="text-red-600 mr-2" />
                <h4 className="font-medium text-gray-800">YouTube Reviews Analysis</h4>
              </div>
              <div className="text-sm text-gray-700">
                <p className="mb-2">Your YouTube sentiment score is <span className={themeColor}>60/100</span> with a <span className="font-medium">Neutral</span> overall sentiment.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="font-medium text-green-800 mb-1">Positive Highlights</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.youtubeSentiment.positive.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">+</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-gray-800 mb-1">Mixed Feedback</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.youtubeSentiment.neutral.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-gray-500 mr-1">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="font-medium text-red-800 mb-1">Areas of Concern</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.youtubeSentiment.negative.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-500 mr-1">-</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Facebook Sentiment Section */}
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <div className="flex items-center mb-3">
                <FaFacebook className="text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-800">Facebook Engagement Analysis</h4>
              </div>
              <div className="text-sm text-gray-700">
                <p className="mb-2">Your Facebook sentiment score is <span className={themeColor}>59/100</span> with a <span className="font-medium">Neutral</span> overall sentiment.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="font-medium text-green-800 mb-1">What Works Well</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.facebookSentiment.positive.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">+</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-gray-800 mb-1">Neutral Content</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.facebookSentiment.neutral.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-gray-500 mr-1">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="font-medium text-red-800 mb-1">Improvement Needed</p>
                    <ul className="text-xs space-y-1 text-gray-700">
                      {data.facebookSentiment.negative.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-500 mr-1">-</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}



        {/* Recommendations Section */}
        <div className="mt-8 p-5 bg-blue-50 rounded-md">
          <h4 className="font-medium text-blue-800 mb-3">Recommendations</h4>
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
      {companyId === "pinnacle" && (
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md mb-10">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowCompetitors(!showCompetitors)}
        >
          <h3 className="text-xl font-semibold text-gray-700">
            Competitor Analysis: Perception
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
                    <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
                    {companyId === 'pinnacle' ? (
                      <>
                        <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">News</th>
                        <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Social</th>
                      </>
                    ) : (
                      <>
                        <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">YouTube</th>
                        <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Facebook</th>
                      </>
                    )}
                    <th className="px-3 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.competitors.map((competitor: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-3 py-4 whitespace-nowrap font-medium">{competitor.name}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.score}</td>
                      {companyId === 'pinnacle' ? (
                        <>
                          <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.newsSentiment}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.socialSentiment}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.youTube}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-center">{competitor.facebook}</td>
                        </>
                      )}
                      <td className={`px-3 py-4 whitespace-nowrap text-center ${getStatusColor(competitor.status)}`}>{competitor.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Visual comparison - Bar chart */}
            <div className="mt-8">
              <h4 className="font-medium text-gray-700 mb-4">Visual Comparison: Perception Scores</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">{pinnacleData.name.split(' ')[0]}</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="h-4 rounded-full bg-red-500" 
                          style={{ width: `${data.overallScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{data.overallScore}</span>
                  </div>
                </div>
                
                {data.competitors.map((competitor: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">{competitor.name}</span>
                      <div className="flex-1 ml-2">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="h-4 rounded-full" 
                            style={{ 
                              width: `${competitor.score}%`,
                              backgroundColor: getRingColor(competitor.score)
                            }}
                          ></div>
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
      </div>)}
    </>
  );
};

export default PerceptionDetails;
