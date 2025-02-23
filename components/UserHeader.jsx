import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import { StatusBar } from "expo-status-bar";
import HeaderBtns from "./HeaderBtns";

const Header = ({ fullname, email, image_url }) => {
  const [profileImage, setProfileImage] = useState(
    image_url
      ? { uri: image_url }
      : require("../assets/images/users/no-profile.png")
  );

  useEffect(() => {
    // Update the profile image if image_url changes
    if (image_url) {
      setProfileImage({ uri: image_url });
    } else {
      setProfileImage(require("../assets/images/users/no-profile.png"));
    }
  }, [image_url]); // Depend on image_url changes

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.pfp} source={profileImage} />
        <View style={styles.bio}>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.job}>{email}</Text>
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
