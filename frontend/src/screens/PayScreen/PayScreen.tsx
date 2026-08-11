import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import PayBtn from "../../components/PayBtn";
import AmountInput from "../../components/AmountInput";
import { SafeAreaView } from "react-native-safe-area-context";

function PayScreen () {
    const [amount, setAmount] = useState("500");
    const handlePay = () => {
        // Razorpay checkout
    }
    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
        <Text style={styles.heading}>Razorpay Integration Practice</Text>
      <PayBtn
        amount={amount}
        onPress={handlePay}
        disabled={!amount}
      />
        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal:10
    },
    heading:{
        fontSize:28,
        fontWeight:'400'
    }
});
export default PayScreen;
