import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const StatusBadge = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'confirmed': return { bg: COLORS.secondaryBg, color: COLORS.secondary, label: 'Confirmed' };
      case 'pending': return { bg: COLORS.accentBg, color: COLORS.accent, label: 'Pending' };
      case 'in-transit': return { bg: COLORS.infoBg, color: COLORS.info, label: 'In Transit' };
      case 'delivered': return { bg: COLORS.secondaryBg, color: COLORS.secondary, label: 'Delivered' };
      case 'cancelled': return { bg: COLORS.dangerBg, color: COLORS.danger, label: 'Cancelled' };
      case 'disputed': return { bg: COLORS.dangerBg, color: COLORS.danger, label: 'Disputed' };
      case 'awaiting-match': return { bg: COLORS.primaryBg, color: COLORS.primary, label: 'Awaiting Match' };
      case 'matched': return { bg: COLORS.secondaryBg, color: COLORS.secondary, label: 'Matched' };
      case 'verified': return { bg: COLORS.secondaryBg, color: COLORS.secondary, label: 'Verified' };
      case 'unverified': return { bg: COLORS.accentBg, color: COLORS.accent, label: 'Unverified' };
      case 'escrow': return { bg: COLORS.primaryBg, color: COLORS.primary, label: 'In Escrow' };
      case 'released': return { bg: COLORS.secondaryBg, color: COLORS.secondary, label: 'Released' };
      default: return { bg: COLORS.gray200, color: COLORS.gray600, label: status };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, size === 'sm' && styles.badgeSm]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.text, { color: config.color }, size === 'sm' && styles.textSm]}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
  },
  textSm: {
    fontSize: 10,
  },
});

export default StatusBadge;
