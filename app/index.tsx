import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import Intro from "../components/Intro";
import { useRouter } from "expo-router";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const index = () => {
  const router = useRouter();
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { GetLoggedInUser, isloading } = useAuth();

  useEffect(() => {
    loadUserSettings();
  }, []);

  useEffect(() => {
    if (isAppLockEnabled) {
      authenticateUser();
    }
  }, [isAppLockEnabled]);

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
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }

  async function authenticateUser() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      console.log("Biometric authentication not available.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock App",
      fallbackLabel: "Use Passcode",
      disableDeviceFallback: false,
    });

    if (result.success) {
      setIsAuthenticated(true);
    } else {
      console.log("Authentication failed.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {isAppLockEnabled && !isAuthenticated ? (
        <TouchableOpacity
          onPress={authenticateUser}
          style={styles.unlockContainer}
        >
          <Text style={styles.unlockText}>Unlock</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Intro />
          <TouchableOpacity
            style={styles.startBtn}
            onPress={checkUser}
            disabled={isloading}
          >
            {isloading ? (
              <ActivityIndicator size={30} color={colors.light} />
            ) : (
              <Text style={styles.startText}>Start</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan[100],
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
  unlockContainer: {
    padding: 10,
    borderRadius: 10,
  },
  unlockText: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 2,
    fontFamily: "Jaldi",
    color: colors.cyan[300],
  },
});
