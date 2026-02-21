import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import StatusBadge from '../../components/StatusBadge';

const DirectionalBookingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [fragile, setFragile] = useState(false);
  const [price, setPrice] = useState('300');

  const renderStep = () => {
    switch (step) {
      case 1: return renderIntro();
      case 2: return renderRoute();
      case 3: return renderParcelDetails();
      case 4: return renderPricing();
      case 5: return renderSubmitListing();
      case 6: return renderDriverMatched();
      case 7: return renderConfirmation();
      default: return null;
    }
  };

  const renderIntro = () => (
    <View>
      <Text style={styles.stepTitle}>🚗 Directional Delivery</Text>
      <Text style={styles.stepDesc}>Step 3.1 — Save 30-50% by sending with drivers already on your route</Text>

      {/* How it works animation placeholder */}
      <View style={styles.howItWorks}>
        <Text style={styles.howTitle}>How It Works</Text>
        {[
          { icon: 'document-text-outline', title: 'List Your Parcel', desc: 'Tell us what you want to send and where' },
          { icon: 'people-outline', title: 'Get Matched', desc: 'We find a verified driver heading your way' },
          { icon: 'checkmark-done-outline', title: 'Secure Delivery', desc: 'QR scan, photo proof, OTP verification' },
        ].map((item, i) => (
          <View key={i} style={styles.howStep}>
            <View style={[styles.howIcon, { backgroundColor: COLORS.secondary + '15' }]}>
              <Ionicons name={item.icon} size={24} color={COLORS.secondary} />
            </View>
            <View style={styles.howContent}>
              <Text style={styles.howStepTitle}>{item.title}</Text>
              <Text style={styles.howStepDesc}>{item.desc}</Text>
            </View>
            {i < 2 && <View style={styles.howConnector} />}
          </View>
        ))}
      </View>

      <View style={styles.savingsBanner}>
        <Ionicons name="trending-down" size={20} color={COLORS.secondary} />
        <Text style={styles.savingsText}>Average savings: LKR 350 per parcel (54% vs courier)</Text>
      </View>

      <Button title="Start Directional Booking" onPress={() => setStep(2)} style={{ backgroundColor: COLORS.secondary }} />
    </View>
  );

  const renderRoute = () => (
    <View>
      <Text style={styles.stepTitle}>📍 Route Details</Text>
      <Text style={styles.stepDesc}>Step 3.2 — Enter origin, destination, and pickup date range</Text>

      <InputField label="Pickup City" placeholder="e.g., Colombo" icon={<Ionicons name="location" size={18} color={COLORS.secondary} />} />
      <InputField label="Delivery City" placeholder="e.g., Kandy" icon={<Ionicons name="location" size={18} color={COLORS.danger} />} />
      
      <InputField label="Preferred Pickup Date" placeholder="Today to +7 days" icon={<Ionicons name="calendar-outline" size={18} color={COLORS.gray500} />} />

      <View style={styles.supplyBanner}>
        <View style={styles.supplyDot} />
        <Text style={styles.supplyText}>✓ High driver supply on this route — Usually matched within 2-8 hours</Text>
      </View>

      <Button title="Continue" onPress={() => setStep(3)} style={{ backgroundColor: COLORS.secondary }} />
    </View>
  );

  const renderParcelDetails = () => (
    <View>
      <Text style={styles.stepTitle}>📦 Parcel Details</Text>
      <Text style={styles.stepDesc}>Step 3.3 — Max 20 kg, 60×40×40 cm for personal vehicle</Text>

      <InputField label="Weight (kg)" placeholder="Max 20 kg" keyboardType="decimal-pad" icon={<Ionicons name="scale-outline" size={18} color={COLORS.gray500} />} />
      <InputField label="Declared Value (LKR)" placeholder="For insurance calculation" keyboardType="number-pad" icon={<Ionicons name="cash-outline" size={18} color={COLORS.gray500} />} />
      
      <View style={styles.switchRow}>
        <View>
          <Text style={styles.switchLabel}>Fragile Parcel</Text>
          <Text style={styles.switchDesc}>Drivers can decline fragile items</Text>
        </View>
        <Switch value={fragile} onValueChange={setFragile} trackColor={{ true: COLORS.secondaryLight }} thumbColor={fragile ? COLORS.secondary : COLORS.gray400} />
      </View>

      <InputField label="Special Instructions" placeholder="e.g., Keep upright, Call before delivery" multiline icon={<Ionicons name="document-text-outline" size={18} color={COLORS.gray500} />} />

      <View style={styles.sizeNote}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.info} />
        <Text style={styles.sizeNoteText}>Max dimensions: 60×40×40 cm — Must fit in a personal vehicle. Larger items will be redirected to courier options.</Text>
      </View>

      <Button title="Continue to Pricing" onPress={() => setStep(4)} style={{ backgroundColor: COLORS.secondary }} />
    </View>
  );

  const renderPricing = () => (
    <View>
      <Text style={styles.stepTitle}>💰 Set Your Price</Text>
      <Text style={styles.stepDesc}>Step 3.4 — Algorithm-suggested price based on route, weight & demand</Text>

      <View style={styles.priceCard}>
        <Text style={styles.priceLabel}>Suggested Price Range</Text>
        <Text style={styles.priceRange}>LKR 280 – 350</Text>
        <Text style={styles.priceAlgo}>Based on: Colombo→Kandy (115km), 2.5kg, current driver supply</Text>
      </View>

      <View style={styles.comparisonCard}>
        <Text style={styles.comparisonTitle}>💡 Savings Comparison</Text>
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonLabel}>Traditional Courier</Text>
            <Text style={styles.comparisonOld}>LKR 650</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={COLORS.gray400} />
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonLabel}>Directional</Text>
            <Text style={styles.comparisonNew}>LKR {price}</Text>
          </View>
        </View>
        <View style={styles.savingsAmount}>
          <Ionicons name="trending-down" size={18} color={COLORS.secondary} />
          <Text style={styles.savingsAmountText}>You save LKR {650 - parseInt(price)} ({Math.round((650 - parseInt(price)) / 650 * 100)}%)</Text>
        </View>
      </View>

      <InputField
        label="Your Maximum Price (LKR)"
        value={price}
        onChangeText={setPrice}
        keyboardType="number-pad"
        icon={<Ionicons name="pricetag-outline" size={18} color={COLORS.secondary} />}
      />

      {parseInt(price) < 250 && (
        <View style={styles.warningBanner}>
          <Ionicons name="warning-outline" size={16} color={COLORS.accent} />
          <Text style={styles.warningText}>Low price reduces match probability. Suggested minimum: LKR 280</Text>
        </View>
      )}

      <InputField label="Optional Driver Tip (LKR)" placeholder="0 - 20% of base price" keyboardType="number-pad" icon={<Ionicons name="heart-outline" size={18} color={COLORS.gray500} />} />

      <Button title="Review & Submit" onPress={() => setStep(5)} style={{ backgroundColor: COLORS.secondary }} />
    </View>
  );

  const renderSubmitListing = () => (
    <View>
      <Text style={styles.stepTitle}>📋 Review Listing</Text>
      <Text style={styles.stepDesc}>Step 3.5 — Confirm details and submit for driver matching</Text>

      <View style={styles.reviewCard}>
        <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Route</Text><Text style={styles.reviewValue}>Colombo → Kandy</Text></View>
        <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Date Range</Text><Text style={styles.reviewValue}>Today – Feb 28</Text></View>
        <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Weight</Text><Text style={styles.reviewValue}>2.5 kg</Text></View>
        <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Max Price</Text><Text style={styles.reviewValue}>LKR {price}</Text></View>
        <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Fragile</Text><Text style={styles.reviewValue}>{fragile ? 'Yes' : 'No'}</Text></View>
      </View>

      <View style={styles.termsBox}>
        <Ionicons name="information-circle" size={18} color={COLORS.info} />
        <Text style={styles.termsText}>By submitting, you agree that your parcel will be carried by a private individual (not a courier company). ROUTELY provides insurance, QR verification, and GPS tracking for security.</Text>
      </View>

      <View style={styles.timerBanner}>
        <Ionicons name="timer-outline" size={18} color={COLORS.accent} />
        <Text style={styles.timerText}>24-hour match timer starts after submission. If no match found, you'll be offered courier alternatives.</Text>
      </View>

      <Button title="Submit Listing" onPress={() => setStep(6)} style={{ backgroundColor: COLORS.secondary }} />
    </View>
  );

  const renderDriverMatched = () => (
    <View style={styles.matchContainer}>
      <View style={styles.matchAnimation}>
        <View style={styles.matchCircle}>
          <Ionicons name="checkmark" size={48} color={COLORS.secondary} />
        </View>
      </View>
      <Text style={styles.matchTitle}>Driver Matched! 🎉</Text>
      <Text style={styles.matchSubtitle}>Step 3.6 — A driver heading your way accepted your parcel</Text>

      <View style={styles.driverCard}>
        <View style={styles.driverAvatar}>
          <Ionicons name="person" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.driverName}>Kamal Fernando</Text>
        <View style={styles.driverBadges}>
          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={14} color={COLORS.secondary} />
            <Text style={styles.verifiedText}>NIC Verified</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color={COLORS.accent} />
            <Text style={styles.ratingBadgeText}>4.8</Text>
          </View>
        </View>
        <View style={styles.driverMeta}>
          <View style={styles.driverMetaItem}>
            <Ionicons name="car-outline" size={16} color={COLORS.gray500} />
            <Text style={styles.driverMetaText}>Toyota Aqua · CAB-1234</Text>
          </View>
          <View style={styles.driverMetaItem}>
            <Ionicons name="cube-outline" size={16} color={COLORS.gray500} />
            <Text style={styles.driverMetaText}>156 deliveries completed</Text>
          </View>
          <View style={styles.driverMetaItem}>
            <Ionicons name="time-outline" size={16} color={COLORS.gray500} />
            <Text style={styles.driverMetaText}>Pickup window: 2:00 PM – 3:00 PM</Text>
          </View>
        </View>
      </View>

      <View style={styles.autoAcceptNote}>
        <Ionicons name="timer-outline" size={14} color={COLORS.info} />
        <Text style={styles.autoAcceptText}>Auto-accepted in 15 minutes if not declined. Max 2 rejections per listing.</Text>
      </View>

      <Button title="Accept Driver & Confirm" onPress={() => setStep(7)} style={{ backgroundColor: COLORS.secondary }} />
      <Button title="Decline & Find Another" onPress={() => {}} variant="outline" style={{ marginTop: 8, borderColor: COLORS.danger }} textStyle={{ color: COLORS.danger }} />
    </View>
  );

  const renderConfirmation = () => (
    <View style={styles.confirmContainer}>
      <Ionicons name="checkmark-circle" size={80} color={COLORS.secondary} />
      <Text style={styles.confirmTitle}>Booking Confirmed!</Text>
      <Text style={styles.confirmDesc}>Step 3.7 — Payment captured, QR generated, parties notified</Text>

      <View style={styles.confirmCard}>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Booking ID</Text><Text style={styles.confirmValue}>RTL-D-2026-015</Text></View>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Driver</Text><Text style={styles.confirmValue}>Kamal Fernando</Text></View>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Route</Text><Text style={styles.confirmValue}>Colombo → Kandy</Text></View>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Price</Text><Text style={styles.confirmValue}>LKR {price}</Text></View>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Status</Text><StatusBadge status="confirmed" size="sm" /></View>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Payment</Text><StatusBadge status="escrow" size="sm" /></View>
      </View>

      <View style={styles.chatNote}>
        <Ionicons name="chatbubbles-outline" size={18} color={COLORS.primary} />
        <Text style={styles.chatNoteText}>In-app chat now available with driver. Phone numbers are masked for privacy.</Text>
      </View>

      <View style={styles.qrSection}>
        <View style={styles.qrPlaceholder}>
          <Ionicons name="qr-code" size={60} color={COLORS.secondary} />
        </View>
        <Text style={styles.qrText}>Show at pickup for verification</Text>
      </View>

      <Button title="Chat with Driver" onPress={() => {}} style={{ backgroundColor: COLORS.primary }} icon={<Ionicons name="chatbubbles" size={18} color={COLORS.white} />} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} variant="ghost" style={{ marginTop: 8 }} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Directional Delivery</Text>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepIndicatorText}>{step}/7</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${(step / 7) * 100}%`, backgroundColor: COLORS.secondary }]} />
      </View>

      <View style={styles.content}>
        {renderStep()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 12,
    backgroundColor: COLORS.white,
  },
  headerTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.semiBold },
  stepIndicator: {
    backgroundColor: COLORS.secondaryBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
  },
  stepIndicatorText: { color: COLORS.secondary, fontSize: SIZES.sm, ...FONTS.bold },
  progressOuter: { height: 3, backgroundColor: COLORS.gray200 },
  progressInner: { height: '100%', borderRadius: 2 },
  content: { padding: SIZES.padding, paddingBottom: 40 },
  stepTitle: { fontSize: SIZES.xl, color: COLORS.dark, ...FONTS.bold, marginBottom: 4 },
  stepDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 24, ...FONTS.medium },
  howItWorks: { backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16, marginBottom: 16, ...SHADOWS.sm },
  howTitle: { fontSize: SIZES.base, color: COLORS.dark, ...FONTS.bold, marginBottom: 16 },
  howStep: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  howIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  howContent: { flex: 1 },
  howStepTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  howStepDesc: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 2 },
  howConnector: { position: 'absolute', left: 21, top: 44, width: 2, height: 20, backgroundColor: COLORS.secondary + '30' },
  savingsBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.secondaryBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  savingsText: { color: COLORS.secondaryDark, fontSize: SIZES.sm, ...FONTS.medium },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, padding: 14,
    borderWidth: 1, borderColor: COLORS.gray300, marginBottom: 16,
  },
  switchLabel: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  switchDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  sizeNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: COLORS.infoBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  sizeNoteText: { flex: 1, fontSize: SIZES.xs, color: COLORS.info, lineHeight: 16 },
  supplyBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.secondaryBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  supplyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  supplyText: { flex: 1, color: COLORS.secondary, fontSize: SIZES.sm },
  priceCard: {
    backgroundColor: COLORS.secondaryBg, borderRadius: SIZES.radius, padding: 20,
    alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: COLORS.secondary + '30',
  },
  priceLabel: { fontSize: SIZES.sm, color: COLORS.secondaryDark },
  priceRange: { fontSize: 36, color: COLORS.secondaryDark, ...FONTS.bold, marginVertical: 8 },
  priceAlgo: { fontSize: SIZES.xs, color: COLORS.secondary, textAlign: 'center' },
  comparisonCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16, marginBottom: 16,
    ...SHADOWS.sm,
  },
  comparisonTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  comparisonRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  comparisonItem: { alignItems: 'center' },
  comparisonLabel: { fontSize: SIZES.xs, color: COLORS.gray500 },
  comparisonOld: { fontSize: SIZES.xl, color: COLORS.danger, textDecorationLine: 'line-through', ...FONTS.bold },
  comparisonNew: { fontSize: SIZES.xl, color: COLORS.secondary, ...FONTS.bold },
  savingsAmount: {
    flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center',
    marginTop: 12, backgroundColor: COLORS.secondaryBg, padding: 8, borderRadius: 8,
  },
  savingsAmountText: { color: COLORS.secondaryDark, fontSize: SIZES.sm, ...FONTS.semiBold },
  warningBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.accentBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  warningText: { flex: 1, color: COLORS.accentDark, fontSize: SIZES.sm },
  reviewCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16, marginBottom: 16, ...SHADOWS.sm,
  },
  reviewRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  reviewLabel: { fontSize: SIZES.md, color: COLORS.gray600 },
  reviewValue: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  termsBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: COLORS.infoBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 12,
  },
  termsText: { flex: 1, fontSize: SIZES.xs, color: COLORS.info, lineHeight: 16 },
  timerBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.accentBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  timerText: { flex: 1, color: COLORS.accentDark, fontSize: SIZES.sm },
  matchContainer: { alignItems: 'center' },
  matchAnimation: { marginBottom: 20 },
  matchCircle: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: COLORS.secondaryBg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: COLORS.secondary,
  },
  matchTitle: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold },
  matchSubtitle: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 20, textAlign: 'center' },
  driverCard: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: 20,
    alignItems: 'center', marginBottom: 16, ...SHADOWS.md,
  },
  driverAvatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.primaryBg,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  driverName: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold },
  driverBadges: { flexDirection: 'row', gap: 8, marginTop: 8, marginBottom: 12 },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.secondaryBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
  },
  verifiedText: { color: COLORS.secondary, fontSize: SIZES.xs, ...FONTS.medium },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.accentBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
  },
  ratingBadgeText: { color: COLORS.accentDark, fontSize: SIZES.xs, ...FONTS.bold },
  driverMeta: { width: '100%', gap: 8 },
  driverMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  driverMetaText: { fontSize: SIZES.sm, color: COLORS.gray600 },
  autoAcceptNote: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.infoBg, width: '100%', padding: 10, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  autoAcceptText: { flex: 1, color: COLORS.info, fontSize: SIZES.xs },
  confirmContainer: { alignItems: 'center' },
  confirmTitle: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold, marginTop: 12 },
  confirmDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 20 },
  confirmCard: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 16, ...SHADOWS.sm,
  },
  confirmRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  confirmLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  confirmValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.semiBold },
  chatNote: {
    flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%',
    backgroundColor: COLORS.primaryBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  chatNoteText: { flex: 1, color: COLORS.primary, fontSize: SIZES.sm },
  qrSection: { alignItems: 'center', marginBottom: 20 },
  qrPlaceholder: {
    width: 120, height: 120, backgroundColor: COLORS.gray100, borderRadius: SIZES.radius,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  qrText: { fontSize: SIZES.sm, color: COLORS.gray600 },
});

export default DirectionalBookingScreen;
