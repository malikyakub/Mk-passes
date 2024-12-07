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
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" backgroundColor="#0A97B0" />
    </>
  );
}
