import { Text, View, StyleSheet } from "react-native";

function PayScreen () {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Razorpay Payment Practice</Text>
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
        fontSize:24,
        fontWeight:'600'
    }
});
export default PayScreen;
