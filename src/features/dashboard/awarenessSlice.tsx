// src/features/dashboard/awarenessSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

// Types
export type SocialChannel = {
  name: string;
  score: number;
  icon: any; // Using any for React icons
  color: string;
  followers: number;
  competitorData: {
    [key: string]: string;
  };
};

// Rest of your types remain the same

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
      icon: FaLinkedin, 
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
      icon: FaFacebook, 
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
      icon: SiX, 
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
      icon: FaInstagram, 
      color: "#E1306C",
      followers: 520,
      competitorData: {
        "Top Performer": "14,500",
        "Industry Average": "~5,000",
        "Your Position": "Bottom 5%"
      }
    }
  ],
  
  // Traffic metrics and other data remain the same

  // Make sure to update any Twitter references in competitors section
  competitors: [
    // ...other competitors remain the same
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
    // ...other competitors remain the same
  ],
  
  // Rest of the state is the same
};

// Create the slice
const awarenessSlice = createSlice({
  name: 'awareness',
  initialState,
  reducers: {
    // Reducers remain the same
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