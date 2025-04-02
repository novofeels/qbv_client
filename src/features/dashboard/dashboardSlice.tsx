import { createSlice } from '@reduxjs/toolkit';

// Define types for our state
interface SocialChannel {
  name: string;
  score: number;
  icon: string;
  color: string;
}

interface Competitor {
  name: string;
  score: number;
  status: string;
  traffic: number;
  engagement: number;
  social: number;
  keyStrengths: string[];
  areasForImprovement: string[];
}

interface Subconstruct {
  name: string;
  score: number;
  description: string;
}

interface ConstructData {
  score: number;
  traffic?: number;
  engagement?: number;
  social?: number;
  status: string;
  details?: string;
  socialChannels?: SocialChannel[];
  competitors?: Competitor[];
  subconstructs: Subconstruct[];
  recommendations: string[];
}

interface Construct {
  name: string;
  value: number;
  details: string;
  data: ConstructData | null;
}

interface DashboardState {
  currentCompanyId: string;
  pinnacleData: {
    name: string;
    overallScore: number;
    status: string;
    keyStrengths: string[];
    areasForImprovement: string[];
  };
  ghostcatData: {
    name: string;
    overallScore: number;
    status: string;
    keyStrengths: string[];
    areasForImprovement: string[];
  };
  awarenessData: ConstructData;
  ghostcatAwarenessData: ConstructData;
  placeholderData: {
    subconstructs: Subconstruct[];
    recommendations: string[];
  };
  constructs: Construct[];
  ghostcatConstructs: Construct[];
}

