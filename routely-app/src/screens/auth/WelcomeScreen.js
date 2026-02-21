import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

const onboardingSlides = [
  {
    title: 'Welcome to ROUTELY',
    subtitle: 'Sri Lanka\'s first intelligent delivery platform',
    description: 'Compare couriers, save up to 50% with directional delivery, and track every parcel in real-time.',
    icon: 'cube-outline',
    color: COLORS.primary,
  },
  {
    title: 'Courier Comparison',
    subtitle: 'Find the best price & reliability',
    description: 'Compare prices from all major couriers (Domex, Koombiyo, PromptXP) with route-specific performance data powered by our Performance Intelligence Engine.',
    icon: 'git-compare-outline',
    color: '#7C3AED',
  },
  {
    title: 'Directional Delivery',
    subtitle: 'Save 30-50% on intercity parcels',
    description: 'Your parcel travels with a driver already heading your way. Colombo to Kandy for as low as LKR 280 instead of LKR 650.',
    icon: 'navigate-outline',
    color: COLORS.secondary,
  },
  {
    title: 'Multi-Layer Security',
    subtitle: 'QR + OTP + Photo + Insurance',
    description: 'Triple verification at every handover. QR scanning, 6-digit OTP, timestamped photos, GPS tracking, and insurance coverage up to LKR 25,000.',
    icon: 'shield-checkmark-outline',
    color: COLORS.accent,
  },
];

const WelcomeScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('RoleSelection');
    }
  };

  const slide = onboardingSlides[currentSlide];

  return (
    <View style={styles.container}>
      {/* Skip button */}
      <TouchableOpacity 
        style={styles.skipBtn} 
        onPress={() => navigation.replace('RoleSelection')}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: slide.color + '15' }]}>
          <View style={[styles.iconInner, { backgroundColor: slide.color + '25' }]}>
            <Ionicons name={slide.icon} size={64} color={slide.color} />
          </View>
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={[styles.subtitle, { color: slide.color }]}>{slide.subtitle}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      {/* Dots & Button */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          {onboardingSlides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentSlide && { backgroundColor: slide.color, width: 24 },
              ]}
            />
          ))}
        </View>

        <Button
          title={currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
          onPress={nextSlide}
          style={{ width: '100%', backgroundColor: slide.color }}
        />

        {currentSlide === 0 && (
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginBold}>Log In</Text></Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingLg,
    paddingTop: 60,
  },
  skipBtn: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  skipText: {
    fontSize: SIZES.md,
    color: COLORS.gray500,
    ...FONTS.medium,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  iconInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.xxxl,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 8,
    ...FONTS.bold,
  },
  subtitle: {
    fontSize: SIZES.lg,
    textAlign: 'center',
    marginBottom: 16,
    ...FONTS.semiBold,
  },
  description: {
    fontSize: SIZES.md,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
    ...FONTS.regular,
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray300,
  },
  loginLink: {
    marginTop: 16,
    padding: 8,
  },
  loginText: {
    fontSize: SIZES.md,
    color: COLORS.gray600,
  },
  loginBold: {
    color: COLORS.primary,
    ...FONTS.semiBold,
  },
});

export default WelcomeScreen;
