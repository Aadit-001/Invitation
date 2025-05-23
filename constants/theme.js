const COLORS = {
  primary: "#C67C4E", // Orange/brown accent
  primaryLight: "#CF8A56", // Lighter orange
  primaryDark: "#A05A2F", // Darker orange
  accent: "#FF5757", // Red accent
  headerDark: "#1F1F1F", // Dark header background
  headerLight: "#2A2A2A", // Slightly lighter header
  uiDark: "#333333", // Dark UI elements
  uiDarkBorder: "#444444", // Dark UI borders
  textLight: "#FFFFFF", // White text
  textDark: "#232323", // Almost black text
  textGrey: "#999999", // Grey text
  backgroundLight: "#FFFFFF", // White background
  cardBorder: "#F0F0F0", // Light border for cards
};

const GRADIENTS = {
  header: [COLORS.headerLight, COLORS.headerDark],
  primaryButton: [COLORS.primaryLight, COLORS.primary, COLORS.primaryDark],
  categorySelected: [COLORS.primaryLight, COLORS.primary],
  categoryNormal: ["#F5F5F5", "#EDEDED"],
};

export { COLORS, GRADIENTS };
