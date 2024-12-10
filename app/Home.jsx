import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import QuickLinksCard from "../components/QuickLinksCard";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        <Text style={styles.text}>With </Text>
        <Text style={styles.logo}>Mk-passes</Text>
        <QuickLinksCard img={require("../assets/images/passwords-ill.png")} />
      </View>
      <View>
        <BottomNav current={"home"} />
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  hero: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 40,
    fontFamily: "Jaldi",
    color: colors.dark,
  },
  logo: {
    fontSize: 80,
    fontFamily: "Jaini",
    color: colors.dark,
  },
});
