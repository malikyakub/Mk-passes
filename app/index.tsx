import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/light_colors";
import D_colors from "../assets/colors/dark_colors";
import Intro from "../components/Intro";
import { useRouter } from "expo-router";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const router = useRouter();
  const { GetLoggedInUser, isloading } = useAuth();
  const [isAppLockEnabled, setIsAppLockEnabled] = useState();
  const [biometricsEnabled, setBiometricsEnabled] = useState();
  const [appThemeLight, setAppThemeLight] = useState();

  const checkUser = async () => {
    const user = await GetLoggedInUser();

    if (user) {
      router.push("/Home");
    } else {
      router.push("/Login");
    }
  };

  async function loadUserSettings() {
    try {
      const storedSettings = await AsyncStorage.getItem("userSettings");
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setIsAppLockEnabled(parsedSettings.isAppLockEnabled || false);
        setBiometricsEnabled(parsedSettings.biometricsEnabled || false);
        setAppThemeLight(parsedSettings.appThemeLight || false);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }

  useEffect(() => {
    loadUserSettings();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: appThemeLight
            ? colors.cyan[300]
            : D_colors.cyan[300],
        },
      ]}
    >
      <Intro />
      <TouchableOpacity
        style={styles.startBtn}
        onPress={checkUser}
        disabled={isloading}
      >
        {isloading ? (
          <ActivityIndicator size={30} color={colors.white} />
        ) : (
          <Text style={styles.startText}>Start</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:
    justifyContent: "center",
    alignItems: "center",
  },
  startBtn: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.cyan[300],
  },
  startText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
  },
});
