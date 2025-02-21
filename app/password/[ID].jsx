import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import usePasswords from "@/hooks/usePasswords";
import colors from "@/assets/colors/colors";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { SafeAreaView } from "react-native-safe-area-context";

const imageMap = {
  youtube: require("@/assets/api/images/youtube.png"),
  facebook: require("@/assets/api/images/facebook.png"),
};

const PasswordDetails = () => {
  const { ID } = useLocalSearchParams();
  const [password, setPassword] = useState(null);
  const { GetPassword, isloading } = usePasswords();

  useEffect(() => {
    const fetchPassword = async () => {
      if (ID) {
        const { data, err } = await GetPassword(ID);
        if (err) {
          console.error("Error fetching password:", err);
        } else {
          setPassword(data);
        }
      }
    };

    fetchPassword();
  }, [ID]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        {isloading ? (
          <ActivityIndicator size="large" color={colors.cyan[300]} />
        ) : password ? (
          <>
            <View style={styles.password_header}>
              <TouchableOpacity
                style={styles.back_btn}
                onPress={() => router.back()}
              >
                <Image
                  style={styles.back_img}
                  source={require("../../assets/Icons/back.png")}
                />
              </TouchableOpacity>
              {imageMap[password.icon] ? (
                <Image
                  source={imageMap[password.icon]}
                  style={styles.pass_image}
                />
              ) : (
                <Image
                  source={require("@/assets/Icons/no-profile.png")}
                  style={styles.pass_image}
                />
              )}
              <Text style={styles.accountName}>{password.account_name}</Text>
            </View>
            <View style={styles.card}>
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
            <View style={styles.card}>
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
          </>
        ) : (
          <Text style={styles.txt}>No password found for this ID.</Text>
        )}
      </View>
      <BottomNav current={"passwords"} />
    </SafeAreaView>
  );
};

export default PasswordDetails;

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
  back_img: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  back_btn: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  password_header: {
    backgroundColor: colors.opacity.cyan[20],
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  pass_image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  accountName: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Jaini",
    color: colors.dark,
  },
  card: {
    backgroundColor: colors.opacity.cyan[20],
    marginTop: 20,
    display: "flex",
    paddingLeft: 60,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    overflow: "hidden",
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
