import { StyleSheet, Text, View, Linking } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HeroCards from "../components/HeroCards";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        <Text style={styles.text}>With </Text>
        <Text style={styles.logo}>Mk-passes</Text>
        <HeroCards />
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
  },
  heart: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
});
