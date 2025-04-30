import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HeroCard from "../components/HeroCard";
import { router } from "expo-router";
import useAuth from "../hooks/useAuth";
import { supabase } from "@/utils/supabase";
import useUsers from "@/hooks/useUsers";

interface User {
  id: string;
  fullname: string;
  email: string;
  username: string;
}

const Home = () => {
  const { GetLoggedInUser } = useAuth();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetLoggedInUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        <HeroCard
          title={user ? user.username : "Mk-passes"}
          body={user ? "Welcome" : "With"}
          image_url={
            "https://i.pinimg.com/474x/f3/90/a6/f390a69c051dc2a1f7d8f322c96b0fa4.jpg"
          }
        />

        <ScrollView style={styles.cards} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              style={styles.card_img}
              source={require("@/assets/images/passwords-ill.png")}
            />
            <View style={styles.txt}>
              <Text style={styles.title}>Strong password</Text>
              <Text style={styles.body}>
                Generate strong, unique passwords instantly to enhance your
                security. Our app creates complex combinations that protect your
                accounts from hacking attempts.
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => router.push("/AddPassowrd")}
              >
                <Text style={styles.btnTxt}>Add passwords</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <Image
              style={styles.card_img}
              source={require("@/assets/images/enc-dec-ill.png")}
            />
            <View style={styles.txt}>
              <Text style={styles.title}>Encrypt messages</Text>
              <Text style={styles.body}>
                Protect your private messages with powerful encryption. Convert
                your text into a secure, unreadable format that only the
                intended recipient can decode.
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => router.push("/Encryption")}
              >
                <Text style={styles.btnTxt}>Encrypt</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <Image
              style={styles.card_img}
              source={require("@/assets/images/enc-dec-ill.png")}
            />
            <View style={styles.txt}>
              <Text style={styles.title}>Decrypt messages</Text>
              <Text style={styles.body}>
                Effortlessly decrypt messages to reveal their original content.
                Stay secure while ensuring seamless communication with trusted
                contacts.
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => router.push("/Decryption")}
              >
                <Text style={styles.btnTxt}>Decrypt</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card_me}>
            <Image
              style={styles.card_img}
              source={require("@/assets/images/me-ill.png")}
            />
            <View style={styles.txt}>
              <Text style={styles.title}>About me</Text>
              <Text style={[styles.body, { color: colors.light }]}>
                Hi, I'm Malik Yakub, a passionate software developer with a
                knack for creating innovative solutions. Explore my portfolio to
                see my latest projects and achievements 🤍.
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => Linking.openURL("https://mk-yakub.netlify.app")}
              >
                <Text style={styles.btnTxt}>My portfolio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View>
        <BottomNav current={"home"} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan[100],
    justifyContent: "center",
  },
  hero: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    zIndex: 1,
    paddingBottom: 0,
  },
  cards: {
    display: "flex",
    gap: 10,
    marginBlock: 10,
  },
  card: {
    width: "100%",
    borderRadius: 10,
    height: 250,
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    flexDirection: "row",
    backgroundColor: colors.cyan[200],
    marginBlock: 5,
  },
  card_me: {
    width: "100%",
    borderRadius: 10,
    height: 250,
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    flexDirection: "row",
    backgroundColor: colors.dark,
    marginBlock: 5,
  },
  card_img: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  txt: {
    height: 220,
    width: 250,
  },
  title: {
    fontSize: 30,
    fontFamily: "Jaini",
    color: colors.cyan[300],
    marginBottom: 10,
  },
  body: {
    fontSize: 20,
    fontFamily: "Jaldi",
    color: colors.dark,
    lineHeight: 24,
    marginBottom: 20,
    // flex: 1,
    width: "80%",
    height: 120,
    overflow: "hidden",
  },
  btn: {
    backgroundColor: colors.cyan[300],
    width: "80%",
    padding: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: 18,
    fontFamily: "Jaldi-bold",
    color: colors.light,
  },
  heart: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
});
