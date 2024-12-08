import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>home page 8/12/2024</Text>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding : 20
  },
});
