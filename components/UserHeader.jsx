import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { StatusBar } from "expo-status-bar";
import HeaderBtns from "./HeaderBtns";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.pfp}
          source={require("@/assets/images/users/user1.png")}
        />
        <View style={styles.bio}>
          <Text style={styles.name}>Malik Yakub</Text>
          <Text style={styles.job}>Frontend Developer</Text>
        </View>
      </View>
      <HeaderBtns />
      <StatusBar style="dark" backgroundColor={colors.cyan[300]} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cyan[300],
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    justifyContent: "center",
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  pfp: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 125,
  },
  bio: {
    marginLeft: 10,
    marginBottom: -5,
  },
  name: {
    fontSize: 25,
    letterSpacing: 2,
    color: colors.light,
    fontFamily: "Jaini",
  },
  job: {
    fontSize: 18,
    marginTop: -8,
    letterSpacing: 2,
    color: colors.light,
    fontFamily: "Jaldi",
  },
});
