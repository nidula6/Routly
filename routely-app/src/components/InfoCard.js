import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const InfoCard = ({ title, value, icon, color = COLORS.primary, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 14,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: SIZES.xl,
    color: COLORS.dark,
    ...FONTS.bold,
  },
  title: {
    fontSize: SIZES.xs,
    color: COLORS.gray500,
    marginTop: 2,
    textAlign: 'center',
    ...FONTS.medium,
  },
  subtitle: {
    fontSize: 10,
    color: COLORS.secondary,
    marginTop: 2,
    ...FONTS.medium,
  },
});

export default InfoCard;
