import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';

const PaymentScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const renderStep = () => {
    switch (step) {
      case 1: return renderPaymentOverview();
      case 2: return renderEscrowExplainer();
      case 3: return renderPaymentMethods();
      case 4: return renderPaymentBreakdown();
      case 5: return renderDisputeWindow();
      case 6: return renderDriverEarnings();
      case 7: return renderCancellationRefund();
      default: return null;
    }
  };

  const renderPaymentOverview = () => (
    <View>
      <Text style={styles.stepTitle}>💰 Payment & Settlement</Text>
      <Text style={styles.stepDesc}>Step 7.1 — Multi-layer escrow payment system overview</Text>

      <View style={styles.overviewCard}>
        <View style={styles.overviewIcon}>
          <Ionicons name="shield-checkmark" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.overviewTitle}>Secure Escrow Payment System</Text>
        <Text style={styles.overviewText}>ROUTELY holds all payments in escrow until delivery is confirmed. This protects both senders and drivers.</Text>
      </View>

      <Text style={styles.sectionLabel}>Payment Flow Steps</Text>

      {[
        { icon: 'card', title: 'Sender Pays', desc: 'Full amount held in ROUTELY escrow at booking', color: COLORS.primary },
        { icon: 'shield-half', title: 'Escrow Hold', desc: 'Funds secured — neither party can access yet', color: COLORS.accent },
        { icon: 'checkmark-done', title: 'Delivery Confirmed', desc: 'Triple verification triggers release countdown', color: COLORS.secondary },
        { icon: 'hourglass', title: '24hr Dispute Window', desc: 'Recipient can raise dispute within this period', color: COLORS.info },
        { icon: 'cash', title: 'Payment Released', desc: 'Driver receives earnings minus 15% platform fee', color: COLORS.secondary },
      ].map((item, i) => (
        <View key={i} style={styles.flowStep}>
          <View style={[styles.flowStepIcon, { backgroundColor: item.color + '15' }]}>
            <Ionicons name={item.icon} size={22} color={item.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.flowStepTitle}>{item.title}</Text>
            <Text style={styles.flowStepDesc}>{item.desc}</Text>
          </View>
          {i < 4 && <View style={styles.flowLine} />}
        </View>
      ))}

      <Button title="How Escrow Works" onPress={() => setStep(2)} style={{ marginTop: 16, backgroundColor: COLORS.primary }} />
    </View>
  );

  const renderEscrowExplainer = () => (
    <View>
      <Text style={styles.stepTitle}>🔒 Escrow System</Text>
      <Text style={styles.stepDesc}>Step 7.2 — How funds are protected throughout the journey</Text>

      <View style={styles.escrowDiagram}>
        <View style={styles.escrowPhase}>
          <View style={[styles.escrowDot, { backgroundColor: COLORS.primary }]} />
          <View style={styles.escrowLine} />
          <View style={{ flex: 1 }}>
            <Text style={styles.escrowPhaseTitle}>Booking Created</Text>
            <Text style={styles.escrowPhaseDesc}>Sender's payment charged immediately. Full amount enters ROUTELY escrow wallet.</Text>
            <View style={styles.escrowAmount}>
              <Text style={styles.escrowAmountText}>LKR 650 → Escrow</Text>
            </View>
          </View>
        </View>

        <View style={styles.escrowPhase}>
          <View style={[styles.escrowDot, { backgroundColor: COLORS.accent }]} />
          <View style={styles.escrowLine} />
          <View style={{ flex: 1 }}>
            <Text style={styles.escrowPhaseTitle}>In Transit</Text>
            <Text style={styles.escrowPhaseDesc}>Funds locked. Neither sender nor driver can access. Protected against cancellation fraud.</Text>
          </View>
        </View>

        <View style={styles.escrowPhase}>
          <View style={[styles.escrowDot, { backgroundColor: COLORS.secondary }]} />
          <View style={styles.escrowLine} />
          <View style={{ flex: 1 }}>
            <Text style={styles.escrowPhaseTitle}>Delivery Confirmed</Text>
            <Text style={styles.escrowPhaseDesc}>QR + OTP + Photo verification triggers 24-hour countdown to release.</Text>
          </View>
        </View>

        <View style={styles.escrowPhase}>
          <View style={[styles.escrowDot, { backgroundColor: COLORS.info }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.escrowPhaseTitle}>Payment Released</Text>
            <Text style={styles.escrowPhaseDesc}>After dispute window expires without incident.</Text>
            <View style={styles.splitBox}>
              <View style={styles.splitItem}>
                <Text style={styles.splitLabel}>Driver</Text>
                <Text style={styles.splitValue}>LKR 552.50</Text>
                <Text style={styles.splitPct}>(85%)</Text>
              </View>
              <View style={styles.splitDivider} />
              <View style={styles.splitItem}>
                <Text style={styles.splitLabel}>ROUTELY</Text>
                <Text style={styles.splitValue}>LKR 97.50</Text>
                <Text style={styles.splitPct}>(15%)</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Button title="View Payment Methods" onPress={() => setStep(3)} style={{ backgroundColor: COLORS.primary }} />
    </View>
  );

  const renderPaymentMethods = () => {
    const methods = [
      { id: 'card', icon: 'card', title: 'Credit/Debit Card', desc: 'Visa, Mastercard — instant processing', fee: 'No extra fee' },
      { id: 'bank', icon: 'business', title: 'Bank Transfer', desc: 'Direct from Sri Lankan bank account', fee: 'No extra fee' },
      { id: 'wallet', icon: 'wallet', title: 'ROUTELY Wallet', desc: 'Pre-loaded balance — fastest checkout', fee: 'No extra fee' },
      { id: 'cod', icon: 'cash', title: 'Cash on Delivery', desc: 'Pay driver at pickup (courier mode only)', fee: '+LKR 50 handling fee' },
    ];

    return (
      <View>
        <Text style={styles.stepTitle}>💳 Payment Methods</Text>
        <Text style={styles.stepDesc}>Step 7.3 — Choose how to pay for your delivery</Text>

        {methods.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[styles.methodCard, selectedMethod === m.id && styles.methodSelected]}
            onPress={() => setSelectedMethod(m.id)}
          >
            <View style={styles.methodIcon}>
              <Ionicons name={m.icon} size={24} color={selectedMethod === m.id ? COLORS.primary : COLORS.gray500} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.methodTitle}>{m.title}</Text>
              <Text style={styles.methodDesc}>{m.desc}</Text>
              <Text style={[styles.methodFee, m.fee.includes('+') && { color: COLORS.accent }]}>{m.fee}</Text>
            </View>
            <View style={[styles.radio, selectedMethod === m.id && styles.radioSelected]}>
              {selectedMethod === m.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        <Button title="View Price Breakdown" onPress={() => setStep(4)} disabled={!selectedMethod} style={{ marginTop: 16, backgroundColor: COLORS.primary }} />
      </View>
    );
  };

  const renderPaymentBreakdown = () => (
    <View>
      <Text style={styles.stepTitle}>📊 Price Breakdown</Text>
      <Text style={styles.stepDesc}>Step 7.4 — Complete transparency on costs</Text>

      <View style={styles.breakdownCard}>
        <Text style={styles.breakdownTitle}>Courier Delivery Breakdown</Text>

        <View style={styles.breakdownRow}><Text style={styles.breakdownLabel}>Base Delivery Fee</Text><Text style={styles.breakdownValue}>LKR 450.00</Text></View>
        <View style={styles.breakdownRow}><Text style={styles.breakdownLabel}>Weight Surcharge (2.5 kg)</Text><Text style={styles.breakdownValue}>LKR 75.00</Text></View>
        <View style={styles.breakdownRow}><Text style={styles.breakdownLabel}>Insurance (optional)</Text><Text style={styles.breakdownValue}>LKR 35.00</Text></View>
        <View style={styles.breakdownRow}><Text style={styles.breakdownLabel}>Handling Fee</Text><Text style={styles.breakdownValue}>LKR 0.00</Text></View>
        <View style={[styles.breakdownRow, styles.breakdownDiscount]}><Text style={[styles.breakdownLabel, { color: COLORS.secondary }]}>ROUTELY Discount</Text><Text style={[styles.breakdownValue, { color: COLORS.secondary }]}>-LKR 50.00</Text></View>
        <View style={styles.breakdownDivider} />
        <View style={styles.breakdownRow}><Text style={styles.breakdownTotal}>Total</Text><Text style={styles.breakdownTotalVal}>LKR 510.00</Text></View>
      </View>

      <View style={styles.comparisonCard}>
        <Text style={styles.comparisonTitle}>Savings Comparison</Text>
        <View style={styles.comparisonRow}>
          <Text style={styles.comparisonLabel}>Traditional courier</Text>
          <Text style={styles.comparisonValue}>LKR 650.00</Text>
        </View>
        <View style={styles.comparisonRow}>
          <Text style={styles.comparisonLabel}>ROUTELY price</Text>
          <Text style={[styles.comparisonValue, { color: COLORS.secondary, ...FONTS.bold }]}>LKR 510.00</Text>
        </View>
        <View style={styles.savingsBar}>
          <Ionicons name="trending-down" size={16} color={COLORS.secondary} />
          <Text style={styles.savingsText}>You save LKR 140 (21.5% cheaper)</Text>
        </View>
      </View>

      <Button title="View Dispute Policy" onPress={() => setStep(5)} style={{ backgroundColor: COLORS.info }} />
    </View>
  );

  const renderDisputeWindow = () => (
    <View>
      <Text style={styles.stepTitle}>⏱️ 24-Hour Dispute Window</Text>
      <Text style={styles.stepDesc}>Step 7.5 — Post-delivery protection period</Text>

      <View style={styles.disputeExplain}>
        <Ionicons name="shield-half" size={40} color={COLORS.info} />
        <Text style={styles.disputeExplainTitle}>Your Payment is Protected</Text>
        <Text style={styles.disputeExplainText}>After delivery confirmation, a 24-hour window opens where recipients can raise disputes if there are issues with the delivery.</Text>
      </View>

      <View style={styles.disputeTimeline}>
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, { backgroundColor: COLORS.secondary }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.timelineTitle}>0h — Delivery Confirmed</Text>
            <Text style={styles.timelineDesc}>Triple verification complete. Dispute window opens.</Text>
          </View>
        </View>
        <View style={styles.timelineConnector} />
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, { backgroundColor: COLORS.accent }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.timelineTitle}>0–24h — Dispute Window</Text>
            <Text style={styles.timelineDesc}>Recipient can flag issues: damaged item, wrong parcel, missing contents.</Text>
          </View>
        </View>
        <View style={styles.timelineConnector} />
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, { backgroundColor: COLORS.info }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.timelineTitle}>24h+ — Auto-Release</Text>
            <Text style={styles.timelineDesc}>No dispute? Payment automatically released to driver.</Text>
          </View>
        </View>
      </View>

      <View style={styles.disputeOptions}>
        <Text style={styles.disputeOptionsTitle}>Dispute Categories:</Text>
        {['Parcel arrived damaged', 'Wrong item delivered', 'Contents missing', 'Parcel not received (false confirmation)', 'Significant delay'].map((cat, i) => (
          <View key={i} style={styles.disputeCategory}>
            <Ionicons name="alert-circle" size={14} color={COLORS.danger} />
            <Text style={styles.disputeCatText}>{cat}</Text>
          </View>
        ))}
      </View>

      <Button title="View Driver Earnings" onPress={() => setStep(6)} style={{ backgroundColor: COLORS.secondary }} />
    </View>
  );

  const renderDriverEarnings = () => (
    <View>
      <Text style={styles.stepTitle}>💵 Driver Earnings</Text>
      <Text style={styles.stepDesc}>Step 7.6 — How drivers get paid</Text>

      <View style={styles.earningsCard}>
        <Text style={styles.earningsTitle}>Earnings Dashboard</Text>
        <View style={styles.earningsRow}>
          <View style={styles.earningsItem}>
            <Text style={styles.earningsLabel}>Today's Earnings</Text>
            <Text style={styles.earningsValue}>LKR 2,450</Text>
            <StatusBadge status="released" size="sm" />
          </View>
          <View style={styles.earningsDivider} />
          <View style={styles.earningsItem}>
            <Text style={styles.earningsLabel}>Pending Release</Text>
            <Text style={[styles.earningsValue, { color: COLORS.accent }]}>LKR 875</Text>
            <StatusBadge status="escrow" size="sm" />
          </View>
        </View>
      </View>

      <View style={styles.feeStructure}>
        <Text style={styles.feeTitle}>Fee Structure</Text>
        <View style={styles.feeRow}><Text style={styles.feeLabel}>Platform commission</Text><Text style={styles.feeValue}>15%</Text></View>
        <View style={styles.feeRow}><Text style={styles.feeLabel}>Payment processing</Text><Text style={styles.feeValue}>Included</Text></View>
        <View style={styles.feeRow}><Text style={styles.feeLabel}>Insurance admin</Text><Text style={styles.feeValue}>Included</Text></View>
        <View style={styles.feeRow}><Text style={styles.feeLabel}>Driver keeps</Text><Text style={[styles.feeValue, { color: COLORS.secondary, ...FONTS.bold }]}>85%</Text></View>
      </View>

      <View style={styles.payoutSchedule}>
        <Ionicons name="calendar" size={20} color={COLORS.primary} />
        <View>
          <Text style={styles.payoutTitle}>Payout Schedule</Text>
          <Text style={styles.payoutText}>Earnings released after 24hr dispute window. Daily automatic withdrawals to linked bank account.</Text>
        </View>
      </View>

      <Button title="Cancellation & Refunds" onPress={() => setStep(7)} style={{ backgroundColor: COLORS.danger }} />
    </View>
  );

  const renderCancellationRefund = () => (
    <View>
      <Text style={styles.stepTitle}>🚫 Cancellation & Refunds</Text>
      <Text style={styles.stepDesc}>Step 7.7–7.8 — Fair cancellation policy</Text>

      <Text style={styles.sectionLabel}>Cancellation Windows</Text>

      {[
        { window: 'Before pickup', refund: '100% refund', fee: 'No fee', color: COLORS.secondary, icon: 'checkmark-circle' },
        { window: 'After pickup (in transit)', refund: 'Partial refund', fee: 'Pickup fee deducted', color: COLORS.accent, icon: 'alert-circle' },
        { window: 'After delivery attempt', refund: 'Case-by-case', fee: 'Subject to review', color: COLORS.danger, icon: 'close-circle' },
      ].map((c, i) => (
        <View key={i} style={styles.cancelCard}>
          <Ionicons name={c.icon} size={24} color={c.color} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cancelWindow}>{c.window}</Text>
            <Text style={styles.cancelRefund}>{c.refund}</Text>
            <Text style={styles.cancelFee}>{c.fee}</Text>
          </View>
        </View>
      ))}

      <View style={styles.refundNote}>
        <Ionicons name="information-circle" size={18} color={COLORS.info} />
        <Text style={styles.refundNoteText}>Refunds processed within 3–5 business days to original payment method. ROUTELY wallet refunds are instant.</Text>
      </View>

      <View style={styles.courierSettlement}>
        <Text style={styles.courierSettleTitle}>Courier Partner Settlement</Text>
        <Text style={styles.courierSettleText}>For courier bookings, ROUTELY handles settlement with courier partners (Domex, Koombiyo, PromptXP) automatically. Reconciliation runs daily at midnight.</Text>
      </View>

      <Button title="Back to Payment Overview" onPress={() => setStep(1)} variant="outline" style={{ borderColor: COLORS.primary, marginTop: 8 }} textStyle={{ color: COLORS.primary }} />
      <Button title="Back to Dashboard" onPress={() => navigation.goBack()} variant="outline" style={{ borderColor: COLORS.gray400, marginTop: 8 }} textStyle={{ color: COLORS.gray600 }} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment & Settlement</Text>
        <View style={[styles.stepBadge, { backgroundColor: COLORS.accentBg }]}>
          <Text style={[styles.stepBadgeText, { color: COLORS.accentDark }]}>{step}/7</Text>
        </View>
      </View>
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${(step / 7) * 100}%`, backgroundColor: COLORS.accent }]} />
      </View>
      <View style={styles.content}>{renderStep()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 12, backgroundColor: COLORS.white,
  },
  headerTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.semiBold },
  stepBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  stepBadgeText: { fontSize: SIZES.sm, ...FONTS.bold },
  progressOuter: { height: 3, backgroundColor: COLORS.gray200 },
  progressInner: { height: '100%', borderRadius: 2 },
  content: { padding: SIZES.padding, paddingBottom: 40 },
  stepTitle: { fontSize: SIZES.xl, color: COLORS.dark, ...FONTS.bold, marginBottom: 4 },
  stepDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 24, ...FONTS.medium },
  sectionLabel: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  overviewCard: {
    backgroundColor: COLORS.primaryBg, borderRadius: SIZES.radius, padding: 24,
    alignItems: 'center', marginBottom: 24,
  },
  overviewIcon: { marginBottom: 12 },
  overviewTitle: { fontSize: SIZES.lg, color: COLORS.primary, ...FONTS.bold, textAlign: 'center' },
  overviewText: { fontSize: SIZES.sm, color: COLORS.gray600, textAlign: 'center', marginTop: 8 },
  flowStep: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 16, position: 'relative',
  },
  flowStepIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  flowStepTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  flowStepDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  flowLine: {
    position: 'absolute', left: 21, top: 44, width: 2, height: 20, backgroundColor: COLORS.gray200,
  },
  escrowDiagram: { marginBottom: 20 },
  escrowPhase: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 20, position: 'relative' },
  escrowDot: { width: 16, height: 16, borderRadius: 8, marginTop: 4 },
  escrowLine: {
    position: 'absolute', left: 7, top: 20, width: 2, height: 60, backgroundColor: COLORS.gray200,
  },
  escrowPhaseTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  escrowPhaseDesc: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 4 },
  escrowAmount: {
    backgroundColor: COLORS.primaryBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginTop: 6, alignSelf: 'flex-start',
  },
  escrowAmountText: { fontSize: SIZES.sm, color: COLORS.primary, ...FONTS.medium },
  splitBox: {
    flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm,
    padding: 12, marginTop: 8, ...SHADOWS.sm,
  },
  splitItem: { flex: 1, alignItems: 'center' },
  splitLabel: { fontSize: SIZES.xs, color: COLORS.gray500 },
  splitValue: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold },
  splitPct: { fontSize: SIZES.xs, color: COLORS.gray400 },
  splitDivider: { width: 1, backgroundColor: COLORS.gray200 },
  methodCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 10, borderWidth: 2, borderColor: COLORS.gray200, ...SHADOWS.sm,
  },
  methodSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryBg },
  methodIcon: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.gray100,
    alignItems: 'center', justifyContent: 'center',
  },
  methodTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  methodDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  methodFee: { fontSize: SIZES.xs, color: COLORS.secondary, marginTop: 2, ...FONTS.medium },
  radio: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.gray300,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: COLORS.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  breakdownCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 18, marginBottom: 16, ...SHADOWS.md,
  },
  breakdownTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 14 },
  breakdownRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  breakdownLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  breakdownValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  breakdownDiscount: { backgroundColor: COLORS.secondaryBg + '50' },
  breakdownDivider: { height: 2, backgroundColor: COLORS.primary, marginVertical: 8, borderRadius: 1 },
  breakdownTotal: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.bold },
  breakdownTotalVal: { fontSize: SIZES.lg, color: COLORS.primary, ...FONTS.bold },
  comparisonCard: {
    backgroundColor: COLORS.secondaryBg, padding: 16, borderRadius: SIZES.radius, marginBottom: 20,
  },
  comparisonTitle: { fontSize: SIZES.md, color: COLORS.secondaryDark, ...FONTS.semiBold, marginBottom: 10 },
  comparisonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  comparisonLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  comparisonValue: { fontSize: SIZES.sm, color: COLORS.dark },
  savingsBar: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.white, padding: 8, borderRadius: 8, marginTop: 8,
  },
  savingsText: { fontSize: SIZES.sm, color: COLORS.secondary, ...FONTS.medium },
  disputeExplain: { alignItems: 'center', marginBottom: 24 },
  disputeExplainTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold, marginTop: 8 },
  disputeExplainText: { fontSize: SIZES.sm, color: COLORS.gray600, textAlign: 'center', marginTop: 6 },
  disputeTimeline: { marginBottom: 20 },
  timelineItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  timelineDot: { width: 14, height: 14, borderRadius: 7, marginTop: 4 },
  timelineTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  timelineDesc: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 2 },
  timelineConnector: { width: 2, height: 24, backgroundColor: COLORS.gray200, marginLeft: 6, marginVertical: 4 },
  disputeOptions: {
    backgroundColor: COLORS.dangerBg, padding: 14, borderRadius: SIZES.radiusSm, marginBottom: 20,
    borderLeftWidth: 4, borderLeftColor: COLORS.danger,
  },
  disputeOptionsTitle: { fontSize: SIZES.sm, color: COLORS.danger, ...FONTS.semiBold, marginBottom: 8 },
  disputeCategory: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  disputeCatText: { fontSize: SIZES.xs, color: COLORS.gray700 },
  earningsCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16, marginBottom: 16, ...SHADOWS.md,
  },
  earningsTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  earningsRow: { flexDirection: 'row' },
  earningsItem: { flex: 1, alignItems: 'center' },
  earningsLabel: { fontSize: SIZES.xs, color: COLORS.gray500 },
  earningsValue: { fontSize: SIZES.xxl, color: COLORS.secondary, ...FONTS.bold, marginVertical: 4 },
  earningsDivider: { width: 1, backgroundColor: COLORS.gray200 },
  feeStructure: {
    backgroundColor: COLORS.gray50, padding: 16, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  feeTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 10 },
  feeRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray200,
  },
  feeLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  feeValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  payoutSchedule: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: COLORS.primaryBg, padding: 14, borderRadius: SIZES.radius, marginBottom: 20,
  },
  payoutTitle: { fontSize: SIZES.sm, color: COLORS.primary, ...FONTS.semiBold },
  payoutText: { fontSize: SIZES.xs, color: COLORS.gray600, marginTop: 2 },
  cancelCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, padding: 14,
    marginBottom: 8, ...SHADOWS.sm,
  },
  cancelWindow: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  cancelRefund: { fontSize: SIZES.sm, color: COLORS.secondary, ...FONTS.medium, marginTop: 2 },
  cancelFee: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  refundNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: COLORS.infoBg, padding: 12, borderRadius: SIZES.radiusSm, marginTop: 8, marginBottom: 16,
  },
  refundNoteText: { flex: 1, fontSize: SIZES.xs, color: COLORS.info, lineHeight: 16 },
  courierSettlement: {
    backgroundColor: COLORS.gray50, padding: 14, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  courierSettleTitle: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 4 },
  courierSettleText: { fontSize: SIZES.xs, color: COLORS.gray600, lineHeight: 16 },
});

export default PaymentScreen;
