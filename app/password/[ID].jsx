import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import passwordJson from "@/assets/api/passwords.json";
import colors from "@/assets/colors/colors";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { SafeAreaView } from "react-native-safe-area-context";

const password = () => {
  const router = useRouter();
  const { ID } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={styles.back}
            source={require("@/assets/Icons/back.png")}
          />
        </TouchableOpacity>
        <View style={styles.password_info}>
          <Image
            style={styles.pass_image}
            source={require("@/assets/api/images/youtube.png")}
          />
          <Text style={styles.accountName}>youtube</Text>
          <Text style={styles.dateAdded}>15-jan-2025</Text>
        </View>

        <View style={styles.password_manager}>
          <View style={styles.side}></View>
          <Image
            style={styles.icon}
            source={require("@/assets/Icons/key.png")}
          />
          <Text style={styles.txt}>Change password</Text>
          <TouchableOpacity style={styles.next_btn}>
            <Image
              style={styles.next_img}
              source={require("@/assets/Icons/next.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.password_manager}>
          <View style={styles.side}></View>
          <Image
            style={styles.icon}
            source={require("@/assets/Icons/history.png")}
          />
          <Text style={styles.txt}>Review changes</Text>
          <TouchableOpacity style={styles.next_btn}>
            <Image
              style={styles.next_img}
              source={require("@/assets/Icons/next.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.dangerZone}>
          <View style={styles.D_side}></View>
          <Image
            style={styles.icon}
            source={require("@/assets/Icons/delete.png")}
          />
          <Text style={styles.txt}>Delete password</Text>
          <TouchableOpacity style={styles.next_btn}>
            <Image
              style={styles.next_img}
              source={require("@/assets/Icons/D_next.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomNav current={"passwords"} />
    </SafeAreaView>
  );
};

export default password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan[100],
    justifyContent: "center",
  },
  hero: {
    flex: 1,
    padding: 20,
    zIndex: 1,
  },
  back: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  password_info: {
    padding: 20,
    backgroundColor: colors.opacity.cyan[20],
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pass_image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  accountName: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Jaini",
    color: colors.dark,
    marginLeft: 15,
  },
  dateAdded: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: 10 }],
    fontSize: 14,
    fontFamily: "jaldi",
    color: colors.dark,
    textAlign: "right",
  },
  password_manager: {
    backgroundColor: colors.opacity.cyan[20],
    marginTop: 20,
    display: "flex",
    paddingLeft: 60,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
  },
  side: {
    backgroundColor: colors.cyan[300],
    width: 10,
    height: "100%",
    position: "absolute",
    left: 0,
  },
  dangerZone: {
    backgroundColor: "#ff00004D",
    marginTop: 20,
    paddingLeft: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 80,
  },
  D_side: {
    backgroundColor: "red",
    width: 10,
    height: "100%",
    position: "absolute",
    left: 0,
  },
  icon: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 15,
    resizeMode: "contain",
  },
  txt: {
    fontSize: 18,
    marginLeft: 5,
    fontFamily: "jaldi",
    fontWeight: "bold",
    opacity: 0.5,
  },
  next_btn: {
    position: "absolute",
    right: 20,
  },
  next_img: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
