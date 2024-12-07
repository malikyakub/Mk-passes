import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>mk-passes</Text>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A97B0",
    padding: 10,
  },
  text: {
    fontSize: 40,
    fontFamily: "Jaini",
    textTransform: "uppercase",
    color: "#fff",
  },
});
