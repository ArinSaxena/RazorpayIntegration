import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type AmountInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
};

function AmountInput({
  value,
  onChangeText,
  error,
}: AmountInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.currency}>₹</Text>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter amount"
          keyboardType="numeric"
          style={styles.input}
          maxLength={4}
        />
      </View>

      <Text style={styles.helperText}>
        Maximum amount: ₹5,000
      </Text>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 52,
  },

  currency: {
    fontSize: 18,
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 18,
  },

  helperText: {
    fontSize: 13,
    marginTop: 6,
  },

  errorText: {
    fontSize: 13,
    marginTop: 6,
  },
});

export default AmountInput;