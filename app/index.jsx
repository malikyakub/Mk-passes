import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/light-logo.png")}
        style={styles.img}
      />
      <Text style={styles.text}>mk-passes</Text>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A97B0",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 80,
    fontFamily: "Jaini",
    textTransform: "uppercase",
    color: colors.light,
  },
  img: {
    width: 200,
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
