import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const StepCard = ({ step, index, total, isActive, onPress, flowColor }) => {
  const getActorColor = (actor) => {
    switch (actor) {
      case 'Sender': return COLORS.primary;
      case 'Driver': return COLORS.secondary;
      case 'System': return COLORS.info;
      case 'Both': return COLORS.accent;
      case 'Recipient': return '#8B5CF6';
      case 'Admin': return COLORS.danger;
      default: return COLORS.gray600;
    }
  };

  const getActorIcon = (actor) => {
    switch (actor) {
      case 'Sender': return 'person';
      case 'Driver': return 'car';
      case 'System': return 'cog';
      case 'Both': return 'people';
      case 'Recipient': return 'home';
      case 'Admin': return 'shield';
      default: return 'ellipse';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, isActive && { borderLeftColor: flowColor || COLORS.primary }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Step number badge */}
      <View style={[styles.stepBadge, { backgroundColor: flowColor || COLORS.primary }]}>
        <Text style={styles.stepNumber}>{index + 1}</Text>
      </View>

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.stepId}>Step {step.id}</Text>
          <View style={[styles.actorBadge, { backgroundColor: getActorColor(step.actor) + '15' }]}>
            <Ionicons name={getActorIcon(step.actor)} size={12} color={getActorColor(step.actor)} />
            <Text style={[styles.actorText, { color: getActorColor(step.actor) }]}>{step.actor}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{step.title}</Text>

        {/* Description */}
        <Text style={styles.description}>{step.description}</Text>

        {/* Connection line */}
        {index < total - 1 && (
          <View style={styles.connectorContainer}>
            <View style={[styles.connectorLine, { backgroundColor: flowColor || COLORS.primary }]} />
            <Ionicons name="chevron-down" size={16} color={flowColor || COLORS.primary} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gray300,
    ...SHADOWS.md,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    color: COLORS.white,
    fontSize: SIZES.sm,
    ...FONTS.bold,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepId: {
    fontSize: SIZES.xs,
    color: COLORS.gray500,
    ...FONTS.medium,
  },
  actorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  actorText: {
    fontSize: SIZES.xs,
    ...FONTS.medium,
  },
  title: {
    fontSize: SIZES.base,
    color: COLORS.dark,
    marginBottom: 6,
    ...FONTS.semiBold,
  },
  description: {
    fontSize: SIZES.sm,
    color: COLORS.gray600,
    lineHeight: 18,
    ...FONTS.regular,
  },
  connectorContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  connectorLine: {
    width: 2,
    height: 16,
    borderRadius: 1,
  },
});

export default StepCard;
