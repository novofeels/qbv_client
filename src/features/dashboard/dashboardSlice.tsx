import { createSlice } from '@reduxjs/toolkit';

// Initial state based on the data from your component
const initialState = {
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

  // Awareness data
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

  // Placeholder data for other constructs
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

  // Main construct data
  constructs: [
    { 
      name: "Awareness", 
      value: 11, // awarenessData.score
      details: "Your brand awareness is critically low compared to competitors. This measures how visible your brand is across digital channels including website traffic, social media, and media mentions.",
      data: null // Will be populated on initialization
    },
    { 
      name: "Perception", 
      value: 15, 
      details: "Brand perception measures how your brand is viewed by customers and the market. Your score indicates significant challenges in brand sentiment and market positioning.",
      data: null // Will be populated on initialization
    },
    { 
      name: "Competition", 
      value: 18, 
      details: "This measures how your brand performs against direct competitors in your market. Your competitive position is significantly weaker than major players in your industry.",
      data: null // Will be populated on initialization
    },
    { 
      name: "Insight", 
      value: 8, 
      details: "The insight score measures the effectiveness of your data collection and how well you understand your customers. Your score indicates a critical lack of customer insights.",
      data: null // Will be populated on initialization
    }
  ]
};

// Helper function to populate the construct data
const populateConstructData = (state) => {
  // Deep copy to avoid reference issues
  const newConstructs = JSON.parse(JSON.stringify(state.constructs));
  
  // Populate the data for each construct
  newConstructs[0].data = state.awarenessData;
  newConstructs[1].data = {...state.placeholderData, score: 15, status: "Critically Behind"};
  newConstructs[2].data = {...state.placeholderData, score: 18, status: "Critically Behind"};
  newConstructs[3].data = {...state.placeholderData, score: 8, status: "Critically Behind"};
  
  return newConstructs;
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: (() => {
    // Initialize with populated constructs
    const state = {...initialState};
    state.constructs = populateConstructData(state);
    return state;
  })(),
  reducers: {
    updatePinnacleData: (state, action) => {
      state.pinnacleData = action.payload;
    },
    updateAwarenessData: (state, action) => {
      state.awarenessData = action.payload;
      // Update the corresponding construct as well
      state.constructs[0].data = action.payload;
      state.constructs[0].value = action.payload.score;
    },
    updateConstruct: (state, action) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.constructs.length) {
        state.constructs[index].data = data;
        state.constructs[index].value = data.score;
      }
    }
  }
});

export const { updatePinnacleData, updateAwarenessData, updateConstruct } = dashboardSlice.actions;

export default dashboardSlice.reducer;