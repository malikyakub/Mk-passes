import { StyleSheet, Text, View, Linking, ScrollView } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HeroCards from "../components/HeroCards";
import { router } from "expo-router";

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
        <Text style={styles.text}>With </Text>
        <Text style={styles.logo}>Mk-passes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {card.map((item, index) => (
            <HeroCards
              key={index}
              body={item.body}
              imageUrl={item.cardimg}
              buttonText={item.buttonText}
              title={item.title}
              page={item.link}
            />
          ))}
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
    paddingHorizontal: 20,
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 30,
    fontFamily: "Jaldi",
    color: colors.dark,
  },
  logo: {
    fontSize: 60,
    fontFamily: "Jaini",
    color: colors.dark,
    lineHeight: 60,
  },
  heroCards: {
    marginBlock: 20,
    backgroundColor: "red",
  },
  heart: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
});
