import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import StatusBadge from '../../components/StatusBadge';

const CourierBookingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [declaredValue, setDeclaredValue] = useState('');
  const [fragile, setFragile] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [insurance, setInsurance] = useState(true);

  const courierQuotes = [
    { id: 'domex', name: 'Domex', price: 'LKR 650', eta: '1-2 days', rating: 4.2, reliability: '88%', logo: 'speedometer' },
    { id: 'koombiyo', name: 'Koombiyo', price: 'LKR 580', eta: '2-3 days', rating: 3.8, reliability: '65%', logo: 'flash', warning: '65% success rate on this route' },
    { id: 'promptxp', name: 'PromptXP', price: 'LKR 720', eta: '1 day', rating: 4.5, reliability: '92%', logo: 'rocket', recommended: true },
  ];

  const renderStep = () => {
    switch (step) {
      case 1: return renderAddressStep();
      case 2: return renderParcelStep();
      case 3: return renderCompareCouriers();
      case 4: return renderInsurance();
      case 5: return renderPaymentConfirm();
      case 6: return renderBookingSuccess();
      default: return null;
    }
  };

  const renderAddressStep = () => (
    <View>
      <Text style={styles.stepTitle}>📍 Pickup & Delivery Addresses</Text>
      <Text style={styles.stepDesc}>Step 2.2 — Enter origin and destination with auto-complete</Text>
      
      <InputField
        label="Pickup Address"
        value={pickupAddress}
        onChangeText={setPickupAddress}
        placeholder="Enter pickup address or use GPS"
        icon={<Ionicons name="location" size={18} color={COLORS.primary} />}
      />
      
      <TouchableOpacity style={styles.gpsBtn}>
        <Ionicons name="navigate" size={16} color={COLORS.primary} />
        <Text style={styles.gpsBtnText}>Use Current Location</Text>
      </TouchableOpacity>

      <InputField
        label="Delivery Address"
        value={deliveryAddress}
        onChangeText={setDeliveryAddress}
        placeholder="Enter delivery address"
        icon={<Ionicons name="location" size={18} color={COLORS.danger} />}
      />

      <View style={styles.distanceBanner}>
        <Ionicons name="navigate-outline" size={18} color={COLORS.info} />
        <Text style={styles.distanceText}>Estimated distance: 115 km (Colombo → Kandy corridor)</Text>
      </View>

      <Button title="Continue to Parcel Details" onPress={() => setStep(2)} />
    </View>
  );

  const renderParcelStep = () => (
    <View>
      <Text style={styles.stepTitle}>📦 Parcel Details</Text>
      <Text style={styles.stepDesc}>Step 2.3 — Enter weight, dimensions, and value for accurate quotes</Text>

      <InputField label="Weight (kg)" value={weight} onChangeText={setWeight} placeholder="e.g., 2.5" keyboardType="decimal-pad"
        icon={<Ionicons name="scale-outline" size={18} color={COLORS.gray500} />}
      />
      <InputField label="Declared Value (LKR)" value={declaredValue} onChangeText={setDeclaredValue} placeholder="e.g., 5000" keyboardType="number-pad"
        icon={<Ionicons name="cash-outline" size={18} color={COLORS.gray500} />}
      />

      <View style={styles.switchRow}>
        <View>
          <Text style={styles.switchLabel}>Fragile Parcel</Text>
          <Text style={styles.switchDesc}>Mark if parcel requires careful handling</Text>
        </View>
        <Switch value={fragile} onValueChange={setFragile} trackColor={{ true: COLORS.primaryLight }} thumbColor={fragile ? COLORS.primary : COLORS.gray400} />
      </View>

      <View style={styles.sizeOptions}>
        <Text style={styles.inputLabel}>Parcel Size</Text>
        <View style={styles.sizeRow}>
          {['Small', 'Medium', 'Large', 'Custom'].map((size) => (
            <TouchableOpacity key={size} style={styles.sizeOption}>
              <Ionicons name="cube-outline" size={20} color={COLORS.primary} />
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button title="Get Courier Quotes" onPress={() => setStep(3)} style={{ marginTop: 16 }} />
    </View>
  );

  const renderCompareCouriers = () => (
    <View>
      <Text style={styles.stepTitle}>🔍 Compare Couriers</Text>
      <Text style={styles.stepDesc}>Step 2.5 — Ranked by Performance Intelligence Engine (price + reliability)</Text>

      <View style={styles.apiTimeBanner}>
        <Ionicons name="flash" size={16} color={COLORS.secondary} />
        <Text style={styles.apiTimeText}>3 courier APIs queried in 2.1 seconds</Text>
      </View>

      {courierQuotes.map((courier) => (
        <TouchableOpacity
          key={courier.id}
          style={[styles.courierCard, selectedCourier === courier.id && styles.courierSelected]}
          onPress={() => setSelectedCourier(courier.id)}
        >
          {courier.recommended && (
            <View style={styles.recommendBadge}>
              <Text style={styles.recommendText}>⚡ Recommended</Text>
            </View>
          )}
          
          <View style={styles.courierHeader}>
            <View style={styles.courierInfo}>
              <Ionicons name={courier.logo} size={24} color={COLORS.primary} />
              <View>
                <Text style={styles.courierName}>{courier.name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color={COLORS.accent} />
                  <Text style={styles.ratingText}>{courier.rating}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.courierPrice}>{courier.price}</Text>
          </View>

          <View style={styles.courierMeta}>
            <View style={styles.courierMetaItem}>
              <Ionicons name="time-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.courierMetaText}>{courier.eta}</Text>
            </View>
            <View style={styles.courierMetaItem}>
              <Ionicons name="shield-checkmark-outline" size={14} color={courier.reliability >= '85%' ? COLORS.secondary : COLORS.accent} />
              <Text style={[styles.courierMetaText, { color: courier.reliability >= '85%' ? COLORS.secondary : COLORS.accent }]}>
                {courier.reliability} reliable
              </Text>
            </View>
          </View>

          {courier.warning && (
            <View style={styles.warningBanner}>
              <Ionicons name="warning-outline" size={14} color={COLORS.accent} />
              <Text style={styles.warningText}>{courier.warning}</Text>
            </View>
          )}

          <View style={styles.radioContainer}>
            <View style={[styles.radio, selectedCourier === courier.id && styles.radioSelected]}>
              {selectedCourier === courier.id && <View style={styles.radioFill} />}
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <Button title="Select & Continue" onPress={() => setStep(4)} disabled={!selectedCourier} style={{ marginTop: 12 }} />
    </View>
  );

  const renderInsurance = () => (
    <View>
      <Text style={styles.stepTitle}>🛡️ Insurance & Protection</Text>
      <Text style={styles.stepDesc}>Step 2.6 — Optional insurance covers up to LKR 25,000</Text>

      <View style={styles.insuranceCard}>
        <View style={styles.insuranceHeader}>
          <Ionicons name="shield-checkmark" size={32} color={COLORS.secondary} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.insuranceTitle}>Parcel Insurance</Text>
            <Text style={styles.insuranceDesc}>Covers damage, loss, and theft during transit</Text>
          </View>
          <Switch value={insurance} onValueChange={setInsurance} trackColor={{ true: COLORS.secondaryLight }} thumbColor={insurance ? COLORS.secondary : COLORS.gray400} />
        </View>
        
        <View style={styles.insuranceDetails}>
          <View style={styles.insuranceItem}>
            <Text style={styles.insuranceLabel}>Coverage</Text>
            <Text style={styles.insuranceValue}>Up to LKR 25,000</Text>
          </View>
          <View style={styles.insuranceItem}>
            <Text style={styles.insuranceLabel}>Premium</Text>
            <Text style={styles.insuranceValue}>LKR 35 (flat fee)</Text>
          </View>
          <View style={styles.insuranceItem}>
            <Text style={styles.insuranceLabel}>Claims</Text>
            <Text style={styles.insuranceValue}>Auto-initiated on dispute</Text>
          </View>
        </View>
      </View>

      <Button title="Proceed to Payment" onPress={() => setStep(5)} style={{ marginTop: 16 }} />
    </View>
  );

  const renderPaymentConfirm = () => (
    <View>
      <Text style={styles.stepTitle}>💳 Payment & Confirmation</Text>
      <Text style={styles.stepDesc}>Step 2.7 — Secure escrow payment. Funds held until delivery confirmed.</Text>

      <View style={styles.priceBreakdown}>
        <Text style={styles.breakdownTitle}>Price Breakdown</Text>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Delivery Fee (PromptXP)</Text>
          <Text style={styles.breakdownValue}>LKR 720</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Insurance Coverage</Text>
          <Text style={styles.breakdownValue}>LKR 35</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Platform Service Fee</Text>
          <Text style={styles.breakdownValue}>LKR 25</Text>
        </View>
        <View style={styles.breakdownDivider} />
        <View style={styles.breakdownRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>LKR 780</Text>
        </View>
      </View>

      {/* Payment methods */}
      <Text style={styles.paymentMethodTitle}>Payment Method</Text>
      {['Visa •••• 3456', 'iPay Wallet', 'PayHere', 'genie'].map((method, i) => (
        <TouchableOpacity key={i} style={styles.paymentMethod}>
          <Ionicons name={i === 0 ? 'card' : 'wallet'} size={20} color={COLORS.primary} />
          <Text style={styles.paymentMethodText}>{method}</Text>
          {i === 0 && <View style={styles.defaultBadge}><Text style={styles.defaultText}>Default</Text></View>}
          <Ionicons name="chevron-forward" size={18} color={COLORS.gray400} />
        </TouchableOpacity>
      ))}

      <View style={styles.escrowNote}>
        <Ionicons name="lock-closed" size={16} color={COLORS.info} />
        <Text style={styles.escrowText}>Funds held in secure escrow until delivery is confirmed. 24-hour dispute window after delivery.</Text>
      </View>

      <Button title="Pay LKR 780 Securely" onPress={() => setStep(6)} style={{ marginTop: 16 }} />
    </View>
  );

  const renderBookingSuccess = () => (
    <View style={styles.successContainer}>
      <View style={styles.successIcon}>
        <Ionicons name="checkmark-circle" size={80} color={COLORS.secondary} />
      </View>
      <Text style={styles.successTitle}>Booking Confirmed! 🎉</Text>
      <Text style={styles.successDesc}>Step 2.8 — Your parcel is booked with PromptXP</Text>

      <View style={styles.successCard}>
        <View style={styles.successRow}><Text style={styles.successLabel}>Booking ID</Text><Text style={styles.successValue}>RTL-2026-004</Text></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>Tracking #</Text><Text style={styles.successValue}>PXP-887456</Text></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>Courier</Text><Text style={styles.successValue}>PromptXP</Text></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>Status</Text><StatusBadge status="confirmed" size="sm" /></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>Payment</Text><StatusBadge status="escrow" size="sm" /></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>ETA</Text><Text style={styles.successValue}>1 day</Text></View>
      </View>

      <View style={styles.qrSection}>
        <View style={styles.qrPlaceholder}>
          <Ionicons name="qr-code" size={80} color={COLORS.primary} />
        </View>
        <Text style={styles.qrText}>Show this QR code at pickup</Text>
        <Text style={styles.qrSubtext}>Valid for 2 hours · One-time use · HMAC signed</Text>
      </View>

      <View style={styles.recipientNote}>
        <Ionicons name="chatbubble-outline" size={16} color={COLORS.secondary} />
        <Text style={styles.recipientNoteText}>Recipient notified via SMS with tracking link</Text>
      </View>

      <Button title="Track My Order" onPress={() => navigation.navigate('TrackOrder')} style={{ marginTop: 16 }} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} variant="ghost" style={{ marginTop: 8 }} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          {[1,2,3,4,5,6].map((s) => (
            <View key={s} style={[styles.progressDot, s <= step && { backgroundColor: COLORS.primary }]}>
              {s < step && <Ionicons name="checkmark" size={10} color={COLORS.white} />}
              {s === step && <Text style={styles.progressNum}>{s}</Text>}
            </View>
          ))}
          <View style={styles.progressLine}>
            <View style={[styles.progressFill, { width: `${((step - 1) / 5) * 100}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {renderStep()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  progressContainer: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 16,
    backgroundColor: COLORS.white,
  },
  backBtn: { marginRight: 12 },
  progressBar: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative' },
  progressDot: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.gray300,
    alignItems: 'center', justifyContent: 'center', zIndex: 2,
  },
  progressNum: { color: COLORS.white, fontSize: 10, ...FONTS.bold },
  progressLine: {
    position: 'absolute', left: 12, right: 12, top: 11, height: 2,
    backgroundColor: COLORS.gray300, zIndex: 1,
  },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 1 },
  content: { padding: SIZES.padding, paddingBottom: 40 },
  stepTitle: { fontSize: SIZES.xl, color: COLORS.dark, ...FONTS.bold, marginBottom: 4 },
  stepDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 24, ...FONTS.medium },
  gpsBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-start', marginBottom: 16, marginTop: -8,
  },
  gpsBtnText: { color: COLORS.primary, fontSize: SIZES.sm, ...FONTS.medium },
  distanceBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.infoBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  distanceText: { color: COLORS.info, fontSize: SIZES.sm },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, padding: 14,
    borderWidth: 1, borderColor: COLORS.gray300, marginBottom: 16,
  },
  switchLabel: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  switchDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  inputLabel: { fontSize: SIZES.md, color: COLORS.gray700, marginBottom: 8, ...FONTS.medium },
  sizeOptions: { marginBottom: 8 },
  sizeRow: { flexDirection: 'row', gap: 8 },
  sizeOption: {
    flex: 1, alignItems: 'center', padding: 12,
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm,
    borderWidth: 1, borderColor: COLORS.gray300,
  },
  sizeText: { fontSize: SIZES.xs, color: COLORS.gray600, marginTop: 4, ...FONTS.medium },
  apiTimeBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.secondaryBg, padding: 10, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  apiTimeText: { color: COLORS.secondary, fontSize: SIZES.sm, ...FONTS.medium },
  courierCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 10, borderWidth: 1.5, borderColor: COLORS.gray300,
    position: 'relative', ...SHADOWS.sm,
  },
  courierSelected: { borderColor: COLORS.primary, borderWidth: 2 },
  recommendBadge: {
    position: 'absolute', top: -8, right: 12,
    backgroundColor: COLORS.primary, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3,
  },
  recommendText: { color: COLORS.white, fontSize: 10, ...FONTS.bold },
  courierHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  courierInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  courierName: { fontSize: SIZES.base, color: COLORS.dark, ...FONTS.semiBold },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  ratingText: { fontSize: SIZES.xs, color: COLORS.gray600 },
  courierPrice: { fontSize: SIZES.xl, color: COLORS.dark, ...FONTS.bold },
  courierMeta: { flexDirection: 'row', gap: 16, marginTop: 10 },
  courierMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  courierMetaText: { fontSize: SIZES.sm, color: COLORS.gray600 },
  warningBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.accentBg, padding: 8, borderRadius: 6, marginTop: 8,
  },
  warningText: { fontSize: SIZES.xs, color: COLORS.accentDark },
  radioContainer: { position: 'absolute', top: 16, left: 16 },
  radio: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: COLORS.gray400,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: COLORS.primary },
  radioFill: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  insuranceCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    borderWidth: 1, borderColor: COLORS.gray300, ...SHADOWS.sm,
  },
  insuranceHeader: { flexDirection: 'row', alignItems: 'center' },
  insuranceTitle: { fontSize: SIZES.base, color: COLORS.dark, ...FONTS.semiBold },
  insuranceDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  insuranceDetails: { marginTop: 16, gap: 10 },
  insuranceItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: COLORS.gray200,
  },
  insuranceLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  insuranceValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  priceBreakdown: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 20, ...SHADOWS.sm,
  },
  breakdownTitle: { fontSize: SIZES.base, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  breakdownRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6,
  },
  breakdownLabel: { fontSize: SIZES.md, color: COLORS.gray600 },
  breakdownValue: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  breakdownDivider: { height: 1, backgroundColor: COLORS.gray300, marginVertical: 8 },
  totalLabel: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold },
  totalValue: { fontSize: SIZES.lg, color: COLORS.primary, ...FONTS.bold },
  paymentMethodTitle: { fontSize: SIZES.base, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 10 },
  paymentMethod: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, padding: 14,
    marginBottom: 8, ...SHADOWS.sm,
  },
  paymentMethodText: { flex: 1, fontSize: SIZES.md, color: COLORS.dark },
  defaultBadge: { backgroundColor: COLORS.primaryBg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  defaultText: { fontSize: 10, color: COLORS.primary, ...FONTS.medium },
  escrowNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: COLORS.infoBg, padding: 12, borderRadius: SIZES.radiusSm, marginTop: 12,
  },
  escrowText: { flex: 1, fontSize: SIZES.xs, color: COLORS.info, lineHeight: 16 },
  successContainer: { alignItems: 'center' },
  successIcon: { marginBottom: 16 },
  successTitle: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold },
  successDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 24 },
  successCard: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 20, ...SHADOWS.sm,
  },
  successRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  successLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  successValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.semiBold },
  qrSection: { alignItems: 'center', marginBottom: 16 },
  qrPlaceholder: {
    width: 140, height: 140, backgroundColor: COLORS.gray100, borderRadius: SIZES.radius,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  qrText: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  qrSubtext: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 4 },
  recipientNote: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.secondaryBg, width: '100%', padding: 12, borderRadius: SIZES.radiusSm,
  },
  recipientNoteText: { color: COLORS.secondary, fontSize: SIZES.sm },
});

export default CourierBookingScreen;
