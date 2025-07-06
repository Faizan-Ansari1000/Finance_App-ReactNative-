import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import AppNavigation from "./src/config/Navigation/AppNavigation";

export default function App() {

  return (
    <>
      <StatusBar translucent barStyle={'default'} backgroundColor={'transparent'} />
      <SafeAreaView style={styles.safeArea}>
        <AppNavigation />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
});