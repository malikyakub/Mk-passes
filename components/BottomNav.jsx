import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { useRouter } from "expo-router";

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
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => router.push("#")}>
        <Image
          source={
            current === "passwords" ? inImages.passwords : images.passwords
          }
          alt="passwords"
          style={styles.icons}
        />
        <Text
          style={[styles.text, current === "passwords" && styles.activeText]}
        >
          Passwords
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("Encryption")}
      >
        <Image
          source={
            current === "encryption" ? inImages.encryption : images.encryption
          }
          alt="encryption"
          style={styles.icons}
        />
        <Text
          style={[styles.text, current === "encryption" && styles.activeText]}
        >
          Encryption
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("Home")}>
        <Image
          source={current === "home" ? inImages.home : images.home}
          alt="home"
          style={styles.icons}
        />
        <Text style={[styles.text, current === "home" && styles.activeText]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("Decryption")}
      >
        <Image
          source={
            current === "decryption" ? inImages.decryption : images.decryption
          }
          alt="decryption"
          style={styles.icons}
        />
        <Text
          style={[styles.text, current === "decryption" && styles.activeText]}
        >
          Decryption
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("#")}>
        <Image
          source={current === "settings" ? inImages.settings : images.settings}
          alt="settings"
          style={styles.icons}
        />
        <Text
          style={[styles.text, current === "settings" && styles.activeText]}
        >
          Settings
        </Text>
      </TouchableOpacity>
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
