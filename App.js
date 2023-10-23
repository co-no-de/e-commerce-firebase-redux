import { StatusBar } from "expo-status-bar";
import Navigator from "./Navigation/Navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-SemiBold.ttf"),
    Roboto: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={handleOnLayout}>
        <StatusBar style="light" />       
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}