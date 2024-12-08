import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";

const Intro = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.img}
          alt="logo"
        />
        <Text style={styles.intro}>mk-passes</Text>
        <View style={styles.motto}>
          <View style={styles.line} />
          <Text style={styles.mottoText}>for your passes</Text>
          <View style={styles.line} />
        </View>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  img: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 25,
  },
  intro: {
    fontSize: 80,
    fontFamily: "Jaini",
    lineHeight: 80,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    width: 248,
    marginBottom: 200,
  },
  motto: {
    flexDirection: "row",
    alignItems: "baseline",
    width: "100%",
    justifyContent: "center",
  },
  line: {
    height: 1,
    backgroundColor: colors.dark,
    flex: 1,
  },
  mottoText: {
    marginHorizontal: 8,
    fontSize: 20,
    fontFamily: "Jaldi",
    color: colors.dark,
  },
});
