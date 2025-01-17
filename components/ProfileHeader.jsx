import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import colors from "@/assets/colors/colors";
import { useRouter } from "expo-router";

const ProfileHeader = () => {
  const router = useRouter();
  const [setProfileIsOn, setSetProfileIsOn] = useState(false);
  const pressHandler = () => {
    setSetProfileIsOn(!setProfileIsOn);
  };

  const openFileDialog = () => {};
  return (
    <View style={styles.profile}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.push("/Setting")}
      >
        <Image
          style={styles.back}
          source={require("@/assets/Icons/back.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pressHandler()}
        style={styles.pfpConatainer}
      >
        {setProfileIsOn ? (
          <>
            <Image
              style={styles.pfp}
              source={require("@/assets/images/users/user1.png")}
            />
            <TouchableOpacity
              onPress={() => openFileDialog()}
              style={styles.addProfileContainer}
            >
              <Image
                style={styles.addProfileIcon}
                source={require("@/assets/Icons/camera.png")}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image
              style={styles.pfp}
              source={require("@/assets/images/users/user1.png")}
            />
          </>
        )}
      </TouchableOpacity>
      <Text style={styles.name}>Malik yakub</Text>
      <Text style={styles.job}>Front-end developer</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  back: {
    marginBottom: 20,
    left: 0,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  backBtn: {
    position: "absolute",
    left: 30,
    top: 20,
  },
  pfpConatainer: {
    position: "relative",
  },
  profile: {
    height: 400,
    backgroundColor: colors.cyan[300],
    justifyContent: "center",
    alignItems: "center",
  },
  addProfileContainer: {
    position: "absolute",
    width: 250,
    height: 100,
    backgroundColor: colors.opacity.cyan[50],
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  addProfileIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  pfp: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    borderRadius: 150,
  },
  name: {
    fontSize: 50,
    fontFamily: "Jaini",
    color: colors.light,
  },
  job: {
    fontSize: 20,
    letterSpacing: 2,
    marginTop: -10,
    color: colors.light,
    fontFamily: "Jaldi",
  },
});
