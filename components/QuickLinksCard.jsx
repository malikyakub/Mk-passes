import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";

const QuickLinksCard = ({ img }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Securely store and manage all your passwords in one place, ensuring easy
        access and top-notch protection.
      </Text>
      <View style={styles.bg}></View>
      <Image source={img} alt="illustration" style={styles.img} />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>New password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickLinksCard;

const styles = StyleSheet.create({
  container: {
    height: 260,
    overflow: "hidden",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    paddingTop: 100,
    padding: 10,
  },
  bg: {
    width: "100%",
    height: 180,
    backgroundColor: colors["darkest-pri"],
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },
  text: {
    fontSize: 20,
    fontFamily: "Jaldi",
    color: colors.light,
    width: 280,
    lineHeight: 25,
  },
  img: {
    width: 208,
    height: 260,
    resizeMode: "contain",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  btn: {
    backgroundColor: colors["darker-pri"],
    padding: 10,
    width: 120,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    fontFamily: "Jaini",
    fontSize: 20,
    color: colors.dark,
    textAlign: "center",
  },
});
