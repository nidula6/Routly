import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { PROCESS_FLOWS, FLOW_CONNECTIONS } from '../constants/processFlows';
import FlowCard from '../components/FlowCard';

const ProcessFlowScreen = ({ navigation }) => {
  const flowIcons = {
    'onboarding': 'person-add',
    'courier-booking': 'business',
    'directional-booking': 'car',
    'driver-route': 'map',
    'pickup-verification': 'scan',
    'delivery-confirmation': 'checkmark-done',
    'payment-settlement': 'cash',
    'rating-feedback': 'star',
  };

  const flowColors = [
    COLORS.primary, COLORS.info, COLORS.secondary, COLORS.accent,
    '#E67E22', COLORS.secondary, '#8E44AD', COLORS.accent,
  ];

  const flowScreens = {
    'onboarding': 'Welcome',
    'courier-booking': 'CourierBooking',
    'directional-booking': 'DirectionalBooking',
    'driver-route': 'RoutePlanning',
    'pickup-verification': 'PickupVerification',
    'delivery-confirmation': 'DeliveryConfirmation',
    'payment-settlement': 'Payment',
    'rating-feedback': 'Rating',
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Process Flow Chart</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Overview */}
      <View style={styles.overviewCard}>
        <Ionicons name="git-network" size={40} color={COLORS.primary} />
        <Text style={styles.overviewTitle}>ROUTELY Process Architecture</Text>
        <Text style={styles.overviewDesc}>8 interconnected process flows covering the complete delivery lifecycle — from onboarding to rating.</Text>
        <View style={styles.overviewStats}>
          <View style={styles.oStat}>
            <Text style={styles.oStatVal}>8</Text>
            <Text style={styles.oStatLabel}>Flows</Text>
          </View>
          <View style={styles.oStatDivider} />
          <View style={styles.oStat}>
            <Text style={styles.oStatVal}>{PROCESS_FLOWS.reduce((sum, f) => sum + f.steps.length, 0)}</Text>
            <Text style={styles.oStatLabel}>Steps</Text>
          </View>
          <View style={styles.oStatDivider} />
          <View style={styles.oStat}>
            <Text style={styles.oStatVal}>5</Text>
            <Text style={styles.oStatLabel}>Actors</Text>
          </View>
        </View>
      </View>

      {/* Actor Legend */}
      <View style={styles.legendCard}>
        <Text style={styles.legendTitle}>Process Actors</Text>
        <View style={styles.legendRow}>
          {[
            { name: 'Sender', color: COLORS.primary, icon: 'person' },
            { name: 'Driver', color: COLORS.secondary, icon: 'car' },
            { name: 'System', color: COLORS.info, icon: 'server' },
            { name: 'Recipient', color: COLORS.accent, icon: 'home' },
            { name: 'Admin', color: COLORS.danger, icon: 'shield' },
          ].map((actor) => (
            <View key={actor.name} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: actor.color }]}>
                <Ionicons name={actor.icon} size={12} color={COLORS.white} />
              </View>
              <Text style={styles.legendText}>{actor.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Flow Chart */}
      <Text style={styles.sectionTitle}>Complete Process Flows</Text>

      {PROCESS_FLOWS.map((flow, index) => (
        <View key={flow.id}>
          <TouchableOpacity
            style={styles.flowItem}
            onPress={() => {
              const screen = flowScreens[flow.id];
              if (screen) navigation.navigate(screen);
              else navigation.navigate('FlowDetail', { flowId: flow.id });
            }}
          >
            <View style={styles.flowLeft}>
              <View style={[styles.flowNum, { backgroundColor: flowColors[index] }]}>
                <Text style={styles.flowNumText}>{index + 1}</Text>
              </View>
              {index < PROCESS_FLOWS.length - 1 && (
                <View style={[styles.flowConnector, { backgroundColor: flowColors[index] + '40' }]} />
              )}
            </View>
            <View style={styles.flowContent}>
              <View style={styles.flowHeader}>
                <Ionicons name={flowIcons[flow.id] || 'ellipse'} size={20} color={flowColors[index]} />
                <Text style={styles.flowTitle}>{flow.title}</Text>
              </View>
              <Text style={styles.flowDesc}>{flow.description}</Text>
              <View style={styles.flowMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="layers" size={12} color={COLORS.gray500} />
                  <Text style={styles.metaText}>{flow.steps.length} steps</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="person" size={12} color={COLORS.gray500} />
                  <Text style={styles.metaText}>{[...new Set(flow.steps.map((s) => s.actor))].join(', ')}</Text>
                </View>
              </View>
              {/* Mini step preview */}
              <View style={styles.miniSteps}>
                {flow.steps.slice(0, 4).map((s, i) => (
                  <View key={i} style={styles.miniStep}>
                    <View style={[styles.miniDot, { backgroundColor: flowColors[index] }]} />
                    <Text style={styles.miniStepText} numberOfLines={1}>{s.title}</Text>
                  </View>
                ))}
                {flow.steps.length > 4 && (
                  <Text style={styles.moreSteps}>+{flow.steps.length - 4} more steps</Text>
                )}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.gray400} />
          </TouchableOpacity>
        </View>
      ))}

      {/* Flow Connections */}
      <View style={styles.connectionsCard}>
        <Text style={styles.connectionsTitle}>Flow Connections</Text>
        <Text style={styles.connectionsDesc}>How the 8 processes connect to form the complete delivery lifecycle:</Text>

        {[
          { from: 'Onboarding', to: 'Booking', desc: 'Verified users can book deliveries', icon: 'arrow-forward' },
          { from: 'Booking', to: 'Route Planning', desc: 'Driver plans pickup route for accepted parcels', icon: 'arrow-forward' },
          { from: 'Route Planning', to: 'Pickup', desc: 'Driver follows route to collect parcels', icon: 'arrow-forward' },
          { from: 'Pickup', to: 'Delivery', desc: 'After all pickups, driver delivers to recipients', icon: 'arrow-forward' },
          { from: 'Delivery', to: 'Payment', desc: 'Confirmed delivery triggers escrow release', icon: 'arrow-forward' },
          { from: 'Payment', to: 'Rating', desc: 'After settlement, both parties can rate each other', icon: 'arrow-forward' },
        ].map((conn, i) => (
          <View key={i} style={styles.connectionItem}>
            <View style={styles.connLeft}>
              <View style={styles.connDot} />
              {i < 5 && <View style={styles.connLine} />}
            </View>
            <View style={styles.connContent}>
              <View style={styles.connFlow}>
                <Text style={styles.connFrom}>{conn.from}</Text>
                <Ionicons name={conn.icon} size={14} color={COLORS.primary} />
                <Text style={styles.connTo}>{conn.to}</Text>
              </View>
              <Text style={styles.connDesc}>{conn.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Navigation Summary */}
      <View style={styles.navSummary}>
        <Text style={styles.navSummaryTitle}>Explore Each Flow</Text>
        <Text style={styles.navSummaryText}>Tap any flow above to see its detailed step-by-step process with interactive UI screens.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 12, backgroundColor: COLORS.white,
  },
  headerTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.semiBold },
  overviewCard: {
    backgroundColor: COLORS.primaryBg, margin: SIZES.padding, borderRadius: SIZES.radiusLg,
    padding: 24, alignItems: 'center',
  },
  overviewTitle: { fontSize: SIZES.lg, color: COLORS.primary, ...FONTS.bold, marginTop: 8, textAlign: 'center' },
  overviewDesc: { fontSize: SIZES.sm, color: COLORS.gray600, textAlign: 'center', marginTop: 8 },
  overviewStats: { flexDirection: 'row', marginTop: 16, width: '100%' },
  oStat: { flex: 1, alignItems: 'center' },
  oStatVal: { fontSize: SIZES.xxl, color: COLORS.primary, ...FONTS.bold },
  oStatLabel: { fontSize: SIZES.xs, color: COLORS.gray500 },
  oStatDivider: { width: 1, backgroundColor: COLORS.gray300 },
  legendCard: {
    backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, marginBottom: 16, ...SHADOWS.sm,
  },
  legendTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  legendText: { fontSize: SIZES.xs, color: COLORS.gray600 },
  sectionTitle: {
    fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold,
    paddingHorizontal: SIZES.padding, marginBottom: 16,
  },
  flowItem: {
    flexDirection: 'row', alignItems: 'flex-start',
    marginHorizontal: SIZES.padding, marginBottom: 8,
    backgroundColor: COLORS.white, borderRadius: SIZES.radius,
    padding: 14, ...SHADOWS.sm,
  },
  flowLeft: { alignItems: 'center', marginRight: 12 },
  flowNum: {
    width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
  },
  flowNumText: { color: COLORS.white, fontSize: SIZES.md, ...FONTS.bold },
  flowConnector: {
    width: 3, height: 30, marginTop: 4, borderRadius: 2,
  },
  flowContent: { flex: 1 },
  flowHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  flowTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  flowDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginBottom: 6 },
  flowMeta: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 10, color: COLORS.gray500 },
  miniSteps: { gap: 3 },
  miniStep: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniDot: { width: 6, height: 6, borderRadius: 3 },
  miniStepText: { fontSize: 10, color: COLORS.gray500 },
  moreSteps: { fontSize: 10, color: COLORS.primary, ...FONTS.medium, marginTop: 2 },
  connectionsCard: {
    backgroundColor: COLORS.white, margin: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, ...SHADOWS.md,
  },
  connectionsTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.bold, marginBottom: 4 },
  connectionsDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginBottom: 16 },
  connectionItem: { flexDirection: 'row', marginBottom: 8 },
  connLeft: { alignItems: 'center', width: 20, marginRight: 10 },
  connDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  connLine: { width: 2, flex: 1, backgroundColor: COLORS.gray200, marginTop: 2 },
  connContent: { flex: 1, paddingBottom: 12 },
  connFlow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  connFrom: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  connTo: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  connDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  navSummary: {
    backgroundColor: COLORS.secondaryBg, margin: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, marginBottom: 40,
  },
  navSummaryTitle: { fontSize: SIZES.md, color: COLORS.secondaryDark, ...FONTS.semiBold },
  navSummaryText: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 4 },
});

export default ProcessFlowScreen;
