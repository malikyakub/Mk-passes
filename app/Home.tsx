import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HeroCards from "../components/HeroCards";
import { router } from "expo-router";
import HomeCard from "@/components/HomeCard";

const Home = () => {
  const card = [
    {
      cardimg: require("@/assets/images/passwords-ill.png"),
      title: "Strong passwords",
      body: "Generate and store strong, unique passwords for all your accounts.",
      link: "AddPassowrd",
      buttonText: "Passwords",
    },
    {
      cardimg: require("@/assets/images/enc-dec-ill.png"),
      title: "Encrypt message",
      body: "Secure your communications by encrypting your messages. Ensure privacy and protect sensitive information.",
      link: "Encryption",
      buttonText: "Encrypt",
    },
    {
      cardimg: require("@/assets/images/enc-dec-ill.png"),
      title: "Decrypt message",
      body: "Decrypt your encrypted messages to read the original content. Ensure secure communication.",
      link: "Decryption",
      buttonText: "Decrypt",
    },
    {
      cardimg: require("@/assets/images/me-ill.png"),
      title: "About Me",
      body: "My name is Malik Yakub and I'm a software developer with a passion for creating innovative solutions and improving user experiences.",
      link: "me",
      buttonText: "About Me",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        <HomeCard title={"Mk-passes"} body={"With"} />

        <ScrollView style={styles.cards} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              style={styles.card_img}
              source={require("@/assets/images/passwords-ill.png")}
            />
            <View style={styles.txt}>
              <Text style={styles.title}>Strong password</Text>
              <Text style={styles.body}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo quia architecto nobis expedita veniam, sapiente,
                tempora incidunt nihil consectetur cumque laboriosam. Magni
                sequi enim facilis sunt dolore incidunt odio necessitatibus.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo quia architecto nobis expedita veniam, sapiente,
                tempora incidunt nihil consectetur cumque laboriosam. Magni
                sequi enim facilis sunt dolore incidunt odio necessitatibus.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo quia architecto nobis expedita veniam, sapiente,
                tempora incidunt nihil consectetur cumque laboriosam. Magni
                sequi enim facilis sunt dolore incidunt odio necessitatibus.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo quia architecto nobis expedita veniam, sapiente,
                tempora incidunt nihil consectetur cumque laboriosam. Magni
                sequi enim facilis sunt dolore incidunt odio necessitatibus.
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
        <AntDesign
          onPress={() => Linking.openURL("https://mk-yakub.netlify.app")}
          style={styles.heart}
          name="heart"
          color={colors.cyan[300]}
        />
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
    lineHeight: 20,
    marginBottom: 20,
    flex: 1,
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
