import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";

const images = {
  passwords: require("../assets/Icons/key.png"),
  encryption: require("../assets/Icons/encryption.png"),
  home: require("../assets/Icons/home.png"),
  decryption: require("../assets/Icons/decryption.png"),
  settings: require("../assets/Icons/settings.png"),
};

const inImages = {
  passwords: require("../assets/Icons/in-key.png"),
  encryption: require("../assets/Icons/in-encryption.png"),
  home: require("../assets/Icons/in-home.png"),
  decryption: require("../assets/Icons/in-decryption.png"),
  settings: require("../assets/Icons/in-settings.png"),
};

const BottomNav = ({ current }) => {
  return (
    <View style={styles.container}>
      {Object.keys(images).map((key) => (
        <TouchableOpacity key={key} style={styles.btn}>
          <Image
            source={current === key ? inImages[key] : images[key]}
            alt={key}
            style={styles.icons}
          />
          <Text style={[styles.text, current === key && styles.activeText]}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors["darker-pri"],
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  text: {
    fontFamily: "Jaldi",
    color: colors.dark,
    fontSize: 12,
    marginTop: 5,
  },
  activeText: {
    color: colors["darkest-pri"],
    fontSize: 14,
    fontFamily: "Jaldi",
  },
});
