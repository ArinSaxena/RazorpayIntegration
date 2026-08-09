import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

type PayButtonProps = {
  amount: string;
  onPress: () => void;
  disabled?: boolean;
};

function PayBtn({
  amount,
  onPress,
  disabled = false,
}: PayButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>
        Pay {amount ? `₹${amount}` : ''}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PayBtn;