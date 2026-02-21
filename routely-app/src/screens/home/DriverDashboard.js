import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import InfoCard from '../../components/InfoCard';
import StatusBadge from '../../components/StatusBadge';

const DriverDashboard = ({ navigation }) => {
  const activeParcels = [
    { id: 'RTL-D-001', from: 'Colombo 07', to: 'Kandy Central', weight: '2.5 kg', price: 'LKR 320', status: 'confirmed', sender: 'Amal P.' },
    { id: 'RTL-D-002', from: 'Colombo 03', to: 'Peradeniya', weight: '1.2 kg', price: 'LKR 280', status: 'confirmed', sender: 'Sarah K.' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Ready to Earn 💰</Text>
          <Text style={styles.name}>Nidula</Text>
        </View>
        <View style={styles.headerRight}>
          <StatusBadge status="verified" size="sm" />
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.dark} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Earnings Summary */}
      <View style={styles.earningsCard}>
        <View style={styles.earningsHeader}>
          <Text style={styles.earningsLabel}>Today's Earnings</Text>
          <Ionicons name="wallet" size={20} color={COLORS.white} />
        </View>
        <Text style={styles.earningsAmount}>LKR 1,240</Text>
        <View style={styles.earningsDetails}>
          <View style={styles.earningItem}>
            <Text style={styles.earningItemLabel}>Pending</Text>
            <Text style={styles.earningItemValue}>LKR 640</Text>
          </View>
          <View style={styles.earningDivider} />
          <View style={styles.earningItem}>
            <Text style={styles.earningItemLabel}>Released</Text>
            <Text style={styles.earningItemValue}>LKR 600</Text>
          </View>
          <View style={styles.earningDivider} />
          <View style={styles.earningItem}>
            <Text style={styles.earningItemLabel}>This Month</Text>
            <Text style={styles.earningItemValue}>LKR 18.5K</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('RoutePlanning')}
        >
          <View style={[styles.actionIcon, { backgroundColor: COLORS.infoBg }]}>
            <Ionicons name="map-outline" size={24} color={COLORS.info} />
          </View>
          <Text style={styles.actionLabel}>Plan Route</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('PickupVerification')}
        >
          <View style={[styles.actionIcon, { backgroundColor: COLORS.accentBg }]}>
            <Ionicons name="scan-outline" size={24} color={COLORS.accent} />
          </View>
          <Text style={styles.actionLabel}>My Pickups</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('DeliveryConfirmation')}
        >
          <View style={[styles.actionIcon, { backgroundColor: COLORS.secondaryBg }]}>
            <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.secondary} />
          </View>
          <Text style={styles.actionLabel}>Deliveries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Earnings')}
        >
          <View style={[styles.actionIcon, { backgroundColor: COLORS.primaryBg }]}>
            <Ionicons name="card-outline" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.actionLabel}>Earnings</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <InfoCard title="Deliveries" value="156" icon="cube" color={COLORS.primary} />
        <View style={{ width: 10 }} />
        <InfoCard title="Rating" value="4.8" icon="star" color={COLORS.accent} subtitle="⭐" />
        <View style={{ width: 10 }} />
        <InfoCard title="Routes" value="23" icon="map" color={COLORS.info} />
      </View>

      {/* Active Route */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Route</Text>
      </View>

      <View style={styles.routeCard}>
        <View style={styles.routeHeader}>
          <View style={styles.routeInfo}>
            <Ionicons name="navigate" size={20} color={COLORS.info} />
            <Text style={styles.routeTitle}>Colombo → Kandy</Text>
          </View>
          <StatusBadge status="confirmed" size="sm" />
        </View>
        <View style={styles.routeMeta}>
          <View style={styles.routeMetaItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.routeMetaText}>Departs 2:00 PM</Text>
          </View>
          <View style={styles.routeMetaItem}>
            <Ionicons name="cube-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.routeMetaText}>2 parcels accepted</Text>
          </View>
          <View style={styles.routeMetaItem}>
            <Ionicons name="cash-outline" size={14} color={COLORS.secondary} />
            <Text style={[styles.routeMetaText, { color: COLORS.secondary }]}>LKR 600 earnings</Text>
          </View>
        </View>

        {/* Parcels in route */}
        {activeParcels.map((parcel) => (
          <View key={parcel.id} style={styles.parcelItem}>
            <View style={styles.parcelIcon}>
              <Ionicons name="cube" size={16} color={COLORS.primary} />
            </View>
            <View style={styles.parcelInfo}>
              <Text style={styles.parcelRoute}>{parcel.from} → {parcel.to}</Text>
              <Text style={styles.parcelMeta}>{parcel.weight} · {parcel.sender}</Text>
            </View>
            <Text style={styles.parcelPrice}>{parcel.price}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('PickupVerification')}
        >
          <Ionicons name="play" size={18} color={COLORS.white} />
          <Text style={styles.startBtnText}>Start Pickups</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: SIZES.padding },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 60, paddingBottom: 20,
  },
  greeting: { fontSize: SIZES.md, color: COLORS.gray600 },
  name: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notifBtn: { padding: 8 },
  earningsCard: {
    backgroundColor: COLORS.primary, borderRadius: SIZES.radiusLg, padding: 20,
    marginBottom: 20, ...SHADOWS.lg,
  },
  earningsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  earningsLabel: { color: 'rgba(255,255,255,0.8)', fontSize: SIZES.sm },
  earningsAmount: { color: COLORS.white, fontSize: 36, marginVertical: 8, ...FONTS.bold },
  earningsDetails: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  earningItem: { flex: 1, alignItems: 'center' },
  earningItemLabel: { color: 'rgba(255,255,255,0.6)', fontSize: SIZES.xs },
  earningItemValue: { color: COLORS.white, fontSize: SIZES.md, marginTop: 2, ...FONTS.semiBold },
  earningDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  actionBtn: { alignItems: 'center', flex: 1 },
  actionIcon: {
    width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    marginBottom: 6,
  },
  actionLabel: { fontSize: SIZES.xs, color: COLORS.gray700, ...FONTS.medium },
  statsRow: { flexDirection: 'row', marginBottom: 20 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold },
  routeCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: 16,
    marginBottom: 16, ...SHADOWS.md,
  },
  routeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  routeInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  routeTitle: { fontSize: SIZES.base, color: COLORS.dark, ...FONTS.semiBold },
  routeMeta: { gap: 6, marginBottom: 14 },
  routeMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  routeMetaText: { fontSize: SIZES.sm, color: COLORS.gray600 },
  parcelItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.gray100, borderRadius: SIZES.radiusSm, padding: 10,
    marginBottom: 8,
  },
  parcelIcon: {
    width: 32, height: 32, borderRadius: 8, backgroundColor: COLORS.primaryBg,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  parcelInfo: { flex: 1 },
  parcelRoute: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  parcelMeta: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  parcelPrice: { fontSize: SIZES.md, color: COLORS.secondary, ...FONTS.bold },
  startBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.secondary, borderRadius: SIZES.radius, padding: 14, marginTop: 8,
  },
  startBtnText: { color: COLORS.white, fontSize: SIZES.base, ...FONTS.semiBold },
});

export default DriverDashboard;
