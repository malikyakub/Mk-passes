import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    Jaini: require("../assets/fonts/Jaini/Jaini-Regular.ttf"),
    Jaldi: require("../assets/fonts/Jaldi/Jaldi-Regular.ttf"),
    "Jaldi-bold": require("../assets/fonts/Jaldi/Jaldi-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
      </Stack>
      <StatusBar style="dark" backgroundColor="#B1F0F7" />
    </>
  );
}
