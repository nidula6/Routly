import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const FlowCard = ({ flow, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: flow.color + '15' }]}>
        <Ionicons name={flow.icon} size={28} color={flow.color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{flow.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{flow.description}</Text>
        <View style={styles.meta}>
          <View style={styles.stepCount}>
            <Ionicons name="layers-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.metaText}>{flow.steps.length} steps</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.gray400} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.base,
    color: COLORS.dark,
    marginBottom: 4,
    ...FONTS.semiBold,
  },
  description: {
    fontSize: SIZES.sm,
    color: COLORS.gray600,
    lineHeight: 18,
    marginBottom: 8,
    ...FONTS.regular,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: SIZES.xs,
    color: COLORS.gray500,
    ...FONTS.medium,
  },
});

export default FlowCard;
