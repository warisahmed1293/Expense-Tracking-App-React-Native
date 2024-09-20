import { Platform, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor("transparent");
    }
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
