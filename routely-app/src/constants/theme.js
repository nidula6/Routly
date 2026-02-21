// ROUTELY App Theme Constants
export const COLORS = {
  primary: '#4F46E5',       // Indigo - main brand
  primaryDark: '#3730A3',
  primaryLight: '#818CF8',
  primaryBg: '#EEF2FF',
  
  secondary: '#059669',     // Emerald - success/driver
  secondaryDark: '#047857',
  secondaryLight: '#34D399',
  secondaryBg: '#ECFDF5',
  
  accent: '#F59E0B',        // Amber - warnings/highlights
  accentDark: '#D97706',
  accentLight: '#FCD34D',
  accentBg: '#FFFBEB',
  
  danger: '#EF4444',        // Red - errors/alerts
  dangerDark: '#DC2626',
  dangerLight: '#FCA5A5',
  dangerBg: '#FEF2F2',
  
  info: '#3B82F6',          // Blue - information
  infoBg: '#EFF6FF',
  
  dark: '#111827',
  gray900: '#1F2937',
  gray800: '#374151',
  gray700: '#4B5563',
  gray600: '#6B7280',
  gray500: '#9CA3AF',
  gray400: '#D1D5DB',
  gray300: '#E5E7EB',
  gray200: '#F3F4F6',
  gray100: '#F9FAFB',
  white: '#FFFFFF',
  
  background: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  
  // Flow-specific colors
  flowCourier: '#7C3AED',     // Purple for courier flow
  flowDirectional: '#059669', // Green for directional flow
  flowDriver: '#2563EB',     // Blue for driver flow
  flowPickup: '#D97706',     // Amber for pickup flow
  flowDelivery: '#DC2626',   // Red for delivery flow
  flowPayment: '#7C3AED',    // Purple for payment flow
  flowRating: '#F59E0B',     // Yellow for rating flow
};

export const SIZES = {
  // Font sizes
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  title: 36,
  
  // Spacing
  padding: 16,
  paddingSm: 8,
  paddingLg: 24,
  paddingXl: 32,
  margin: 16,
  marginSm: 8,
  marginLg: 24,
  
  // Border radius
  radius: 12,
  radiusSm: 8,
  radiusLg: 16,
  radiusXl: 24,
  radiusFull: 999,
  
  // Component sizes
  buttonHeight: 52,
  inputHeight: 48,
  iconSize: 24,
  iconSizeSm: 20,
  iconSizeLg: 32,
};

export const FONTS = {
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semiBold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  extraBold: { fontWeight: '800' },
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