// Initial state based on the data from your component
const initialState: DashboardState = {
  currentCompanyId: 'pinnacle',
  
  // Pinnacle Financial Partners data
  pinnacleData: {
    name: "Pinnacle Financial Partners",
    overallScore: 11,
    status: "Critically Behind",
    keyStrengths: [
      "LinkedIn followers (40% of industry benchmark)"
    ],
    areasForImprovement: [
      "Nearly non-existent social media (1-2% of benchmarks)",
      "High bounce rate (194% of industry average)",
      "Very low website traffic (20% of benchmark)"
    ]
  },

  // Ghost-Cat E-Bikes data
  ghostcatData: {
    name: "Ghost-Cat Bikes",
    overallScore: 51,
    status: "Below Average",
    keyStrengths: [
      "Strong Instagram presence (12,500 followers)",
      "Good engagement metrics (low bounce rate)",
      "Growing social media audience (+8% MoM)"
    ],
    areasForImprovement: [
      "Very limited website traffic (14/100, lowest among competitors)",
      "Poor organic search visibility (28% of benchmark)",
      "Minimal presence on Facebook (929 followers) and X (15 followers)"
    ]
  },

  // Awareness data for Pinnacle
  awarenessData: {
    score: 11,
    traffic: 9,
    engagement: 18,
    social: 6,
    status: "Critically Behind",
    socialChannels: [
      { name: "LinkedIn", score: 40, icon: 'FaLinkedin', color: "#0077B5" },
      { name: "Facebook", score: 8, icon: 'FaFacebook', color: "#3B5998" },
      { name: "X", score: 5, icon: 'SiX', color: "#000000" },
      { name: "Instagram", score: 2, icon: 'FaInstagram', color: "#E1306C" }
    ],
    competitors: [
      {
        name: "Truist Bank",
        score: 87,
        status: "Strong Performer",
        traffic: 100,
        engagement: 67,
        social: 89,
        keyStrengths: [
          "445% of industry benchmark for website traffic",
          "359% of industry benchmark for Facebook followers",
          "332% of industry benchmark for LinkedIn followers"
        ],
        areasForImprovement: [
          "No significant weaknesses compared to industry benchmarks"
        ]
      },
      {
        name: "Regions Bank",
        score: 77,
        status: "Strong Performer",
        traffic: 85,
        engagement: 65,
        social: 77,
        keyStrengths: [
          "293% of industry benchmark for Facebook followers",
          "296% of industry benchmark for LinkedIn followers",
          "198% of industry benchmark for website traffic"
        ],
        areasForImprovement: [
          "Instagram presence (58% of industry benchmark)"
        ]
      },
      {
        name: "First Horizon",
        score: 44,
        status: "Below Average",
        traffic: 22,
        engagement: 87,
        social: 28,
        keyStrengths: [
          "197% of industry benchmark for pages per visit",
          "169% of industry benchmark for visitor time",
          "Low bounce rate (43% of industry average)"
        ],
        areasForImprovement: [
          "Weak Instagram presence (32% of benchmark)",
          "Low X following (34% of benchmark)",
          "Limited website traffic (54% of benchmark)"
        ]
      },
      {
        name: "Old National Bank",
        score: 26,
        status: "Underperformer",
        traffic: 11,
        engagement: 66,
        social: 7,
        keyStrengths: [
          "Decent user engagement metrics",
          "Low bounce rate (62% of industry average)"
        ],
        areasForImprovement: [
          "Very weak social media presence overall",
          "LinkedIn & Instagram only 3% of industry benchmarks",
          "Low website traffic (23% of benchmark)"
        ]
      }
    ],
    subconstructs: [
      { 
        name: "Website Traffic", 
        score: 20, 
        description: "Only 20% of industry benchmark for total visitors" 
      },
      { 
        name: "Bounce Rate", 
        score: 15, 
        description: "194% of industry average - visitors leave quickly" 
      },
      { 
        name: "Social Followers", 
        score: 10, 
        description: "Critically low follower counts across platforms" 
      },
      { 
        name: "Media Presence", 
        score: 8, 
        description: "Almost no presence in industry publications" 
      },
      { 
        name: "Brand Mentions", 
        score: 12, 
        description: "Very low mention volume across all channels" 
      }
    ],
    recommendations: [
      "Develop a comprehensive social media strategy starting with LinkedIn",
      "Implement analytics to understand why bounce rate is so high (194% of average)",
      "Invest in SEO to improve website traffic (currently only 20% of benchmark)",
      "Begin regular content publishing to increase brand mentions"
    ]
  },

  // Ghost-Cat Awareness data with real scores from the provided table
  ghostcatAwarenessData: {
    score: 51,
    traffic: 14,
    engagement: 54,
    social: 86,
    status: "Below Average",
    socialChannels: [
      { name: "Instagram", score: 89, icon: 'FaInstagram', color: "#E1306C" },
      { name: "Facebook", score: 10, icon: 'FaFacebook', color: "#3B5998" },
      { name: "X", score: 9, icon: 'SiX', color: "#000000" },
      { name: "LinkedIn", score: 0, icon: 'FaLinkedin', color: "#0077B5" }
    ],
    competitors: [
      {
        name: "Goat Power Bikes",
        score: 90,
        status: "Market Leader",
        traffic: 100,
        engagement: 69,
        social: 100,
        keyStrengths: [
          "Highest website traffic among competitors (251,489 visits)",
          "Strong social media presence (15,600 total followers)",
          "Leading market position in awareness metrics"
        ],
        areasForImprovement: [
          "Recent traffic decline (-38.76% monthly change)",
          "Could improve engagement metrics (69/100)"
        ]
      },
      {
        name: "E-Cells",
        score: 58,
        status: "Average Performer",
        traffic: 43,
        engagement: 50,
        social: 80,
        keyStrengths: [
          "Strong Facebook presence (9,700 followers)",
          "Decent website traffic with positive growth (+16.49%)",
          "Balanced performance across metrics"
        ],
        areasForImprovement: [
          "High bounce rate (51.01%)",
          "Below average engagement metrics"
        ]
      },
      {
        name: "Wired-Freedom",
        score: 40,
        status: "Below Average",
        traffic: 62,
        engagement: 58,
        social: 0,
        keyStrengths: [
          "Good website traffic (155,032 visits)",
          "Positive traffic growth trend (+24.67%)",
          "Decent engagement metrics"
        ],
        areasForImprovement: [
          "No social media presence at all",
          "Missing important marketing channels"
        ]
      },
      {
        name: "Philodo",
        score: 41,
        status: "Below Average",
        traffic: 10,
        engagement: 100,
        social: 14,
        keyStrengths: [
          "Exceptional engagement metrics (best in class)",
          "Excellent visit duration (7:13 minutes)",
          "Very low bounce rate (22.38%)"
        ],
        areasForImprovement: [
          "Very low website traffic (26,083 visits)",
          "Limited social presence (mainly on Facebook)",
          "Overall awareness challenges"
        ]
      },
      {
        name: "Meelod",
        score: 28,
        status: "Underperformer",
        traffic: 23,
        engagement: 50,
        social: 12,
        keyStrengths: [
          "Positive traffic growth trend (+46.91%)",
          "Balanced desktop/mobile traffic",
          "Average engagement metrics"
        ],
        areasForImprovement: [
          "Low website traffic overall",
          "Very limited social media presence",
          "Needs fundamental awareness improvements"
        ]
      }
    ],
    subconstructs: [
      { 
        name: "Website Traffic", 
        score: 14, 
        description: "Very low traffic volume (14/100, lowest among competitors)" 
      },
      { 
        name: "Social Media Presence", 
        score: 86, 
        description: "Strong on Instagram (12,500 followers), minimal presence on other platforms" 
      },
      { 
        name: "Engagement Metrics", 
        score: 54, 
        description: "Good bounce rate (34.83%), average time on site" 
      },
      { 
        name: "Brand Search Volume", 
        score: 32, 
        description: "Limited organic search visibility for brand terms" 
      },
      { 
        name: "Industry Visibility", 
        score: 40, 
        description: "Below average presence in industry publications and forums" 
      }
    ],
    recommendations: [
      "Prioritize website traffic growth through SEO and marketing campaigns",
      "Leverage Instagram success to drive traffic to website",
      "Develop Facebook strategy to increase followers (currently only 929)",
      "Consider establishing LinkedIn presence for B2B opportunities",
      "Implement content marketing to improve organic search visibility"
    ]
  },

  // Placeholder data stays the same
  placeholderData: {
    subconstructs: [
      { name: "Subconstruct 1", score: 35, description: "Description goes here" },
      { name: "Subconstruct 2", score: 30, description: "Description goes here" },
      { name: "Subconstruct 3", score: 25, description: "Description goes here" },
      { name: "Subconstruct 4", score: 20, description: "Description goes here" }
    ],
    recommendations: [
      "Recommendation 1 goes here",
      "Recommendation 2 goes here",
      "Recommendation 3 goes here"
    ]
  },

  // Main construct data - Pinnacle
  constructs: [
    { 
      name: "Awareness", 
      value: 11, // awarenessData.score
      details: "Your brand awareness is critically low compared to competitors. This measures how visible your brand is across digital channels including website traffic, social media, and media mentions.",
      data: null // Will be populated on initialization
    },
    { 
      name: "Perception", 
      value: 62, 
      details: "Brand perception measures how your brand is viewed by customers and the market. Your score indicates significant challenges in brand sentiment and market positioning.",
      data: null // Will be populated on initialization
    },
    { 
      name: "Competition", 
      value: 18, 
      details: "This measures how your brand performs against direct competitors in your market. Your competitive position is significantly weaker than major players in your industry.",
      data: null // Will be populated on initialization
    },

  ],

  // Ghost-Cat constructs using real data from the table provided
  ghostcatConstructs: [
    { 
      name: "Awareness", 
      value: 51,
      details: "Your brand awareness is below average compared to top competitors. Your social media presence is strong, but website traffic is very limited and needs significant improvement.",
      data: null // Will be populated on initialization
    },
    { 
      name: "Perception", 
      value: 60, 
      details: "Brand perception measures how your brand is viewed by customers and the market. Your score indicates room for improvement in brand sentiment and customer perception.",
      data: null // Will be populated on initialization
    },
    { 
      name: "Competition", 
      value: 32, 
      details: "This measures how your brand performs against direct competitors in your market. Your position is below industry leaders but showing potential for growth.",
      data: null // Will be populated on initialization
    },
    

  ]
};

