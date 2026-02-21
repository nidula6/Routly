import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import InfoCard from '../../components/InfoCard';
import StatusBadge from '../../components/StatusBadge';

const SenderDashboard = ({ navigation }) => {
  const recentOrders = [
    { id: 'RTL-2026-001', from: 'Colombo', to: 'Kandy', status: 'in-transit', type: 'Directional', price: 'LKR 320', date: 'Today' },
    { id: 'RTL-2026-002', from: 'Colombo', to: 'Galle', status: 'delivered', type: 'Courier', price: 'LKR 580', date: 'Yesterday' },
    { id: 'RTL-2026-003', from: 'Negombo', to: 'Jaffna', status: 'awaiting-match', type: 'Directional', price: 'LKR 450', date: '2 days ago' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.name}>Nidula</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.dark} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.quickAction, { backgroundColor: COLORS.primary }]}
          onPress={() => navigation.navigate('CourierBooking')}
        >
          <Ionicons name="cube-outline" size={28} color={COLORS.white} />
          <Text style={styles.quickActionTitle}>Send via{'\n'}Courier</Text>
          <Text style={styles.quickActionSub}>Compare prices</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickAction, { backgroundColor: COLORS.secondary }]}
          onPress={() => navigation.navigate('DirectionalBooking')}
        >
          <Ionicons name="navigate-outline" size={28} color={COLORS.white} />
          <Text style={styles.quickActionTitle}>Directional{'\n'}Delivery</Text>
          <Text style={styles.quickActionSub}>Save 30-50%</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <InfoCard title="Total Sent" value="24" icon="cube" color={COLORS.primary} />
        <View style={{ width: 10 }} />
        <InfoCard title="In Transit" value="3" icon="navigate" color={COLORS.accent} />
        <View style={{ width: 10 }} />
        <InfoCard title="Saved" value="LKR 4.2K" icon="wallet" color={COLORS.secondary} />
      </View>

      {/* Savings Banner */}
      <View style={styles.savingsBanner}>
        <View style={styles.savingsIcon}>
          <Ionicons name="trending-down" size={24} color={COLORS.secondary} />
        </View>
        <View style={styles.savingsContent}>
          <Text style={styles.savingsTitle}>You've saved LKR 4,200 this month!</Text>
          <Text style={styles.savingsSubtitle}>Using directional delivery vs traditional couriers</Text>
        </View>
      </View>

      {/* Recent Orders */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {recentOrders.map((order) => (
        <TouchableOpacity 
          key={order.id} 
          style={styles.orderCard}
          onPress={() => navigation.navigate('TrackOrder', { orderId: order.id })}
        >
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>{order.id}</Text>
            <StatusBadge status={order.status} size="sm" />
          </View>
          <View style={styles.orderRoute}>
            <Ionicons name="location" size={16} color={COLORS.primary} />
            <Text style={styles.orderCity}>{order.from}</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.gray400} />
            <Ionicons name="location" size={16} color={COLORS.danger} />
            <Text style={styles.orderCity}>{order.to}</Text>
          </View>
          <View style={styles.orderFooter}>
            <Text style={styles.orderType}>{order.type}</Text>
            <Text style={styles.orderPrice}>{order.price}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Process Flow Link */}
      <TouchableOpacity 
        style={styles.flowLink}
        onPress={() => navigation.navigate('ProcessFlow')}
      >
        <Ionicons name="git-network-outline" size={24} color={COLORS.primary} />
        <View style={styles.flowLinkContent}>
          <Text style={styles.flowLinkTitle}>View Complete Process Flow</Text>
          <Text style={styles.flowLinkSub}>See how ROUTELY works end-to-end</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
      </TouchableOpacity>

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
  notifBtn: { position: 'relative', padding: 8 },
  notifDot: {
    position: 'absolute', top: 8, right: 8,
    width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.danger,
  },
  quickActions: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  quickAction: {
    flex: 1, borderRadius: SIZES.radiusLg, padding: 18,
    ...SHADOWS.lg,
  },
  quickActionTitle: { color: COLORS.white, fontSize: SIZES.base, marginTop: 10, ...FONTS.bold },
  quickActionSub: { color: 'rgba(255,255,255,0.7)', fontSize: SIZES.xs, marginTop: 4 },
  statsRow: { flexDirection: 'row', marginBottom: 16 },
  savingsBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.secondaryBg, borderRadius: SIZES.radius, padding: 14,
    marginBottom: 20, borderLeftWidth: 4, borderLeftColor: COLORS.secondary,
  },
  savingsIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  savingsContent: { flex: 1 },
  savingsTitle: { fontSize: SIZES.md, color: COLORS.secondaryDark, ...FONTS.semiBold },
  savingsSubtitle: { fontSize: SIZES.xs, color: COLORS.secondary, marginTop: 2 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold },
  seeAll: { fontSize: SIZES.sm, color: COLORS.primary, ...FONTS.medium },
  orderCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 14,
    marginBottom: 10, ...SHADOWS.sm,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderId: { fontSize: SIZES.sm, color: COLORS.gray700, ...FONTS.semiBold },
  orderRoute: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  orderCity: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.medium },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderType: { fontSize: SIZES.xs, color: COLORS.gray500, ...FONTS.medium },
  orderPrice: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.bold },
  flowLink: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.primaryBg, borderRadius: SIZES.radius, padding: 16,
    marginTop: 8, borderWidth: 1, borderColor: COLORS.primary + '30',
  },
  flowLinkContent: { flex: 1, marginLeft: 12 },
  flowLinkTitle: { fontSize: SIZES.md, color: COLORS.primary, ...FONTS.semiBold },
  flowLinkSub: { fontSize: SIZES.xs, color: COLORS.gray600, marginTop: 2 },
});

export default SenderDashboard;
