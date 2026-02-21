import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import StatusBadge from '../components/StatusBadge';

const OrdersScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all');

  const orders = [
    { id: 'RTL-D-2026-015', type: 'Directional', from: 'Colombo', to: 'Kandy', date: 'Jan 15', status: 'in-transit', price: 'LKR 300', driver: 'Nuwan J.', parcel: 'Electronics — 2.5 kg' },
    { id: 'RTL-C-2026-042', type: 'Courier', from: 'Colombo', to: 'Galle', date: 'Jan 14', status: 'delivered', price: 'LKR 650', driver: 'Domex', parcel: 'Documents — 0.5 kg' },
    { id: 'RTL-D-2026-011', type: 'Directional', from: 'Kandy', to: 'Matara', date: 'Jan 12', status: 'delivered', price: 'LKR 250', driver: 'Amara K.', parcel: 'Clothing — 1.2 kg' },
    { id: 'RTL-C-2026-038', type: 'Courier', from: 'Colombo', to: 'Jaffna', date: 'Jan 10', status: 'delivered', price: 'LKR 1,200', driver: 'Koombiyo', parcel: 'Medicine — 0.8 kg' },
    { id: 'RTL-D-2026-009', type: 'Directional', from: 'Negombo', to: 'Colombo', date: 'Jan 8', status: 'cancelled', price: 'LKR 200', driver: '—', parcel: 'Food Items — 3 kg' },
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'in-transit', label: 'In Transit' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={22} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>{orders.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: COLORS.info }]}>{orders.filter((o) => o.status === 'in-transit').length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: COLORS.secondary }]}>{orders.filter((o) => o.status === 'delivered').length}</Text>
          <Text style={styles.statLabel}>Delivered</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: SIZES.padding, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate('TrackOrder')}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderIdText}>{item.id}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
              <StatusBadge status={item.status} />
            </View>
            <View style={styles.orderRoute}>
              <View style={styles.routePoint}>
                <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.routeText}>{item.from}</Text>
              </View>
              <Ionicons name="arrow-forward" size={14} color={COLORS.gray400} />
              <View style={styles.routePoint}>
                <View style={[styles.dot, { backgroundColor: COLORS.secondary }]} />
                <Text style={styles.routeText}>{item.to}</Text>
              </View>
            </View>
            <View style={styles.orderDetails}>
              <View style={styles.orderDetail}>
                <Ionicons name="cube-outline" size={14} color={COLORS.gray500} />
                <Text style={styles.detailText}>{item.parcel}</Text>
              </View>
              <View style={styles.orderDetail}>
                <Ionicons name={item.type === 'Directional' ? 'car-outline' : 'business-outline'} size={14} color={COLORS.gray500} />
                <Text style={styles.detailText}>{item.type} • {item.driver}</Text>
              </View>
            </View>
            <View style={styles.orderFooter}>
              <Text style={styles.orderPrice}>{item.price}</Text>
              <View style={styles.trackBtn}>
                <Text style={styles.trackBtnText}>{item.status === 'in-transit' ? 'Track' : 'Details'}</Text>
                <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 12, backgroundColor: COLORS.white,
  },
  headerTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.semiBold },
  statsRow: {
    flexDirection: 'row', backgroundColor: COLORS.white, paddingVertical: 14,
    paddingHorizontal: SIZES.padding, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: SIZES.xl, color: COLORS.dark, ...FONTS.bold },
  statLabel: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  filterBar: { backgroundColor: COLORS.white, paddingHorizontal: SIZES.padding, paddingVertical: 10 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: COLORS.gray100, marginRight: 8,
  },
  filterActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: SIZES.sm, color: COLORS.gray600 },
  filterTextActive: { color: COLORS.white, ...FONTS.medium },
  orderCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 16,
    marginBottom: 10, ...SHADOWS.sm,
  },
  orderHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10,
  },
  orderIdText: { fontSize: SIZES.md, color: COLORS.primary, ...FONTS.bold },
  orderDate: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 2 },
  orderRoute: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10,
  },
  routePoint: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  routeText: { fontSize: SIZES.sm, color: COLORS.dark, ...FONTS.medium },
  orderDetails: { gap: 4, marginBottom: 10 },
  orderDetail: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: SIZES.xs, color: COLORS.gray500 },
  orderFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: COLORS.gray100, paddingTop: 10,
  },
  orderPrice: { fontSize: SIZES.md, color: COLORS.dark, ...FONTS.bold },
  trackBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trackBtnText: { fontSize: SIZES.sm, color: COLORS.primary, ...FONTS.medium },
});

export default OrdersScreen;