// Helper function to populate the construct data
const populateConstructData = (state: DashboardState) => {
  // Deep copy to avoid reference issues
  const newPinnacleConstructs = JSON.parse(JSON.stringify(state.constructs));
  const newGhostcatConstructs = JSON.parse(JSON.stringify(state.ghostcatConstructs));
  
  // Populate the data for each Pinnacle construct
  newPinnacleConstructs[0].data = state.awarenessData;
  newPinnacleConstructs[1].data = {...state.placeholderData, score: 62, status: "Above Industry Average"};
  newPinnacleConstructs[2].data = {...state.placeholderData, score: 18, status: "Critically Behind"};

  
  // Populate the data for each Ghost-Cat construct
  newGhostcatConstructs[0].data = state.ghostcatAwarenessData;
  newGhostcatConstructs[1].data = {...state.placeholderData, score: 60, status: "Average"};
  newGhostcatConstructs[2].data = {...state.placeholderData, score: 32, status: "Below Average"};

  
  return { pinnacle: newPinnacleConstructs, ghostcat: newGhostcatConstructs };
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: (() => {
    // Initialize with populated constructs
    const state = {...initialState};
    const populatedConstructs = populateConstructData(state);
    state.constructs = populatedConstructs.pinnacle;
    state.ghostcatConstructs = populatedConstructs.ghostcat;
    return state;
  })(),
  reducers: {
    // Add a reducer to switch current company
    setCurrentCompany: (state, action) => {
      state.currentCompanyId = action.payload;
    },
    updatePinnacleData: (state, action) => {
      state.pinnacleData = action.payload;
    },
    updateGhostcatData: (state, action) => {
      state.ghostcatData = action.payload;
    },
    updateAwarenessData: (state, action) => {
      state.awarenessData = action.payload;
      // Update the corresponding construct as well
      state.constructs[0].data = action.payload;
      state.constructs[0].value = action.payload.score;
    },
    updateGhostcatAwarenessData: (state, action) => {
      state.ghostcatAwarenessData = action.payload;
      // Update the corresponding construct as well
      state.ghostcatConstructs[0].data = action.payload;
      state.ghostcatConstructs[0].value = action.payload.score;
    },
    updateConstruct: (state, action) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.constructs.length) {
        state.constructs[index].data = data;
        state.constructs[index].value = data.score;
      }
    },
    updateGhostcatConstruct: (state, action) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.ghostcatConstructs.length) {
        state.ghostcatConstructs[index].data = data;
        state.ghostcatConstructs[index].value = data.score;
      }
    }
  }
});

export const { 
  setCurrentCompany,
  updatePinnacleData, 
  updateGhostcatData,
  updateAwarenessData, 
  updateGhostcatAwarenessData,
  updateConstruct,
  updateGhostcatConstruct
} = dashboardSlice.actions;

export default dashboardSlice.reducer;