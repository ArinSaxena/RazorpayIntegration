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
    width:'100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical:10,
    backgroundColor:"green"
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '400',
    borderRadius:10,
    color:'white'
  },
});

export default PayBtn;