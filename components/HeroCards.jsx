import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import colors from "../assets/colors/colors";
import { router } from "expo-router";

const HeroCards = ({ title, body, imageUrl, buttonText, page }) => {
  const handlePress = () => {
    if (page == "me") {
      Linking.openURL("https://mk-yakub.netlify.app");
      return;
    }
    router.push(`/${page}`);
  };

  return (
    <View style={styles.Card}>
      <Image source={imageUrl} style={styles.cardImg} />
      <View style={styles.cardText}>
        <Text style={styles.Cardtitle}>{title}</Text>
        <Text style={styles.Cradbody}>{body}</Text>
        <TouchableOpacity
          style={styles.cardBtn}
          onPress={() => handlePress({ page })}
        >
          <Text style={styles.btnText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeroCards;

const styles = StyleSheet.create({
  Card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cyan[200],
    padding: 10,
    gap: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    marginHorizontal: 20,
    alignSelf: "center",
  },
  cardImg: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  cardText: {
    display: "flex",
    gap: 5,
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Cardtitle: {
    fontFamily: "Jaini",
    fontSize: 25,
    color: colors.cyan[300],
  },
  Cradbody: {
    fontSize: 18,
    fontFamily: "Jaldi",
    color: colors.dark,
    lineHeight: 20,
    textAlign: "center",
  },
  cardBtn: {
    backgroundColor: colors.cyan[300],
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    fontFamily: "Jaini",
    color: colors.light,
  },
});
