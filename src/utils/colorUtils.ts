// src/utils/colorUtils.ts

/**
 * Utility function: red→green gradient based on score 0–100
 * @param score - Number between 0 and 100
 * @returns HSL color string
 */
export function getRingColor(score: number): string {
    const hue = (score / 100) * 120; 
    return `hsl(${hue}, 100%, 45%)`;
  }
  
  /**
   * Utility function to get status color class
   * @param status - Status string
   * @returns Tailwind color class
   */
  export function getStatusColor(status: string): string {
    switch(status) {
      case "Strong Performer": return "text-green-600";
      case "Below Average": return "text-yellow-600";
      case "Underperformer": return "text-orange-600";
      case "Critically Behind": return "text-red-600";
      default: return "text-gray-600";
    }
  }