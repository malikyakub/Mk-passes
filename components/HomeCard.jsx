import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/assets/colors/colors";

const HomeCard = ({ title, body }) => {
  return (
    <View style={styles.card}>
      <View style={styles.bg}></View>
      <Image
        style={styles.card_Img}
        source={require("../assets/images/home_img.jpg")}
      />
      <View style={styles.txt}>
        <Text style={styles.text_2}>{body}</Text>
        <Text style={styles.text_1}>{title}</Text>
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  bg: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.opacity.dark[20],
    zIndex: 1,
    position: "absolute",
  },
  card_Img: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  txt: {
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 1,
  },
  text_1: {
    fontSize: 40,
    fontFamily: "Jaini",
    color: colors.cyan[300],
  },
  text_2: {
    fontSize: 20,
    fontFamily: "Jaldi",
    color: colors.light,
  },
});
