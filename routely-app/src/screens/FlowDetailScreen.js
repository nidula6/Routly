import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { PROCESS_FLOWS } from '../constants/processFlows';
import StepCard from '../components/StepCard';

const FlowDetailScreen = ({ route, navigation }) => {
  const { flowId } = route.params;
  const flow = PROCESS_FLOWS.find((f) => f.id === flowId);

  if (!flow) {
    return (
      <View style={styles.container}>
        <Text style={{ padding: 20 }}>Flow not found</Text>
      </View>
    );
  }

  const flowColors = {
    'onboarding': COLORS.primary,
    'courier-booking': COLORS.info,
    'directional-booking': COLORS.secondary,
    'driver-route': COLORS.accent,
    'pickup-verification': '#E67E22',
    'delivery-confirmation': COLORS.secondary,
    'payment-settlement': '#8E44AD',
    'rating-feedback': COLORS.accent,
  };

  const color = flowColors[flowId] || COLORS.primary;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.headerBg, { backgroundColor: color }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{flow.title}</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.headerDesc}>{flow.description}</Text>
        <View style={styles.headerStats}>
          <View style={styles.hStat}>
            <Text style={styles.hStatVal}>{flow.steps.length}</Text>
            <Text style={styles.hStatLabel}>Steps</Text>
          </View>
          <View style={styles.hStatDivider} />
          <View style={styles.hStat}>
            <Text style={styles.hStatVal}>{[...new Set(flow.steps.map((s) => s.actor))].length}</Text>
            <Text style={styles.hStatLabel}>Actors</Text>
          </View>
          <View style={styles.hStatDivider} />
          <View style={styles.hStat}>
            <Text style={styles.hStatVal}>{flowId.split('-')[0].toUpperCase()}</Text>
            <Text style={styles.hStatLabel}>Category</Text>
          </View>
        </View>
      </View>

      {/* Actors involved */}
      <View style={styles.actorsCard}>
        <Text style={styles.actorsTitle}>Actors Involved</Text>
        <View style={styles.actorsRow}>
          {[...new Set(flow.steps.map((s) => s.actor))].map((actor) => {
            const actorConfig = {
              Sender: { icon: 'person', color: COLORS.primary },
              Driver: { icon: 'car', color: COLORS.secondary },
              System: { icon: 'server', color: COLORS.info },
              Both: { icon: 'people', color: COLORS.accent },
              Recipient: { icon: 'home', color: COLORS.accent },
              Admin: { icon: 'shield', color: COLORS.danger },
            };
            const config = actorConfig[actor] || { icon: 'ellipse', color: COLORS.gray500 };
            return (
              <View key={actor} style={styles.actorChip}>
                <Ionicons name={config.icon} size={16} color={config.color} />
                <Text style={[styles.actorText, { color: config.color }]}>{actor}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Steps */}
      <View style={styles.stepsSection}>
        <Text style={styles.stepsTitle}>Process Steps</Text>
        {flow.steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            index={index}
            totalSteps={flow.steps.length}
            color={color}
          />
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Ionicons name="checkmark-done-circle" size={32} color={color} />
        <Text style={styles.summaryTitle}>Flow Complete</Text>
        <Text style={styles.summaryText}>
          This flow covers {flow.steps.length} steps involving {[...new Set(flow.steps.map((s) => s.actor))].join(', ')}. Each step includes validation, security checks, and user feedback.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerBg: {
    paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12,
  },
  headerTitle: { fontSize: SIZES.xl, color: COLORS.white, ...FONTS.bold },
  headerDesc: { fontSize: SIZES.sm, color: COLORS.white + 'CC', marginBottom: 16 },
  headerStats: { flexDirection: 'row', backgroundColor: COLORS.white + '20', borderRadius: SIZES.radius, padding: 12 },
  hStat: { flex: 1, alignItems: 'center' },
  hStatVal: { fontSize: SIZES.lg, color: COLORS.white, ...FONTS.bold },
  hStatLabel: { fontSize: SIZES.xs, color: COLORS.white + 'AA' },
  hStatDivider: { width: 1, backgroundColor: COLORS.white + '30' },
  actorsCard: {
    backgroundColor: COLORS.white, margin: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, ...SHADOWS.sm,
  },
  actorsTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 10 },
  actorsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actorChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: COLORS.gray50,
  },
  actorText: { fontSize: SIZES.sm, ...FONTS.medium },
  stepsSection: { paddingHorizontal: SIZES.padding },
  stepsTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold, marginBottom: 16 },
  summaryCard: {
    backgroundColor: COLORS.white, margin: SIZES.padding, borderRadius: SIZES.radius,
    padding: 24, alignItems: 'center', marginBottom: 40, ...SHADOWS.md,
  },
  summaryTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold, marginTop: 8 },
  summaryText: { fontSize: SIZES.sm, color: COLORS.gray600, textAlign: 'center', marginTop: 8 },
});

export default FlowDetailScreen;
