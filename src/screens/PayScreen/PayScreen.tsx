import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import PayBtn from "../../components/PayBtn";
import AmountInput from "../../components/AmountInput";

function PayScreen () {
    const [amount, setAmount] = useState("");
    const handlePay = () => {
        console.log("pay");
    }
    return (
        <View style={styles.container}>
            <Text>Razorpay Integration Practice</Text>
             <AmountInput
        value={amount}
        onChangeText={setAmount}
      />

      <PayBtn
        amount={amount}
        onPress={handlePay}
        disabled={!amount}
      />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent: 'center',
        alignItems:'center'
    },
    heading:{
        fontSize:28,
        fontWeight:'600'
    }
});
export default PayScreen;
