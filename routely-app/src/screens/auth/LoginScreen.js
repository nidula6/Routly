import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import Button from '../../components/Button';
import InputField from '../../components/InputField';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // phone, otp

  const handleSendOTP = () => {
    if (phone.length >= 9) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    navigation.replace('RoleSelection');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="cube" size={36} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your ROUTELY account</Text>
        </View>

        {/* Phone Step */}
        {step === 'phone' && (
          <View style={styles.form}>
            <InputField
              label="Mobile Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="07X XXX XXXX"
              keyboardType="phone-pad"
              icon={<Ionicons name="call-outline" size={20} color={COLORS.gray500} />}
            />
            
            <Text style={styles.infoText}>
              We'll send a 6-digit OTP to verify your number
            </Text>

            <Button
              title="Send OTP"
              onPress={handleSendOTP}
              disabled={phone.length < 9}
              style={{ marginTop: 16 }}
            />
          </View>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <View style={styles.form}>
            <View style={styles.otpSentBanner}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
              <Text style={styles.otpSentText}>OTP sent to +94 {phone}</Text>
            </View>

            <InputField
              label="Enter 6-Digit OTP"
              value={otp}
              onChangeText={setOtp}
              placeholder="• • • • • •"
              keyboardType="number-pad"
              icon={<Ionicons name="key-outline" size={20} color={COLORS.gray500} />}
            />

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Didn't receive code?</Text>
              <TouchableOpacity>
                <Text style={styles.resendLink}>Resend OTP</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Verify & Login"
              onPress={handleVerifyOTP}
              disabled={otp.length < 6}
              style={{ marginTop: 16 }}
            />

            <TouchableOpacity onPress={() => setStep('phone')} style={styles.changeNumber}>
              <Ionicons name="arrow-back" size={16} color={COLORS.primary} />
              <Text style={styles.changeNumberText}>Change number</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.footerLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { flexGrow: 1, paddingHorizontal: SIZES.paddingLg, paddingTop: 60 },
  backBtn: { position: 'absolute', top: 0, left: 0, padding: 8 },
  header: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.primaryBg, alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontSize: SIZES.xxl, color: COLORS.dark, ...FONTS.bold },
  subtitle: { fontSize: SIZES.md, color: COLORS.gray600, marginTop: 4 },
  form: { flex: 1 },
  infoText: { fontSize: SIZES.sm, color: COLORS.gray500, textAlign: 'center', marginTop: 8 },
  otpSentBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.secondaryBg, padding: 12, borderRadius: SIZES.radiusSm,
    marginBottom: 20,
  },
  otpSentText: { color: COLORS.secondary, fontSize: SIZES.sm, ...FONTS.medium },
  resendRow: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 8 },
  resendText: { color: COLORS.gray500, fontSize: SIZES.sm },
  resendLink: { color: COLORS.primary, fontSize: SIZES.sm, ...FONTS.semiBold },
  changeNumber: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 16 },
  changeNumberText: { color: COLORS.primary, fontSize: SIZES.sm, ...FONTS.medium },
  footer: { paddingVertical: 24, alignItems: 'center' },
  footerText: { color: COLORS.gray600, fontSize: SIZES.md },
  footerLink: { color: COLORS.primary, ...FONTS.semiBold },
});

export default LoginScreen;
