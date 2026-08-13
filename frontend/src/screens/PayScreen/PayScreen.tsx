import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import PayBtn from "../../components/PayBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import RazorpayCheckout from 'react-native-razorpay';
function PayScreen () {
    const [amount, setAmount] = useState("500");
    const handlePay = async () => {
        // Razorpay checkout
        try {
            const response = await fetch(
                'http://192.168.1.4:5000/create-order',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        amount: Number(amount)
                    })
                }
            ) 
            const data = await response.json();
            // const text = await response.text();
            // console.log('BACKEND RESPONSE:', text); ??
            const order = data.order;

            const options = {
                key: data.key_id,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name:'Razorpay Practice',
                description: 'Test Payment'
            }
            const paymentData = await RazorpayCheckout.open(options);
        } catch(error){
            console.log(error);
        }
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
