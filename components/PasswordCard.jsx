import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "@/assets/colors/colors";
import { router } from "expo-router";

// Map your icons to local image paths
const imageMap = {
  youtube: require("@/assets/api/images/youtube.png"),
  facebook: require("@/assets/api/images/facebook.png"),
};

const PasswordCard = ({
  passId,
  accountName,
  username,
  email,
  password,
  icon,
}) => {
  const pressHandler = (id) => {
    router.push(`../password/${id}`);
  };
  return (
    <View style={styles.card}>
      <View style={styles.side}></View>
      {imageMap[icon] ? (
        <Image source={imageMap[icon]} style={styles.image} />
      ) : (
        <Image
          source={require("@/assets/Icons/no-profile.png")}
          style={styles.image}
        />
      )}
      <View style={styles.details}>
        <Text style={styles.accountName}>{accountName}</Text>
        <Text style={styles.text}>{username}</Text>
      </View>
      <TouchableOpacity onPress={() => pressHandler(passId)}>
        <Image
          source={require("@/assets/Icons/next.png")}
          style={styles.next}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: colors.opacity.cyan[20],
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 90,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  text: {
    color: "black",
    fontSize: 14,
    fontFamily: "jaldi",
    marginBottom: 2,
  },
  side: {
    backgroundColor: colors.cyan[300],
    width: 10,
    height: "100%",
    position: "absolute",
    left: 0,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  accountName: {
    color: "black",
    fontSize: 20,
    fontFamily: "jaldi",
    fontWeight: "bold",
  },
  next: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
