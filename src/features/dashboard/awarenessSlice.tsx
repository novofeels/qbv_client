// src/features/dashboard/awarenessSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type SocialChannel = {
  name: string;
  score: number;
  iconName: string; // Changed from icon: any to iconName: string
  color: string;
  followers: number;
  competitorData: {
    [key: string]: string;
  };
};

// Adding missing types based on usage in initialState
export type TrafficMetric = {
  name: string;
  value: number;
  benchmark: number;
  percentOfBenchmark: number;
};

export type Subconstruct = {
  name: string;
  score: number;
  details: string;
  status: string;
};

export type CompetitorPositioning = {
  yourPosition: number;
  average: number;
  competitors: {
    name: string;
    value: number;
  }[];
};

export type Competitor = {
  name: string;
  score: number;
  status: string;
  traffic: number;
  engagement: number;
  social: number;
  keyStrengths: string[];
  areasForImprovement: string[];
};

export interface AwarenessState {
  score: number;
  traffic: number;
  engagement: number;
  social: number;
  status: string;
  details: string;
  socialChannels: SocialChannel[];
  trafficMetrics: TrafficMetric[];
  subconstructs: Subconstruct[];
  recommendations: string[];
  competitorPositioning: {
    awareness: CompetitorPositioning;
    traffic: CompetitorPositioning;
    engagement: CompetitorPositioning;
    social: CompetitorPositioning;
  };
  competitors: Competitor[];
  isLoading: boolean;
  error: string | null;
}

// Initial state with Pinnacle Financial Partners data
const initialState: AwarenessState = {
  score: 11,
  traffic: 9,
  engagement: 18,
  social: 6,
  status: "Critically Behind",
  details: "Your brand awareness is critically low compared to competitors. This measures how visible your brand is across digital channels including website traffic, social media, and media mentions.",
  
  // Social channel data for Pinnacle
  socialChannels: [
    { 
      name: "LinkedIn", 
      score: 40, 
      iconName: "linkedin", // Changed from icon: FaLinkedin
      color: "#0077B5",
      followers: 20200,
      competitorData: {
        "Top Performer": "166,000",
        "Industry Average": "~51,000",
        "Your Position": "Bottom 10%"
      }
    },
    { 
      name: "Facebook", 
      score: 8, 
      iconName: "facebook", // Changed from icon: FaFacebook
      color: "#3B5998",
      followers: 354,
      competitorData: {
        "Top Performer": "359,300",
        "Industry Average": "~85,000",
        "Your Position": "Bottom 5%"
      }
    },
    { 
      name: "X", 
      score: 5, 
      iconName: "x", // Changed from icon: SiX
      color: "#000000",
      followers: 207,
      competitorData: {
        "Top Performer": "23,600",
        "Industry Average": "~8,000", 
        "Your Position": "Bottom 5%"
      }
    },
    { 
      name: "Instagram", 
      score: 2, 
      iconName: "instagram", // Changed from icon: FaInstagram
      color: "#E1306C",
      followers: 520,
      competitorData: {
        "Top Performer": "14,500",
        "Industry Average": "~5,000",
        "Your Position": "Bottom 5%"
      }
    }
  ],
  
  // Assuming these are the same from your original state
  trafficMetrics: [],
  subconstructs: [],
  recommendations: [],
  competitorPositioning: {
    awareness: { yourPosition: 0, average: 0, competitors: [] },
    traffic: { yourPosition: 0, average: 0, competitors: [] },
    engagement: { yourPosition: 0, average: 0, competitors: [] },
    social: { yourPosition: 0, average: 0, competitors: [] }
  },
  
  competitors: [
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
        "Low X following (34% of benchmark)", // Updated from Twitter to X
        "Limited website traffic (54% of benchmark)"
      ]
    },
    // Fill in other competitors from your original state
  ],
  
  isLoading: false,
  error: null
};

// Create the slice
const awarenessSlice = createSlice({
  name: 'awareness',
  initialState,
  reducers: {
    fetchAwarenessStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchAwarenessSuccess(state, action: PayloadAction<Omit<AwarenessState, 'isLoading' | 'error'>>) {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: null
      };
    },
    fetchAwarenessFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});

export const {
  fetchAwarenessStart,
  fetchAwarenessSuccess,
  fetchAwarenessFailure
} = awarenessSlice.actions;

export default awarenessSlice.reducer;