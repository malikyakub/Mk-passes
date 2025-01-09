import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import colors from "@/assets/colors/colors";

// Map your icons to local image paths
const imageMap = {
  "youtube.png": require("@/assets/api/images/youtube.png"),
  "facebook.png": require("@/assets/api/images/facebook.png"),
};

const PasswordCard = ({
  passId,
  accountName,
  username,
  email,
  password,
  icon,
}) => {
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
      <TouchableOpacity>
        <Image
          source={require("@/assets/Icons/next.png")}
          style={styles.next}
        />
      </TouchableOpacity>
    </View>
  );
};

// Define prop types
PasswordCard.propTypes = {
  passId: PropTypes.number.isRequired,
  accountName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default PasswordCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: "#0A97B033",
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
    backgroundColor: colors["darkest-pri"],
    width: 15,
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
