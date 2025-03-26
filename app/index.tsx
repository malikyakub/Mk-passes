import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import Intro from "../components/Intro";
import { useRouter } from "expo-router";
import useAuth from "../hooks/useAuth";
import useUsers from "@/hooks/useUsers";

const index = () => {
  const router = useRouter();
  const { GetLoggedInUser, isloading } = useAuth();
  const { SendPushNotification } = useUsers();

  const checkUser = async () => {
    const user = await GetLoggedInUser();

    if (user) {
      if (user?.id) {
        const { err } = await SendPushNotification(
          user?.id,
          "Hello",
          user?.fullname,
        );
        if (err) {
          console.log(err, "maa");
        }
      }
      router.push("/Home");
    } else {
      router.push("/Login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
});
