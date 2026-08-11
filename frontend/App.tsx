import { SafeAreaProvider } from "react-native-safe-area-context";
import  PayScreen  from "./src/screens/PayScreen/PayScreen";

function App() {
  return (
    <SafeAreaProvider>
      <PayScreen/>
    </SafeAreaProvider>

  )
}
export default App;