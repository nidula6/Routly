import React from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  multiline = false,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error && styles.inputError, !editable && styles.inputDisabled]}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <RNTextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray500}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          editable={editable}
          numberOfLines={multiline ? 4 : 1}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: SIZES.md,
    color: COLORS.gray700,
    marginBottom: 6,
    ...FONTS.medium,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: SIZES.radiusSm,
    paddingHorizontal: 12,
    minHeight: SIZES.inputHeight,
  },
  iconWrapper: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: SIZES.base,
    color: COLORS.dark,
    paddingVertical: 10,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORS.danger,
    borderWidth: 1.5,
  },
  inputDisabled: {
    backgroundColor: COLORS.gray100,
  },
  errorText: {
    fontSize: SIZES.xs,
    color: COLORS.danger,
    marginTop: 4,
  },
});

export default InputField;
