import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';

const EarningsScreen = ({ navigation }) => {
  const [period, setPeriod] = useState('today');

  const transactions = [
    { id: 1, parcel: 'RTL-D-2026-015', from: 'Colombo → Kandy', amount: 'LKR 552', status: 'released', time: '2:45 PM' },
    { id: 2, parcel: 'RTL-D-2026-014', from: 'Matara → Galle', amount: 'LKR 255', status: 'escrow', time: '11:30 AM' },
    { id: 3, parcel: 'RTL-D-2026-013', from: 'Kandy → Colombo', amount: 'LKR 467', status: 'released', time: '9:15 AM' },
    { id: 4, parcel: 'RTL-D-2026-012', from: 'Negombo → Colombo', amount: 'LKR 170', status: 'released', time: 'Yesterday' },
    { id: 5, parcel: 'RTL-D-2026-010', from: 'Colombo → Gampaha', amount: 'LKR 213', status: 'released', time: 'Yesterday' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Earnings</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={22} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      {/* Earnings Overview */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewLabel}>Total Available Balance</Text>
        <Text style={styles.overviewAmount}>LKR 12,450</Text>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={styles.overviewStatLabel}>Released</Text>
            <Text style={[styles.overviewStatVal, { color: COLORS.secondary }]}>LKR 9,875</Text>
          </View>
          <View style={styles.overviewStatDivider} />
          <View style={styles.overviewStat}>
            <Text style={styles.overviewStatLabel}>In Escrow</Text>
            <Text style={[styles.overviewStatVal, { color: COLORS.accent }]}>LKR 2,575</Text>
          </View>
        </View>
        <Button
          title="Withdraw to Bank"
          onPress={() => {}}
          style={{ backgroundColor: COLORS.white, marginTop: 16 }}
          textStyle={{ color: COLORS.primary }}
          icon={<Ionicons name="wallet" size={18} color={COLORS.primary} />}
        />
      </View>

      {/* Period Selector */}
      <View style={styles.periodRow}>
        {['today', 'week', 'month'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.periodChip, period === p && styles.periodActive]}
            onPress={() => setPeriod(p)}
          >
            <Text style={[styles.periodText, period === p && styles.periodTextActive]}>
              {p === 'today' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="car" size={20} color={COLORS.primary} />
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="cash" size={20} color={COLORS.secondary} />
          <Text style={styles.statValue}>LKR 1,274</Text>
          <Text style={styles.statLabel}>Earned</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="navigate" size={20} color={COLORS.info} />
          <Text style={styles.statValue}>145 km</Text>
          <Text style={styles.statLabel}>Driven</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star" size={20} color={COLORS.accent} />
          <Text style={styles.statValue}>4.9</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
      </View>

      {/* Fee Breakdown */}
      <View style={styles.feeCard}>
        <Text style={styles.feeTitle}>Earnings Breakdown (Today)</Text>
        <View style={styles.feeRow}><Text style={styles.feeLabel}>Gross Delivery Earnings</Text><Text style={styles.feeValue}>LKR 1,499</Text></View>
        <View style={styles.feeRow}><Text style={[styles.feeLabel, { color: COLORS.danger }]}>Platform Fee (15%)</Text><Text style={[styles.feeValue, { color: COLORS.danger }]}>-LKR 225</Text></View>
        <View style={styles.feeDivider} />
        <View style={styles.feeRow}><Text style={[styles.feeLabel, { ...FONTS.bold }]}>Net Earnings</Text><Text style={[styles.feeValue, { color: COLORS.secondary, ...FONTS.bold }]}>LKR 1,274</Text></View>
      </View>

      {/* Transaction History */}
      <View style={styles.transSection}>
        <Text style={styles.transTitle}>Recent Transactions</Text>
        {transactions.map((t) => (
          <View key={t.id} style={styles.transCard}>
            <View style={styles.transLeft}>
              <View style={[styles.transIcon, { backgroundColor: t.status === 'released' ? COLORS.secondaryBg : COLORS.accentBg }]}>
                <Ionicons name={t.status === 'released' ? 'checkmark-circle' : 'hourglass'} size={18} color={t.status === 'released' ? COLORS.secondary : COLORS.accent} />
              </View>
              <View>
                <Text style={styles.transParcel}>{t.parcel}</Text>
                <Text style={styles.transRoute}>{t.from}</Text>
                <Text style={styles.transTime}>{t.time}</Text>
              </View>
            </View>
            <View style={styles.transRight}>
              <Text style={[styles.transAmount, { color: t.status === 'released' ? COLORS.secondary : COLORS.accentDark }]}>{t.amount}</Text>
              <StatusBadge status={t.status} size="sm" />
            </View>
          </View>
        ))}
      </View>

      {/* Payout Info */}
      <View style={styles.payoutNote}>
        <Ionicons name="information-circle" size={18} color={COLORS.info} />
        <Text style={styles.payoutText}>Earnings are auto-transferred to your linked bank account daily at midnight, after escrow release.</Text>
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
    backgroundColor: COLORS.primary, margin: SIZES.padding, borderRadius: SIZES.radiusLg,
    padding: 24, alignItems: 'center',
  },
  overviewLabel: { fontSize: SIZES.sm, color: COLORS.white + 'AA' },
  overviewAmount: { fontSize: 36, color: COLORS.white, ...FONTS.bold, marginTop: 4 },
  overviewStats: { flexDirection: 'row', marginTop: 16, width: '100%' },
  overviewStat: { flex: 1, alignItems: 'center' },
  overviewStatLabel: { fontSize: SIZES.xs, color: COLORS.white + '99' },
  overviewStatVal: { fontSize: SIZES.lg, ...FONTS.bold, marginTop: 2 },
  overviewStatDivider: { width: 1, backgroundColor: COLORS.white + '30' },
  periodRow: {
    flexDirection: 'row', paddingHorizontal: SIZES.padding, marginBottom: 16, gap: 8,
  },
  periodChip: {
    flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: COLORS.white,
    alignItems: 'center', ...SHADOWS.sm,
  },
  periodActive: { backgroundColor: COLORS.primary },
  periodText: { fontSize: SIZES.sm, color: COLORS.gray600, ...FONTS.medium },
  periodTextActive: { color: COLORS.white },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SIZES.padding, gap: 10, marginBottom: 16,
  },
  statCard: {
    width: '47%', backgroundColor: COLORS.white, borderRadius: SIZES.radius,
    padding: 16, alignItems: 'center', ...SHADOWS.sm,
  },
  statValue: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold, marginTop: 6 },
  statLabel: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  feeCard: {
    backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, marginBottom: 16, ...SHADOWS.sm,
  },
  feeTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  feeRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8,
  },
  feeLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  feeValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  feeDivider: { height: 1, backgroundColor: COLORS.gray200, marginVertical: 4 },
  transSection: { paddingHorizontal: SIZES.padding, marginBottom: 16 },
  transTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  transCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, padding: 14,
    marginBottom: 8, ...SHADOWS.sm,
  },
  transLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  transIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  transParcel: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  transRoute: { fontSize: SIZES.xs, color: COLORS.gray500 },
  transTime: { fontSize: 10, color: COLORS.gray400, marginTop: 2 },
  transRight: { alignItems: 'flex-end', gap: 4 },
  transAmount: { fontSize: SIZES.md, ...FONTS.bold },
  payoutNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    marginHorizontal: SIZES.padding, padding: 14, backgroundColor: COLORS.infoBg,
    borderRadius: SIZES.radiusSm, marginBottom: 40,
  },
  payoutText: { flex: 1, fontSize: SIZES.xs, color: COLORS.info, lineHeight: 16 },
});

export default EarningsScreen;
