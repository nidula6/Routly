import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';
import InputField from '../../components/InputField';

const RoutePlanningScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [fragileAccept, setFragileAccept] = useState(false);

  const matchedParcels = [
    { id: 'P-001', from: 'Colombo 07', to: 'Kandy Central', weight: '2.5 kg', price: 'LKR 320', detour: '1.2 km', fragile: false, instructions: 'Call before delivery' },
    { id: 'P-002', from: 'Colombo 03', to: 'Peradeniya', weight: '1.2 kg', price: 'LKR 280', detour: '0.8 km', fragile: false, instructions: '' },
    { id: 'P-003', from: 'Colombo 05', to: 'Kandy Katugastota', weight: '4.0 kg', price: 'LKR 380', detour: '3.5 km', fragile: true, instructions: 'Keep upright' },
    { id: 'P-004', from: 'Kegalle', to: 'Kandy', weight: '0.5 kg', price: 'LKR 180', detour: '0 km', fragile: false, instructions: '' },
  ];

  const [selectedParcels, setSelectedParcels] = useState([]);

  const toggleParcel = (id) => {
    setSelectedParcels(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const totalEarnings = selectedParcels.reduce((sum, id) => {
    const p = matchedParcels.find(m => m.id === id);
    return sum + parseInt(p.price.replace('LKR ', ''));
  }, 0);

  const renderStep = () => {
    switch (step) {
      case 1: return renderRouteSetup();
      case 2: return renderCapacity();
      case 3: return renderMatchResults();
      case 4: return renderRouteConfirm();
      default: return null;
    }
  };

  const renderRouteSetup = () => (
    <View>
      <Text style={styles.stepTitle}>🗺️ Plan My Route</Text>
      <Text style={styles.stepDesc}>Step 4.1-4.2 — Set your intercity travel details</Text>

      <View style={styles.verifiedBanner}>
        <Ionicons name="shield-checkmark" size={18} color={COLORS.secondary} />
        <Text style={styles.verifiedText}>Account Verified — NIC, License, Vehicle ✓</Text>
      </View>

      <InputField label="Origin City" placeholder="e.g., Colombo" icon={<Ionicons name="location" size={18} color={COLORS.info} />} />
      <InputField label="Destination City" placeholder="e.g., Kandy" icon={<Ionicons name="flag" size={18} color={COLORS.danger} />} />
      <InputField label="Departure Date" placeholder="Today" icon={<Ionicons name="calendar-outline" size={18} color={COLORS.gray500} />} />
      <InputField label="Departure Time (±1 hour)" placeholder="2:00 PM" icon={<Ionicons name="time-outline" size={18} color={COLORS.gray500} />} />

      <View style={styles.waypointsBanner}>
        <Ionicons name="git-branch-outline" size={16} color={COLORS.info} />
        <Text style={styles.waypointsText}>Intermediate waypoints auto-included: Kegalle, Mawanella, Peradeniya</Text>
      </View>

      <Button title="Set Capacity & Find Parcels" onPress={() => setStep(2)} style={{ backgroundColor: COLORS.info }} />
    </View>
  );

  const renderCapacity = () => (
    <View>
      <Text style={styles.stepTitle}>📦 Set Capacity</Text>
      <Text style={styles.stepDesc}>Step 4.3 — Control how many parcels you can carry</Text>

      <InputField label="Max Number of Parcels" placeholder="1-10" keyboardType="number-pad" icon={<Ionicons name="layers-outline" size={18} color={COLORS.gray500} />} />
      <InputField label="Max Total Weight (kg)" placeholder="e.g., 15" keyboardType="decimal-pad" icon={<Ionicons name="scale-outline" size={18} color={COLORS.gray500} />} />

      <View style={styles.switchRow}>
        <View>
          <Text style={styles.switchLabel}>Accept Fragile Parcels</Text>
          <Text style={styles.switchDesc}>Fragile parcels require extra care</Text>
        </View>
        <Switch value={fragileAccept} onValueChange={setFragileAccept} trackColor={{ true: COLORS.primaryLight }} thumbColor={fragileAccept ? COLORS.primary : COLORS.gray400} />
      </View>

      <View style={styles.earningsEstimate}>
        <Ionicons name="cash-outline" size={20} color={COLORS.secondary} />
        <View style={{ flex: 1 }}>
          <Text style={styles.earningsEstLabel}>Estimated Earnings</Text>
          <Text style={styles.earningsEstValue}>LKR 600 – 1,200</Text>
          <Text style={styles.earningsEstInfo}>Based on your settings and current parcel supply on Colombo→Kandy corridor</Text>
        </View>
      </View>

      <Button title="Find Matching Parcels" onPress={() => setStep(3)} style={{ backgroundColor: COLORS.info }} icon={<Ionicons name="search" size={18} color={COLORS.white} />} />
    </View>
  );

  const renderMatchResults = () => (
    <View>
      <Text style={styles.stepTitle}>📋 Matching Parcels</Text>
      <Text style={styles.stepDesc}>Step 4.4-4.6 — Algorithm found {matchedParcels.length} parcels on your route</Text>

      <View style={styles.matchTimeBanner}>
        <Ionicons name="flash" size={16} color={COLORS.secondary} />
        <Text style={styles.matchTimeText}>Matched in 1.8 seconds • Ranked by earnings per km</Text>
      </View>

      {matchedParcels.map((parcel) => (
        <TouchableOpacity
          key={parcel.id}
          style={[styles.parcelCard, selectedParcels.includes(parcel.id) && styles.parcelSelected]}
          onPress={() => toggleParcel(parcel.id)}
        >
          <View style={styles.parcelHeader}>
            <View style={styles.checkbox}>
              {selectedParcels.includes(parcel.id) && (
                <Ionicons name="checkmark" size={16} color={COLORS.white} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.parcelRoute}>{parcel.from} → {parcel.to}</Text>
              <View style={styles.parcelMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="scale-outline" size={12} color={COLORS.gray500} />
                  <Text style={styles.metaText}>{parcel.weight}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="navigate-outline" size={12} color={COLORS.gray500} />
                  <Text style={styles.metaText}>+{parcel.detour} detour</Text>
                </View>
                {parcel.fragile && (
                  <View style={styles.fragileBadge}>
                    <Text style={styles.fragileText}>⚠️ Fragile</Text>
                  </View>
                )}
              </View>
              {parcel.instructions ? (
                <Text style={styles.parcelInstr}>📝 {parcel.instructions}</Text>
              ) : null}
            </View>
            <Text style={styles.parcelPrice}>{parcel.price}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {selectedParcels.length > 0 && (
        <View style={styles.selectionSummary}>
          <Text style={styles.summaryText}>{selectedParcels.length} parcels selected</Text>
          <Text style={styles.summaryEarnings}>Total: LKR {totalEarnings}</Text>
        </View>
      )}

      <View style={styles.acceptNote}>
        <Ionicons name="timer-outline" size={14} color={COLORS.info} />
        <Text style={styles.acceptNoteText}>30-minute acceptance window. Parcels locked for you after accepting. Results refresh every 10 minutes.</Text>
      </View>

      <Button
        title={`Accept ${selectedParcels.length} Parcel${selectedParcels.length !== 1 ? 's' : ''} & Lock Route`}
        onPress={() => setStep(4)}
        disabled={selectedParcels.length === 0}
        style={{ backgroundColor: COLORS.info }}
      />
    </View>
  );

  const renderRouteConfirm = () => (
    <View style={styles.confirmContainer}>
      <Ionicons name="checkmark-circle" size={72} color={COLORS.info} />
      <Text style={styles.confirmTitle}>Route Locked In! 🚗</Text>
      <Text style={styles.confirmDesc}>Step 4.7 — Your route is confirmed with {selectedParcels.length} parcels</Text>

      <View style={styles.confirmCard}>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Route</Text><Text style={styles.confirmValue}>Colombo → Kandy</Text></View>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Departure</Text><Text style={styles.confirmValue}>2:00 PM Today</Text></View>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Parcels</Text><Text style={styles.confirmValue}>{selectedParcels.length}</Text></View>
        <View style={styles.confirmRow}><Text style={styles.confirmLabel}>Total Earnings</Text><Text style={[styles.confirmValue, { color: COLORS.secondary }]}>LKR {totalEarnings}</Text></View>
      </View>

      <View style={styles.navPreview}>
        <Ionicons name="map" size={24} color={COLORS.info} />
        <Text style={styles.navPreviewTitle}>Optimised Pickup Sequence Ready</Text>
        <Text style={styles.navPreviewDesc}>Turn-by-turn navigation with TSP-optimised waypoints</Text>
      </View>

      <View style={styles.reminderNote}>
        <Ionicons name="notifications-outline" size={16} color={COLORS.accent} />
        <Text style={styles.reminderText}>You'll receive a push reminder 30 minutes before departure. Cancellation penalties apply from this point.</Text>
      </View>

      <Button title="Start Navigation" onPress={() => navigation.navigate('PickupVerification')} style={{ backgroundColor: COLORS.info }} icon={<Ionicons name="navigate" size={18} color={COLORS.white} />} />
      <Button title="Back to Dashboard" onPress={() => navigation.goBack()} variant="ghost" style={{ marginTop: 8 }} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Route Planning</Text>
        <View style={[styles.stepBadge, { backgroundColor: COLORS.infoBg }]}>
          <Text style={[styles.stepBadgeText, { color: COLORS.info }]}>{step}/4</Text>
        </View>
      </View>
      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${(step / 4) * 100}%`, backgroundColor: COLORS.info }]} />
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
  verifiedBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.secondaryBg, padding: 10, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  verifiedText: { color: COLORS.secondaryDark, fontSize: SIZES.sm, ...FONTS.medium },
  waypointsBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.infoBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  waypointsText: { flex: 1, color: COLORS.info, fontSize: SIZES.sm },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, padding: 14,
    borderWidth: 1, borderColor: COLORS.gray300, marginBottom: 16,
  },
  switchLabel: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  switchDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  earningsEstimate: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: COLORS.secondaryBg, padding: 14, borderRadius: SIZES.radius, marginBottom: 20,
    borderLeftWidth: 4, borderLeftColor: COLORS.secondary,
  },
  earningsEstLabel: { fontSize: SIZES.sm, color: COLORS.secondaryDark },
  earningsEstValue: { fontSize: SIZES.xl, color: COLORS.secondaryDark, ...FONTS.bold },
  earningsEstInfo: { fontSize: SIZES.xs, color: COLORS.secondary, marginTop: 4 },
  matchTimeBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.secondaryBg, padding: 10, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  matchTimeText: { color: COLORS.secondary, fontSize: SIZES.sm, ...FONTS.medium },
  parcelCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 14,
    marginBottom: 10, borderWidth: 1.5, borderColor: COLORS.gray300, ...SHADOWS.sm,
  },
  parcelSelected: { borderColor: COLORS.info, backgroundColor: COLORS.infoBg + '50' },
  parcelHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: {
    width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: COLORS.info,
    backgroundColor: COLORS.info, alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 2,
  },
  parcelRoute: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  parcelMeta: { flexDirection: 'row', gap: 10, marginTop: 4, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: SIZES.xs, color: COLORS.gray600 },
  fragileBadge: { backgroundColor: COLORS.accentBg, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6 },
  fragileText: { fontSize: 10, color: COLORS.accentDark },
  parcelInstr: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 4, fontStyle: 'italic' },
  parcelPrice: { fontSize: SIZES.lg, color: COLORS.secondary, ...FONTS.bold },
  selectionSummary: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.info, borderRadius: SIZES.radius, padding: 14, marginBottom: 12,
  },
  summaryText: { color: COLORS.white, fontSize: SIZES.md, ...FONTS.medium },
  summaryEarnings: { color: COLORS.white, fontSize: SIZES.lg, ...FONTS.bold },
  acceptNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    backgroundColor: COLORS.infoBg, padding: 10, borderRadius: SIZES.radiusSm, marginBottom: 16,
  },
  acceptNoteText: { flex: 1, color: COLORS.info, fontSize: SIZES.xs, lineHeight: 16 },
  confirmContainer: { alignItems: 'center' },
  confirmTitle: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold, marginTop: 12 },
  confirmDesc: { fontSize: SIZES.sm, color: COLORS.gray500, marginBottom: 20, textAlign: 'center' },
  confirmCard: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 16, ...SHADOWS.sm,
  },
  confirmRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  confirmLabel: { fontSize: SIZES.md, color: COLORS.gray600 },
  confirmValue: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  navPreview: {
    width: '100%', backgroundColor: COLORS.infoBg, borderRadius: SIZES.radius, padding: 16,
    alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: COLORS.info + '30',
  },
  navPreviewTitle: { fontSize: SIZES.md, color: COLORS.info, ...FONTS.semiBold, marginTop: 8 },
  navPreviewDesc: { fontSize: SIZES.xs, color: COLORS.info, marginTop: 4 },
  reminderNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8, width: '100%',
    backgroundColor: COLORS.accentBg, padding: 12, borderRadius: SIZES.radiusSm, marginBottom: 20,
  },
  reminderText: { flex: 1, color: COLORS.accentDark, fontSize: SIZES.xs, lineHeight: 16 },
});

export default RoutePlanningScreen;
