import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', // primary, secondary, outline, ghost, danger
  size = 'md', // sm, md, lg
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const base = [styles.button, styles[`button_${size}`]];
    switch (variant) {
      case 'secondary':
        base.push(styles.buttonSecondary);
        break;
      case 'outline':
        base.push(styles.buttonOutline);
        break;
      case 'ghost':
        base.push(styles.buttonGhost);
        break;
      case 'danger':
        base.push(styles.buttonDanger);
        break;
      default:
        base.push(styles.buttonPrimary);
    }
    if (disabled) base.push(styles.buttonDisabled);
    return base;
  };

  const getTextStyle = () => {
    const base = [styles.buttonText, styles[`text_${size}`]];
    switch (variant) {
      case 'outline':
      case 'ghost':
        base.push({ color: COLORS.primary });
        break;
      case 'danger':
        base.push({ color: COLORS.white });
        break;
      default:
        base.push({ color: COLORS.white });
    }
    return base;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <>
          {icon}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    gap: 8,
    ...SHADOWS.sm,
  },
  button_sm: { height: 36, paddingHorizontal: 12 },
  button_md: { height: SIZES.buttonHeight, paddingHorizontal: 20 },
  button_lg: { height: 56, paddingHorizontal: 28 },
  buttonPrimary: { backgroundColor: COLORS.primary },
  buttonSecondary: { backgroundColor: COLORS.secondary },
  buttonOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.primary, elevation: 0, shadowOpacity: 0 },
  buttonGhost: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 },
  buttonDanger: { backgroundColor: COLORS.danger },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...FONTS.semiBold },
  text_sm: { fontSize: SIZES.sm },
  text_md: { fontSize: SIZES.base },
  text_lg: { fontSize: SIZES.lg },
});

export default Button;
