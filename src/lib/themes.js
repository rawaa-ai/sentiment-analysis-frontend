export const colorSchemes = {
    dark: {
      name: "Dark",
      backgroundColor: "#1e1e1e",
      textColor: "#ffffff",
      gaugeColors: [
        "#c0392b", "#d1422d", "#dd5335", "#e7683f",
        "#ee8b4a", "#f5ae57",
        "#a5c35b", "#7fbc59", "#5ab657", "#34b055"
      ],
      needleColor: "#ffffff",
      tickerColor: "rgba(45, 202, 186, 0.28)",
      topFillColor1: 'rgba(38, 166, 154, 0.28)',
      topFillColor2: 'rgba(38, 166, 154, 0.05)',
      bottomLineColor: 'rgba(239, 83, 80, 1)',
      bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
      headingColor: "#ffffff",
      selectedButton: "orange",
      relevance: "text-orange-500",
      relevanceLow: "text-white",
      longTerm: "text-green-500",
      longTermLow: "text-red-500",
      shortTerm: "text-green-500",
      shortTermLow: "text-red-500",
      importanceColor: "text-red-500",
      importanceLow: "text-orange-400",
      importanceLow2: "text-gray-300",
      sentimentTicker: "orange",
      stockTicker: "white",
      iconBorder: "#ffffff",
      prediction: "blue",
      customPrediction: "purple",
      dashboardChartLineColor: "white",
      dashboardChartLowColor: "#F25C54",
      dashboardChartHighColor: "#3ADB76",
  
      heatmapGradients: {
        negative: ["#992029", "#f23645"], // bright → deep red
        neutral: "#888888",               // mid gray
        positive: ["#056636", "#42bc7f"], // deep → bright green
      },
    },
  
    light: {
      name: "Light",
      backgroundColor: "white",
      textColor: "black",
      gaugeColors: [
        "#c0392b", "#d1422d", "#dd5335", "#e7683f",
        "#ee8b4a", "#f5ae57",
        "#a5c35b", "#7fbc59", "#5ab657", "#34b055"
      ],
      needleColor: "#1e1e1e",
      tickerColor: "rgba(4, 56, 63, 0.63)",
      topFillColor1: 'rgba(38, 166, 154, 0.28)',
      topFillColor2: 'rgba(38, 166, 154, 0.05)',
      bottomLineColor: 'rgba(239, 83, 80, 1)',
      bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
      headingColor: "#1e1e1e",
      selectedButton: "orange",
      relevance: "text-orange-500",
      relevanceLow: "text-black",
      longTerm: "text-green-500",
      longTermLow: "text-red-500",
      shortTerm: "text-green-500",
      shortTermLow: "text-red-500",
      importanceColor: "text-red-500",
      importanceLow: "text-orange-400",
      importanceLow2: "text-gray-300",
      sentimentTicker: "orange",
      stockTicker: "black",
      iconBorder: "#000000",
      prediction: "blue",
      customPrediction: "purple",
      dashboardChartLineColor: "black",
      dashboardChartLowColor: "#F25C54",
      dashboardChartHighColor: "#3ADB76",
  
      
      heatmapGradients: {
        negative: ["#992029", "#f23645"], // bright → deep red
        neutral: "#888888",               // mid gray
        positive: ["#056636", "#42bc7f"], // deep → bright green
      },
    },
  
    green: {
      name: "Green",
      backgroundColor: "#05171b",
      textColor: "#1b7a81ff",
      gaugeColors: [
        "#001f22","#012c30","#02464f","#036a71","#0d868aff",
        "#048c92","#036a71","#02464f","#012c30","#001f22"
      ],
      needleColor: "#d2f7ff",
      tickerColor: "#195065",
      topFillColor1: "#06ACB2",
      topFillColor2: "rgba(146, 228, 220, 0)",
      bottomLineColor: "#06ACB2",
      bottomFillColor1: "rgba(38, 166, 154, 0.28)",
      bottomFillColor2: "rgba(146, 228, 220, 0)",
      headingColor: "#95C5CF",
      selectedButton: "rgba(19, 250, 227, 0.28)",
      relevance: "text-[rgba(124, 224, 214, 0.7)]",
      relevanceLow: "text-[rgba(124, 224, 214, 0.7)]",
      longTerm: "text-[rgba(124, 224, 214, 0.7)]",
      longTermLow: "text-[rgba(124, 224, 214, 0.7)]",
      shortTerm: "text-[rgba(124, 224, 214, 0.7)]",
      shortTermLow: "text-[rgba(124, 224, 214, 0.7)]",
      importanceColor: "text-[rgba(124, 224, 214, 0.7)]",
      importanceLow: "text-[rgba(124, 224, 214, 0.7)]",
      importanceLow2: "text-[rgba(124, 224, 214, 0.7)]",
      sentimentTicker: "rgba(19, 250, 227, 0.28)",
      stockTicker: "rgba(124, 224, 214, 0.7)",
      iconBorder: "#02464f",
      prediction: "rgba(15, 143, 130, 0.7)",
      customPrediction: "rgba(76, 97, 95, 0.7)",
      dashboardChartLineColor: "#036a71",
      dashboardChartLowColor: "#04a9aff6",
      dashboardChartHighColor: "#195065",
  
      heatmapGradients: {
        negative: ["#0d1f23", "#02464f"],     // dark teal → deeper cyan
        neutral: "#036a71",                   // mid teal
        positive: ["#19fae3", "#9efff9"],     // neon aqua → neon mint
      },
    },
  };
  