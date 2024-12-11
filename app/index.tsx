import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import Intro from "../components/Intro";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Intro />
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => router.push("/Home")}
      >
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 80,
    fontFamily: "Jaini",
    textTransform: "uppercase",
    color: colors.dark,
    lineHeight: 70,
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  startBtn: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors["darkest-pri"],
  },
  startText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
  },
});
