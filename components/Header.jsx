import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { StatusBar } from "expo-status-bar";
import HeaderBtns from "./HeaderBtns";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/light-logo.png")}
        style={styles.logo}
        alt="logo"
      />
      <HeaderBtns />
      <StatusBar style="dark" backgroundColor={colors["darkest-pri"]} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["darkest-pri"],
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
