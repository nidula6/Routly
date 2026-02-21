import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';

const DeliveryConfirmationScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [photoTaken, setPhotoTaken] = useState(false);

  const deliveries = [
    { id: 1, recipient: 'Kumara Silva', address: '28 Peradeniya Road, Kandy', phone: '07X-XXX-4321', parcel: '2.5 kg — Electronics', distance: '1.2 km', status: 'next' },
    { id: 2, recipient: 'Fathima Farhana', address: '15 Lake Road, Kandy', phone: '07X-XXX-8910', parcel: '0.8 kg — Clothing', distance: '3.5 km', status: 'pending' },
  ];

  const renderStep = () => {
    switch (step) {
      case 1: return renderDeliveryList();
      case 2: return renderEnRoute();
      case 3: return renderOTPVerification();
      case 4: return renderPhotoProof();
      case 5: return renderDeliveryComplete();
      case 6: return renderExceptionFlow();
      default: return null;
    }
  };

  const renderDeliveryList = () => (
    <View>
      <Text style={styles.stepTitle}>📦 My Deliveries</Text>
      <Text style={styles.stepDesc}>Step 6.1 — Optimised delivery sequence</Text>

      {deliveries.map((d, i) => (
        <TouchableOpacity key={d.id} style={styles.deliveryCard} onPress={() => setStep(2)}>
          <View style={styles.deliveryHeader}>
            <View style={[styles.seqBadge, d.status === 'next' && { backgroundColor: COLORS.secondary }]}>
              <Text style={styles.seqNum}>{i + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.recipientName}>{d.recipient}</Text>
              <Text style={styles.recipientAddr}>{d.address}</Text>
            </View>
            {d.status === 'next' && <StatusBadge status="in-transit" size="sm" />}
          </View>
          <View style={styles.deliveryInfo}>
            <View style={styles.infoItem}><Ionicons name="cube" size={14} color={COLORS.gray500} /><Text style={styles.infoText}>{d.parcel}</Text></View>
            <View style={styles.infoItem}><Ionicons name="navigate" size={14} color={COLORS.gray500} /><Text style={styles.infoText}>{d.distance} away</Text></View>
          </View>
          <View style={styles.navAction}>
            <Ionicons name="navigate" size={16} color={COLORS.secondary} />
            <Text style={styles.navActionText}>Navigate to Delivery</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEnRoute = () => (
    <View>
      <Text style={styles.stepTitle}>🚗 En Route to Delivery</Text>
      <Text style={styles.stepDesc}>Step 6.2 — GPS tracking every 60 seconds for sender & recipient</Text>

      <View style={styles.mapPlaceholder}>
        <Ionicons name="car" size={48} color={COLORS.secondary} />
        <Text style={styles.mapText}>Live Tracking Active</Text>
        <Text style={styles.mapSub}>Recipient can see your real-time location</Text>
      </View>

      <View style={styles.recipientCard}>
        <View style={styles.recipientRow}>
          <Ionicons name="person-circle" size={40} color={COLORS.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardName}>Kumara Silva</Text>
            <Text style={styles.cardAddr}>28 Peradeniya Road, Kandy</Text>
          </View>
        </View>
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactBtn}>
            <Ionicons name="call" size={16} color={COLORS.white} />
            <Text style={styles.contactBtnText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactBtn, { backgroundColor: COLORS.info }]}>
            <Ionicons name="chatbox" size={16} color={COLORS.white} />
            <Text style={styles.contactBtnText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.etaCard}>
        <Ionicons name="time" size={20} color={COLORS.secondary} />
        <View>
          <Text style={styles.etaText}>Estimated Arrival</Text>
          <Text style={styles.etaValue}>4 minutes — 1.2 km remaining</Text>
        </View>
      </View>

      <View style={styles.gpsNote}>
        <Ionicons name="radio" size={14} color={COLORS.info} />
        <Text style={styles.gpsNoteText}>GPS position logged every 60s. Route data stored for 90 days. Accessible as dispute evidence.</Text>
      </View>

      <Button title="I've Arrived" onPress={() => setStep(3)} style={{ backgroundColor: COLORS.secondary }} icon={<Ionicons name="location" size={18} color={COLORS.white} />} />
    </View>
  );

  const renderOTPVerification = () => (
    <View>
      <Text style={styles.stepTitle}>🔐 OTP Verification</Text>
      <Text style={styles.stepDesc}>Step 6.3 — Ask recipient for their 4-digit OTP code</Text>

      <View style={styles.otpExplain}>
        <Ionicons name="shield-checkmark" size={32} color={COLORS.primary} />
        <Text style={styles.otpExplainText}>The recipient received a 4-digit OTP via SMS. Ask them to share it with you to confirm delivery.</Text>
      </View>

      <View style={styles.otpContainer}>
        {otpDigits.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.otpBox, d && styles.otpBoxFilled]}
            onPress={() => {
              const newDigits = [...otpDigits];
              newDigits[i] = String(Math.floor(Math.random() * 10));
              setOtpDigits(newDigits);
            }}
          >
            <Text style={[styles.otpDigit, d && styles.otpDigitFilled]}>{d || '—'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.otpHint}>Tap each box to simulate digit entry</Text>

      <View style={styles.otpSecurity}>
        <Text style={styles.otpSecLabel}>Security Features:</Text>
        <View style={styles.otpSecItem}><Ionicons name="checkmark" size={14} color={COLORS.secondary} /><Text style={styles.otpSecText}>3 attempt limit — prevents brute force</Text></View>
        <View style={styles.otpSecItem}><Ionicons name="checkmark" size={14} color={COLORS.secondary} /><Text style={styles.otpSecText}>5-minute expiry — time limited</Text></View>
        <View style={styles.otpSecItem}><Ionicons name="checkmark" size={14} color={COLORS.secondary} /><Text style={styles.otpSecText}>Single-use — invalidated after verification</Text></View>
      </View>

      <Button
        title="Verify OTP"
        onPress={() => setStep(4)}
        disabled={otpDigits.some((d) => !d)}
        style={{ backgroundColor: COLORS.primary }}
      />

      <TouchableOpacity style={styles.exceptionLink} onPress={() => setStep(6)}>
        <Ionicons name="alert-circle" size={16} color={COLORS.danger} />
        <Text style={styles.exceptionLinkText}>Recipient unavailable / Delivery refused</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPhotoProof = () => (
    <View>
      <Text style={styles.stepTitle}>📸 Delivery Photo</Text>
      <Text style={styles.stepDesc}>Step 6.4 — Capture proof of delivery for records</Text>

      {!photoTaken ? (
        <>
          <View style={styles.cameraPlaceholder}>
            <Ionicons name="camera" size={64} color={COLORS.gray400} />
            <Text style={styles.cameraText}>Take photo of parcel with recipient</Text>
            <Text style={styles.cameraSub}>GPS + timestamp auto-tagged</Text>
          </View>

          <View style={styles.photoTips}>
            <Text style={styles.tipsTitle}>Photo Requirements:</Text>
            <Text style={styles.tipItem}>• Clear view of parcel being received</Text>
            <Text style={styles.tipItem}>• Show parcel condition (intact packaging)</Text>
            <Text style={styles.tipItem}>• Ensure adequate lighting</Text>
          </View>

          <Button
            title="Take Delivery Photo"
            onPress={() => setPhotoTaken(true)}
            style={{ backgroundColor: COLORS.primary }}
            icon={<Ionicons name="camera" size={18} color={COLORS.white} />}
          />
        </>
      ) : (
        <>
          <View style={styles.photoSuccess}>
            <Ionicons name="image" size={64} color={COLORS.secondary} />
            <Text style={styles.photoSuccessTitle}>Photo Captured ✓</Text>
            <Text style={styles.photoSuccessDesc}>GPS: 7.2906° N, 80.6337° E • UTC: 2026-01-15T14:32:00Z</Text>
          </View>

          <View style={styles.uploadStatus}>
            <Ionicons name="cloud-done" size={18} color={COLORS.secondary} />
            <Text style={styles.uploadText}>Uploaded to secure cloud storage</Text>
          </View>

          <Button title="Confirm Delivery" onPress={() => setStep(5)} style={{ backgroundColor: COLORS.secondary }} />
        </>
      )}
    </View>
  );

  const renderDeliveryComplete = () => (
    <View style={styles.completeContainer}>
      <Ionicons name="checkmark-circle" size={80} color={COLORS.secondary} />
      <Text style={styles.completeTitle}>Delivery Confirmed! ✓</Text>
      <Text style={styles.completeDesc}>Step 6.5 — All verification layers passed</Text>

      <View style={styles.completeCard}>
        <Text style={styles.completeCardTitle}>Verification Summary</Text>
        <View style={styles.checkItem}><Ionicons name="checkmark-circle" size={18} color={COLORS.secondary} /><Text style={styles.checkText}>GPS arrival confirmed (within 200m)</Text></View>
        <View style={styles.checkItem}><Ionicons name="checkmark-circle" size={18} color={COLORS.secondary} /><Text style={styles.checkText}>OTP verified from recipient</Text></View>
        <View style={styles.checkItem}><Ionicons name="checkmark-circle" size={18} color={COLORS.secondary} /><Text style={styles.checkText}>Delivery photo captured & uploaded</Text></View>
        <View style={styles.checkItem}><Ionicons name="checkmark-circle" size={18} color={COLORS.secondary} /><Text style={styles.checkText}>Sender and recipient notified</Text></View>
      </View>

      <View style={styles.paymentNote}>
        <Ionicons name="cash" size={20} color={COLORS.accentDark} />
        <View>
          <Text style={styles.paymentNoteTitle}>Earnings Updated</Text>
          <Text style={styles.paymentNoteText}>LKR 350 added to pending balance. Will be released after 24-hour dispute window.</Text>
        </View>
      </View>

      <View style={styles.disputeWindow}>
        <Ionicons name="hourglass" size={16} color={COLORS.info} />
        <Text style={styles.disputeText}>24-hour dispute window starts now. If no dispute raised, payment auto-released to your account.</Text>
      </View>

      <Button title="Next Delivery" onPress={() => { setStep(1); setPhotoTaken(false); setOtpDigits(['','','','']); }} style={{ backgroundColor: COLORS.primary }} />
      <Button title="Back to Dashboard" onPress={() => navigation.navigate('DriverDashboard')} variant="outline" style={{ marginTop: 8, borderColor: COLORS.primary }} textStyle={{ color: COLORS.primary }} />
    </View>
  );

  const renderExceptionFlow = () => (
    <View>
      <Text style={styles.stepTitle}>⚠️ Delivery Exception</Text>
      <Text style={styles.stepDesc}>Step 6.6–6.7 — Recipient unavailable or delivery refused</Text>

      <View style={styles.exceptionCard}>
        <Text style={styles.exceptionTitle}>What happened?</Text>

        {[
          { icon: 'person-remove', title: 'Recipient Not Available', desc: 'No one at delivery address. Safe-drop or return protocol.', color: COLORS.accent },
          { icon: 'hand-left', title: 'Delivery Refused', desc: 'Recipient rejected parcel. Wrong item / damaged / changed mind.', color: COLORS.danger },
          { icon: 'location-outline', title: 'Cannot Find Address', desc: 'Address incorrect or inaccessible.', color: COLORS.info },
        ].map((exc, i) => (
          <TouchableOpacity key={i} style={styles.exceptionOption}>
            <View style={[styles.exceptionIcon, { backgroundColor: exc.color + '20' }]}>
              <Ionicons name={exc.icon} size={24} color={exc.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.exceptionOptTitle}>{exc.title}</Text>
              <Text style={styles.exceptionOptDesc}>{exc.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.gray400} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.protocolNote}>
        <Text style={styles.protocolTitle}>Protocol for Undeliverable Parcels:</Text>
        <Text style={styles.protocolItem}>1. Attempt contact via in-app call/chat</Text>
        <Text style={styles.protocolItem}>2. Wait 10 minutes at location (GPS verified)</Text>
        <Text style={styles.protocolItem}>3. Take photo proof of attempt</Text>
        <Text style={styles.protocolItem}>4. Mark as "Delivery Failed" with reason</Text>
        <Text style={styles.protocolItem}>5. Return parcel to nearest hub or safe storage</Text>
        <Text style={styles.protocolItem}>6. System schedules redelivery or refund</Text>
      </View>

      <Button title="Go Back to OTP Step" onPress={() => setStep(3)} variant="outline" style={{ borderColor: COLORS.gray400 }} textStyle={{ color: COLORS.gray600 }} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery & Confirmation</Text>
        <View style={[styles.stepBadge, { backgroundColor: COLORS.secondaryBg }]}>
          <Text style={[styles.stepBadgeText, { color: COLORS.secondaryDark }]}>{step > 6 ? 6 : step}/6</Text>
        </View>
      </View>
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${(Math.min(step, 6) / 6) * 100}%`, backgroundColor: COLORS.secondary }]} />
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
  deliveryCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 14,
    marginBottom: 12, ...SHADOWS.md,
  },
  deliveryHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  seqBadge: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.gray400,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  seqNum: { color: COLORS.white, fontSize: SIZES.sm, ...FONTS.bold },
  recipientName: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  recipientAddr: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 2 },
  deliveryInfo: { gap: 4, marginLeft: 38, marginBottom: 10 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { fontSize: SIZES.xs, color: COLORS.gray500 },
  navAction: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.secondaryBg, borderRadius: 8, padding: 10,
  },
  navActionText: { color: COLORS.secondary, fontSize: SIZES.sm, ...FONTS.medium },
  mapPlaceholder: {
    backgroundColor: COLORS.gray100, borderRadius: SIZES.radius, padding: 40,
    alignItems: 'center', marginBottom: 16,
  },
  mapText: { fontSize: SIZES.base, color: COLORS.secondary, ...FONTS.semiBold, marginTop: 8 },
  mapSub: { fontSize: SIZES.sm, color: COLORS.gray500, marginTop: 4 },
  recipientCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 14,
    marginBottom: 12, ...SHADOWS.sm,
  },
  recipientRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  cardName: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  cardAddr: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 2 },
  contactRow: { flexDirection: 'row', gap: 10 },
  contactBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.secondary, paddingVertical: 10, borderRadius: 8,
  },
  contactBtnText: { color: COLORS.white, fontSize: SIZES.sm, ...FONTS.medium },
  etaCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.secondaryBg, padding: 14, borderRadius: SIZES.radius, marginBottom: 12,
  },
  etaText: { fontSize: SIZES.sm, color: COLORS.gray600 },
  etaValue: { fontSize: SIZES.md, color: COLORS.secondaryDark, ...FONTS.semiBold },
  gpsNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    marginBottom: 16, padding: 8,
  },
  gpsNoteText: { flex: 1, fontSize: SIZES.xs, color: COLORS.gray500, lineHeight: 16 },
  otpExplain: {
    alignItems: 'center', marginBottom: 24,
  },
  otpExplainText: { textAlign: 'center', color: COLORS.gray600, fontSize: SIZES.sm, marginTop: 8 },
  otpContainer: {
    flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 8,
  },
  otpBox: {
    width: 60, height: 70, borderWidth: 2, borderColor: COLORS.gray300,
    borderRadius: SIZES.radius, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white,
  },
  otpBoxFilled: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryBg },
  otpDigit: { fontSize: 28, color: COLORS.gray400, ...FONTS.bold },
  otpDigitFilled: { color: COLORS.primary },
  otpHint: { textAlign: 'center', fontSize: SIZES.xs, color: COLORS.gray400, marginBottom: 20 },
  otpSecurity: {
    backgroundColor: COLORS.gray50, padding: 14, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  otpSecLabel: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 8 },
  otpSecItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  otpSecText: { fontSize: SIZES.xs, color: COLORS.gray600 },
  exceptionLink: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    marginTop: 16,
  },
  exceptionLinkText: { color: COLORS.danger, fontSize: SIZES.sm, textDecorationLine: 'underline' },
  cameraPlaceholder: {
    backgroundColor: COLORS.gray100, borderRadius: SIZES.radius, padding: 50,
    alignItems: 'center', marginBottom: 16,
  },
  cameraText: { fontSize: SIZES.md, color: COLORS.gray600, marginTop: 12, ...FONTS.medium },
  cameraSub: { fontSize: SIZES.xs, color: COLORS.gray400, marginTop: 4 },
  photoTips: {
    backgroundColor: COLORS.gray50, padding: 14, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  tipsTitle: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 6 },
  tipItem: { fontSize: SIZES.xs, color: COLORS.gray600, marginBottom: 2 },
  photoSuccess: { alignItems: 'center', marginBottom: 16 },
  photoSuccessTitle: { fontSize: SIZES.xl, color: COLORS.secondary, ...FONTS.bold, marginTop: 8 },
  photoSuccessDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 4, textAlign: 'center' },
  uploadStatus: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    marginBottom: 16,
  },
  uploadText: { fontSize: SIZES.sm, color: COLORS.secondary, ...FONTS.medium },
  completeContainer: { alignItems: 'center' },
  completeTitle: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold, marginTop: 12 },
  completeDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 20, textAlign: 'center' },
  completeCard: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 16, ...SHADOWS.sm,
  },
  completeCardTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  checkText: { fontSize: SIZES.sm, color: COLORS.gray600, flex: 1 },
  paymentNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12, width: '100%',
    backgroundColor: COLORS.accentBg, padding: 14, borderRadius: SIZES.radius, marginBottom: 12,
  },
  paymentNoteTitle: { fontSize: SIZES.sm, color: COLORS.accentDark, ...FONTS.semiBold },
  paymentNoteText: { fontSize: SIZES.xs, color: COLORS.accentDark, marginTop: 2 },
  disputeWindow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8, width: '100%',
    backgroundColor: COLORS.infoBg, padding: 14, borderRadius: SIZES.radius, marginBottom: 20,
  },
  disputeText: { flex: 1, fontSize: SIZES.xs, color: COLORS.info, lineHeight: 16 },
  exceptionCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 16, ...SHADOWS.sm,
  },
  exceptionTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 14 },
  exceptionOption: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  exceptionIcon: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
  },
  exceptionOptTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  exceptionOptDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  protocolNote: {
    backgroundColor: COLORS.accentBg, padding: 14, borderRadius: SIZES.radiusSm,
    marginBottom: 16, borderLeftWidth: 4, borderLeftColor: COLORS.accent,
  },
  protocolTitle: { fontSize: SIZES.sm, color: COLORS.accentDark, ...FONTS.semiBold, marginBottom: 8 },
  protocolItem: { fontSize: SIZES.xs, color: COLORS.accentDark, marginBottom: 4 },
});

export default DeliveryConfirmationScreen;
