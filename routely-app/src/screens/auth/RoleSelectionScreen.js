import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';

const RoleSelectionScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'sender',
      title: 'I want to SEND parcels',
      subtitle: 'Compare couriers, save with directional delivery',
      icon: 'cube-outline',
      color: COLORS.primary,
      features: [
        'Compare prices from all couriers',
        'Save 30-50% with directional delivery',
        'Track parcels in real-time',
        'Secure QR + OTP verification',
        'Insurance coverage up to LKR 25,000',
      ],
    },
    {
      id: 'driver',
      title: 'I want to DELIVER parcels',
      subtitle: 'Earn money on your existing intercity trips',
      icon: 'car-outline',
      color: COLORS.secondary,
      features: [
        'Set your existing travel routes',
        'Earn LKR 900-1,500 per trip',
        'Choose parcels that suit you',
        'Flexible — deliver on your schedule',
        'Weekly payouts to your bank',
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>How will you use ROUTELY?</Text>
        <Text style={styles.info}>You can switch roles anytime from settings</Text>
      </View>

      {roles.map((role) => (
        <TouchableOpacity
          key={role.id}
          style={[
            styles.roleCard,
            selectedRole === role.id && { borderColor: role.color, borderWidth: 2 },
          ]}
          onPress={() => setSelectedRole(role.id)}
          activeOpacity={0.7}
        >
          {/* Selected indicator */}
          <View style={[styles.radio, selectedRole === role.id && { borderColor: role.color }]}>
            {selectedRole === role.id && (
              <View style={[styles.radioFill, { backgroundColor: role.color }]} />
            )}
          </View>

          <View style={[styles.roleIcon, { backgroundColor: role.color + '15' }]}>
            <Ionicons name={role.icon} size={36} color={role.color} />
          </View>

          <Text style={styles.roleTitle}>{role.title}</Text>
          <Text style={styles.roleSubtitle}>{role.subtitle}</Text>

          <View style={styles.features}>
            {role.features.map((feature, i) => (
              <View key={i} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={16} color={role.color} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}

      <Button
        title="Continue"
        onPress={() => navigation.replace(selectedRole === 'driver' ? 'DriverTabs' : 'SenderTabs')}
        disabled={!selectedRole}
        style={{ marginTop: 8, marginBottom: 40 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SIZES.paddingLg, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 28 },
  title: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold },
  subtitle: { fontSize: SIZES.base, color: COLORS.gray600, marginTop: 4 },
  info: { fontSize: SIZES.xs, color: COLORS.gray500, marginTop: 8, ...FONTS.medium },
  roleCard: {
    backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: 20,
    marginBottom: 16, borderWidth: 1.5, borderColor: COLORS.gray300,
    ...SHADOWS.md,
  },
  radio: {
    position: 'absolute', top: 16, right: 16,
    width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.gray400,
    alignItems: 'center', justifyContent: 'center',
  },
  radioFill: { width: 12, height: 12, borderRadius: 6 },
  roleIcon: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  roleTitle: { fontSize: SIZES.lg, color: COLORS.dark, ...FONTS.bold },
  roleSubtitle: { fontSize: SIZES.sm, color: COLORS.gray600, marginTop: 2, marginBottom: 16 },
  features: { gap: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: SIZES.sm, color: COLORS.gray700 },
});

export default RoleSelectionScreen;
