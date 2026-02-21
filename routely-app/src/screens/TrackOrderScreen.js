import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';

const TrackOrderScreen = ({ navigation }) => {
  const [currentStatus, setCurrentStatus] = useState(3);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const trackingSteps = [
    { title: 'Booking Confirmed', time: '09:15 AM', desc: 'Order RTL-D-2026-015 placed', done: true },
    { title: 'Driver Matched', time: '09:22 AM', desc: 'Nuwan J. accepted your parcel', done: true },
    { title: 'Picked Up', time: '10:05 AM', desc: 'Parcel collected from sender, QR verified', done: true },
    { title: 'In Transit', time: 'Now', desc: 'Driver en route — 45 km remaining', done: true, current: true },
    { title: 'Arriving Soon', time: 'ETA 2:30 PM', desc: 'Within 5 km of destination', done: false },
    { title: 'Delivered', time: '—', desc: 'OTP verified, photo captured', done: false },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={22} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      <View style={styles.orderIdBar}>
        <Text style={styles.orderId}>RTL-D-2026-015</Text>
        <StatusBadge status="in-transit" />
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapArea}>
        <Ionicons name="map" size={48} color={COLORS.info} />
        <Text style={styles.mapLabel}>Live GPS Tracking</Text>
        <Text style={styles.mapSub}>Updates every 60 seconds</Text>
        <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulseAnim }] }]}>
          <Ionicons name="car" size={20} color={COLORS.white} />
        </Animated.View>
      </View>

      {/* Driver Card */}
      <View style={styles.driverCard}>
        <View style={styles.driverRow}>
          <Ionicons name="person-circle" size={48} color={COLORS.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>Nuwan Jayawardena</Text>
            <Text style={styles.driverDetail}>Toyota Aqua • WP CAD-5678</Text>
            <View style={styles.driverStats}>
              <Ionicons name="star" size={14} color={COLORS.accent} />
              <Text style={styles.driverRating}>4.8</Text>
              <Text style={styles.driverTrips}>• 234 deliveries</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={12} color={COLORS.secondary} />
                <Text style={styles.verifiedText}>NIC Verified</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.driverActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="call" size={18} color={COLORS.white} />
            <Text style={styles.actionBtnText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.info }]}>
            <Ionicons name="chatbox" size={18} color={COLORS.white} />
            <Text style={styles.actionBtnText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delivery Info */}
      <View style={styles.routeInfo}>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: COLORS.primary }]} />
          <View>
            <Text style={styles.routeLabel}>From</Text>
            <Text style={styles.routeAddr}>45 Galle Road, Colombo 03</Text>
          </View>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: COLORS.secondary }]} />
          <View>
            <Text style={styles.routeLabel}>To</Text>
            <Text style={styles.routeAddr}>28 Peradeniya Road, Kandy</Text>
          </View>
        </View>
      </View>

      {/* ETA Card */}
      <View style={styles.etaCard}>
        <Ionicons name="time" size={24} color={COLORS.secondary} />
        <View>
          <Text style={styles.etaLabel}>Estimated Delivery</Text>
          <Text style={styles.etaTime}>2:30 PM Today</Text>
          <Text style={styles.etaSub}>45 km remaining • ~2h 25min</Text>
        </View>
      </View>

      {/* Tracking Timeline */}
      <View style={styles.timelineSection}>
        <Text style={styles.timelineTitle}>Tracking Timeline</Text>
        {trackingSteps.map((s, i) => (
          <View key={i} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[styles.tlDot, s.done && styles.tlDotDone, s.current && styles.tlDotCurrent]}>
                {s.done && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
                {s.current && <Ionicons name="radio" size={12} color={COLORS.white} />}
              </View>
              {i < trackingSteps.length - 1 && (
                <View style={[styles.tlLine, s.done && styles.tlLineDone]} />
              )}
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.timelineHeader}>
                <Text style={[styles.tlTitle, s.current && { color: COLORS.primary, ...FONTS.bold }]}>{s.title}</Text>
                <Text style={[styles.tlTime, s.current && { color: COLORS.primary }]}>{s.time}</Text>
              </View>
              <Text style={styles.tlDesc}>{s.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Parcel Details */}
      <View style={styles.parcelCard}>
        <Text style={styles.parcelTitle}>Parcel Details</Text>
        <View style={styles.parcelRow}><Text style={styles.pLabel}>Type</Text><Text style={styles.pValue}>Electronics — 2.5 kg</Text></View>
        <View style={styles.parcelRow}><Text style={styles.pLabel}>Size</Text><Text style={styles.pValue}>30 × 20 × 15 cm</Text></View>
        <View style={styles.parcelRow}><Text style={styles.pLabel}>Insurance</Text><Text style={[styles.pValue, { color: COLORS.secondary }]}>Covered — LKR 25,000</Text></View>
        <View style={styles.parcelRow}><Text style={styles.pLabel}>Delivery Type</Text><Text style={styles.pValue}>Directional Delivery</Text></View>
        <View style={styles.parcelRow}><Text style={styles.pLabel}>Price Paid</Text><Text style={[styles.pValue, { ...FONTS.bold }]}>LKR 300</Text></View>
      </View>

      <Button title="Report Issue" onPress={() => {}} variant="outline" style={{ borderColor: COLORS.danger, marginHorizontal: SIZES.padding, marginBottom: 40 }} textStyle={{ color: COLORS.danger }} icon={<Ionicons name="alert-circle" size={18} color={COLORS.danger} />} />
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
  orderIdBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding, paddingVertical: 10, backgroundColor: COLORS.white,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  orderId: { fontSize: SIZES.md, color: COLORS.primary, ...FONTS.bold },
  mapArea: {
    backgroundColor: COLORS.gray100, margin: SIZES.padding, borderRadius: SIZES.radius,
    padding: 40, alignItems: 'center', position: 'relative',
  },
  mapLabel: { fontSize: SIZES.md, color: COLORS.info, ...FONTS.semiBold, marginTop: 8 },
  mapSub: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 4 },
  pulseDot: {
    position: 'absolute', bottom: 20, right: 30,
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  driverCard: {
    backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, marginBottom: 12, ...SHADOWS.md,
  },
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  driverName: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold },
  driverDetail: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 2 },
  driverStats: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  driverRating: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  driverTrips: { fontSize: SIZES.xs, color: COLORS.gray500 },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: COLORS.secondaryBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginLeft: 4,
  },
  verifiedText: { fontSize: 10, color: COLORS.secondary, ...FONTS.medium },
  driverActions: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.secondary, paddingVertical: 10, borderRadius: 8,
  },
  actionBtnText: { color: COLORS.white, fontSize: SIZES.sm, ...FONTS.medium },
  routeInfo: {
    backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, marginBottom: 12, ...SHADOWS.sm,
  },
  routePoint: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  routeDot: { width: 12, height: 12, borderRadius: 6 },
  routeLabel: { fontSize: SIZES.xs, color: COLORS.gray500 },
  routeAddr: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  routeLine: { width: 2, height: 20, backgroundColor: COLORS.gray200, marginLeft: 5, marginVertical: 4 },
  etaCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: COLORS.secondaryBg, marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radius, padding: 16, marginBottom: 16,
    borderLeftWidth: 4, borderLeftColor: COLORS.secondary,
  },
  etaLabel: { fontSize: SIZES.xs, color: COLORS.gray600 },
  etaTime: { fontSize: SIZES.xl, color: COLORS.secondaryDark, ...FONTS.bold },
  etaSub: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  timelineSection: {
    backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, marginBottom: 16, ...SHADOWS.sm,
  },
  timelineTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 16 },
  timelineItem: { flexDirection: 'row', minHeight: 48 },
  timelineLeft: { alignItems: 'center', width: 24, marginRight: 12 },
  tlDot: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: COLORS.gray300,
    alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white,
  },
  tlDotDone: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  tlDotCurrent: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tlLine: { width: 2, flex: 1, backgroundColor: COLORS.gray200 },
  tlLineDone: { backgroundColor: COLORS.secondary },
  timelineContent: { flex: 1, paddingBottom: 16 },
  timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tlTitle: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  tlTime: { fontSize: SIZES.xs, color: COLORS.gray500 },
  tlDesc: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  parcelCard: {
    backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, borderRadius: SIZES.radius,
    padding: 16, marginBottom: 16, ...SHADOWS.sm,
  },
  parcelTitle: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.semiBold, marginBottom: 12 },
  parcelRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  pLabel: { fontSize: SIZES.sm, color: COLORS.gray600 },
  pValue: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
});

export default TrackOrderScreen;
