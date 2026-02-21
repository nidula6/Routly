import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';

const PickupVerificationScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [qrScanned, setQrScanned] = useState(false);
  const [photosTaken, setPhotosTaken] = useState(0);

  const pickups = [
    { id: 1, sender: 'Amal Perera', address: '45 Galle Road, Colombo 03', phone: '07X-XXX-3456', parcel: '2.5 kg — Electronics', status: 'next', eta: '5 min' },
    { id: 2, sender: 'Sarah Kumari', address: '12 Baseline Road, Colombo 07', phone: '07X-XXX-7890', parcel: '1.2 kg — Documents', status: 'pending', eta: '25 min' },
  ];

  const renderStep = () => {
    switch (step) {
      case 1: return renderPickupList();
      case 2: return renderArrival();
      case 3: return renderQRScan();
      case 4: return renderPhotoCapture();
      case 5: return renderPickupConfirmed();
      default: return null;
    }
  };

  const renderPickupList = () => (
    <View>
      <Text style={styles.stepTitle}>📋 My Pickups Today</Text>
      <Text style={styles.stepDesc}>Step 5.1 — Optimised pickup sequence with navigation</Text>

      {pickups.map((pickup, i) => (
        <TouchableOpacity key={pickup.id} style={styles.pickupCard} onPress={() => setStep(2)}>
          <View style={styles.pickupHeader}>
            <View style={[styles.sequenceBadge, pickup.status === 'next' && { backgroundColor: COLORS.accent }]}>
              <Text style={styles.sequenceNum}>{i + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.pickupSender}>{pickup.sender}</Text>
              <Text style={styles.pickupAddress}>{pickup.address}</Text>
            </View>
            {pickup.status === 'next' && <StatusBadge status="confirmed" size="sm" />}
          </View>
          <View style={styles.pickupDetails}>
            <View style={styles.pickupDetailItem}>
              <Ionicons name="call-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.pickupDetailText}>{pickup.phone} (masked)</Text>
            </View>
            <View style={styles.pickupDetailItem}>
              <Ionicons name="cube-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.pickupDetailText}>{pickup.parcel}</Text>
            </View>
            <View style={styles.pickupDetailItem}>
              <Ionicons name="time-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.pickupDetailText}>ETA: {pickup.eta}</Text>
            </View>
          </View>
          <View style={styles.pickupAction}>
            <Ionicons name="navigate" size={16} color={COLORS.info} />
            <Text style={styles.pickupActionText}>Navigate to Pickup</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.tspNote}>
        <Ionicons name="git-branch-outline" size={16} color={COLORS.info} />
        <Text style={styles.tspNoteText}>Pickup sequence optimised using Travelling Salesman Problem algorithm for minimum total travel distance.</Text>
      </View>
    </View>
  );

  const renderArrival = () => (
    <View>
      <Text style={styles.stepTitle}>📍 Arriving at Pickup</Text>
      <Text style={styles.stepDesc}>Step 5.2 — GPS validates you're within 200m of pickup address</Text>

      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={48} color={COLORS.info} />
        <Text style={styles.mapText}>Live GPS Tracking</Text>
        <Text style={styles.mapSubtext}>You are 85m from pickup location</Text>
      </View>

      <View style={styles.senderCard}>
        <View style={styles.senderHeader}>
          <Ionicons name="person-circle" size={40} color={COLORS.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.senderName}>Amal Perera</Text>
            <Text style={styles.senderAddress}>45 Galle Road, Colombo 03</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.gpsStatus}>
        <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
        <Text style={styles.gpsStatusText}>GPS confirmed — Within 200m of pickup address</Text>
      </View>

      <Button title="I've Arrived — Scan QR Code" onPress={() => setStep(3)} style={{ backgroundColor: COLORS.accent }} icon={<Ionicons name="scan" size={18} color={COLORS.white} />} />

      <TouchableOpacity style={styles.overrideBtn}>
        <Text style={styles.overrideText}>Override: Not at exact location (will be flagged for review)</Text>
      </TouchableOpacity>
    </View>
  );

  const renderQRScan = () => (
    <View>
      <Text style={styles.stepTitle}>📱 Scan QR Code</Text>
      <Text style={styles.stepDesc}>Step 5.3 — Ask sender to show QR code on their phone</Text>

      {!qrScanned ? (
        <>
          <View style={styles.scannerPlaceholder}>
            <View style={styles.scannerFrame}>
              <Ionicons name="scan-outline" size={80} color={COLORS.primary} />
            </View>
            <Text style={styles.scannerText}>Position sender's QR code in the frame</Text>
            <Text style={styles.scannerSubtext}>QR is one-time-use • Valid for 2 hours • HMAC signed</Text>
          </View>

          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
            <Text style={styles.securityNoteText}>Server-side validation prevents screenshot exploitation. QR invalidated after first successful scan.</Text>
          </View>

          <Button title="Simulate QR Scan" onPress={() => setQrScanned(true)} style={{ backgroundColor: COLORS.primary }} />
        </>
      ) : (
        <>
          <View style={styles.scanSuccess}>
            <Ionicons name="checkmark-circle" size={64} color={COLORS.secondary} />
            <Text style={styles.scanSuccessTitle}>QR Valid ✓</Text>
            <Text style={styles.scanSuccessDesc}>Booking RTL-D-2026-015 verified</Text>
          </View>

          <View style={styles.parcelMatchCard}>
            <Text style={styles.matchTitle}>Parcel Details Match</Text>
            <View style={styles.matchRow}><Text style={styles.matchLabel}>Parcel</Text><Text style={styles.matchValue}>Electronics — 2.5 kg</Text></View>
            <View style={styles.matchRow}><Text style={styles.matchLabel}>Sender</Text><Text style={styles.matchValue}>Amal Perera</Text></View>
            <View style={styles.matchRow}><Text style={styles.matchLabel}>Destination</Text><Text style={styles.matchValue}>Kandy Central</Text></View>
          </View>

          <Button title="Proceed to Photo Capture" onPress={() => setStep(4)} style={{ backgroundColor: COLORS.secondary }} />
        </>
      )}
    </View>
  );

  const renderPhotoCapture = () => (
    <View>
      <Text style={styles.stepTitle}>📸 Photo Documentation</Text>
      <Text style={styles.stepDesc}>Step 5.4 — Capture parcel condition for dispute evidence</Text>

      <Text style={styles.photoInstruction}>Take the following required photos:</Text>

      {[
        { title: 'Parcel Label', desc: 'Clear photo showing label/description', icon: 'document-text', required: true },
        { title: 'Overall Condition', desc: 'All visible sides of parcel', icon: 'images', required: true },
        { title: 'Existing Damage', desc: 'If any pre-existing damage visible', icon: 'warning', required: false },
      ].map((photo, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.photoCard, i < photosTaken && styles.photoCaptured]}
          onPress={() => setPhotosTaken(Math.max(photosTaken, i + 1))}
        >
          <View style={[styles.photoIcon, i < photosTaken && { backgroundColor: COLORS.secondaryBg }]}>
            <Ionicons name={i < photosTaken ? 'checkmark-circle' : photo.icon} size={24} color={i < photosTaken ? COLORS.secondary : COLORS.gray500} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.photoTitle}>{photo.title} {photo.required ? '*' : '(optional)'}</Text>
            <Text style={styles.photoDesc}>{photo.desc}</Text>
          </View>
          <Ionicons name="camera" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      ))}

      <View style={styles.geotagNote}>
        <Ionicons name="location" size={14} color={COLORS.info} />
        <Text style={styles.geotagText}>Photos auto-tagged with GPS coordinates + UTC timestamp. Uploaded immediately to secure cloud storage.</Text>
      </View>

      <Button
        title="Confirm Pickup"
        onPress={() => setStep(5)}
        disabled={photosTaken < 2}
        style={{ backgroundColor: COLORS.secondary, marginTop: 12 }}
      />
    </View>
  );

  const renderPickupConfirmed = () => (
    <View style={styles.successContainer}>
      <Ionicons name="checkmark-circle" size={80} color={COLORS.secondary} />
      <Text style={styles.successTitle}>Pickup Confirmed! ✓</Text>
      <Text style={styles.successDesc}>Step 5.5 — Parcel verified, GPS tracking activated</Text>

      <View style={styles.successCard}>
        <View style={styles.successRow}><Text style={styles.successLabel}>QR Scanned</Text><Ionicons name="checkmark-circle" size={18} color={COLORS.secondary} /></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>Photos Captured</Text><Text style={styles.successValue}>{photosTaken} photos</Text></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>GPS Timestamped</Text><Ionicons name="checkmark-circle" size={18} color={COLORS.secondary} /></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>Status</Text><StatusBadge status="in-transit" size="sm" /></View>
        <View style={styles.successRow}><Text style={styles.successLabel}>GPS Tracking</Text><Text style={styles.successValue}>60-sec interval</Text></View>
      </View>

      <View style={styles.trackingActive}>
        <Ionicons name="radio" size={20} color={COLORS.secondary} />
        <Text style={styles.trackingText}>Live GPS tracking now active. Recipient notified with tracking link.</Text>
      </View>

      <Button title="Navigate to Next Pickup" onPress={() => setStep(1)} style={{ backgroundColor: COLORS.info }} />
      <Button title="Start Deliveries" onPress={() => navigation.navigate('DeliveryConfirmation')} variant="outline" style={{ marginTop: 8, borderColor: COLORS.secondary }} textStyle={{ color: COLORS.secondary }} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pickup & Verification</Text>
        <View style={[styles.stepBadge, { backgroundColor: COLORS.accentBg }]}>
          <Text style={[styles.stepBadgeText, { color: COLORS.accentDark }]}>{step}/5</Text>
        </View>
      </View>
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${(step / 5) * 100}%`, backgroundColor: COLORS.accent }]} />
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
  pickupCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 14,
    marginBottom: 12, ...SHADOWS.md,
  },
  pickupHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  sequenceBadge: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.gray400,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  sequenceNum: { color: COLORS.white, fontSize: SIZES.sm, ...FONTS.bold },
  pickupSender: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  pickupAddress: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 2 },
  pickupDetails: { gap: 4, marginLeft: 38, marginBottom: 10 },
  pickupDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pickupDetailText: { fontSize: SIZES.xs, color: COLORS.gray500 },
  pickupAction: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.infoBg, borderRadius: 8, padding: 10,
  },
  pickupActionText: { color: COLORS.info, fontSize: SIZES.sm, ...FONTS.medium },
  tspNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: COLORS.infoBg, padding: 12, borderRadius: SIZES.radiusSm, marginTop: 8,
  },
  tspNoteText: { flex: 1, color: COLORS.info, fontSize: SIZES.xs, lineHeight: 16 },
  mapPlaceholder: {
    backgroundColor: COLORS.gray100, borderRadius: SIZES.radius, padding: 40,
    alignItems: 'center', marginBottom: 16,
  },
  mapText: { fontSize: SIZES.base, color: COLORS.info, ...FONTS.semiBold, marginTop: 8 },
  mapSubtext: { fontSize: SIZES.sm, color: COLORS.gray500, marginTop: 4 },
  senderCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 14,
    marginBottom: 12, ...SHADOWS.sm,
  },
  senderHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  senderName: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  senderAddress: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 2 },
  callBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.secondary,
    alignItems: 'center', justifyContent: 'center',
  },
  gpsStatus: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.secondaryBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  gpsStatusText: { color: COLORS.secondaryDark, fontSize: SIZES.sm, ...FONTS.medium },
  overrideBtn: { alignItems: 'center', marginTop: 12, padding: 8 },
  overrideText: { color: COLORS.gray500, fontSize: SIZES.xs, textDecorationLine: 'underline' },
  scannerPlaceholder: {
    backgroundColor: COLORS.dark, borderRadius: SIZES.radiusLg, padding: 40,
    alignItems: 'center', marginBottom: 16,
  },
  scannerFrame: {
    width: 200, height: 200, borderWidth: 2, borderColor: COLORS.primary, borderRadius: SIZES.radius,
    alignItems: 'center', justifyContent: 'center',
  },
  scannerText: { color: COLORS.white, fontSize: SIZES.md, marginTop: 16, ...FONTS.medium },
  scannerSubtext: { color: COLORS.gray500, fontSize: SIZES.xs, marginTop: 4 },
  securityNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: COLORS.primaryBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  securityNoteText: { flex: 1, color: COLORS.primary, fontSize: SIZES.xs, lineHeight: 16 },
  scanSuccess: { alignItems: 'center', marginBottom: 20 },
  scanSuccessTitle: { fontSize: SIZES.xxl, color: COLORS.secondary, ...FONTS.bold, marginTop: 8 },
  scanSuccessDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginTop: 4 },
  parcelMatchCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 16, ...SHADOWS.sm,
  },
  matchTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 10 },
  matchRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  matchLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  matchValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  photoInstruction: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium, marginBottom: 12 },
  photoCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, padding: 14,
    marginBottom: 8, borderWidth: 1, borderColor: COLORS.gray300, ...SHADOWS.sm,
  },
  photoCaptured: { borderColor: COLORS.secondary, backgroundColor: COLORS.secondaryBg },
  photoIcon: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.gray100,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  photoTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  photoDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  geotagNote: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 8, padding: 8,
  },
  geotagText: { flex: 1, fontSize: SIZES.xs, color: COLORS.gray500 },
  successContainer: { alignItems: 'center' },
  successTitle: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold, marginTop: 12 },
  successDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 20, textAlign: 'center' },
  successCard: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 16, ...SHADOWS.sm,
  },
  successRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  successLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  successValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  trackingActive: {
    flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%',
    backgroundColor: COLORS.secondaryBg, padding: 14, borderRadius: SIZES.radius, marginBottom: 20,
    borderLeftWidth: 4, borderLeftColor: COLORS.secondary,
  },
  trackingText: { flex: 1, color: COLORS.secondaryDark, fontSize: SIZES.sm },
});

export default PickupVerificationScreen;
