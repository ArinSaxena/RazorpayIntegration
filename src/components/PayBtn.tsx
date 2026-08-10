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
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    height:40,
    width:100,
    fontSize: 20,
    // justifyContent:'center',
    // alignItems:'center',
    textAlign:'center',
    fontWeight: '600',
    backgroundColor: '#2563EB',
    borderRadius:10
  },
});

export default PayBtn;