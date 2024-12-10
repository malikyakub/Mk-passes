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

const HeroCards = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Image
          source={require("../assets/images/passwords-ill.png")}
          alt="passwords"
          style={styles.cardImg}
        />
        <View style={styles.cardTexts}>
          <Text style={styles.title}>strong passwords</Text>
          <Text style={styles.cardText}>
            Securely store and manage all your passwords in one place, ensuring
            easy access and top-notch protection.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>new password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardTexts}>
          <Text style={styles.title}>encrypt msgs</Text>
          <Text style={styles.cardText}>
            Message encryption secures data by converting it into code, readable
            only with a key. It protects privacy and blocks unauthorized access.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Encrypt</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/images/enc-dec-ill.png")}
          alt="encryption"
          style={styles.cardImg}
        />
      </View>
      <View style={styles.card}>
        <Image
          source={require("../assets/images/enc-dec-ill.png")}
          alt="decryption"
          style={styles.cardImg}
        />
        <View style={styles.cardTexts}>
          <Text style={styles.title}>decrypt msgs</Text>
          <Text style={styles.cardText}>
            SecDecryption restores encrypted data to its original form using a
            key, allowing authorized access while ensuring security and privacy.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Decrypt</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[styles.card, { backgroundColor: "#4B5945", marginTop: 40 }]}
      >
        <Image
          source={require("../assets/images/me-ill.png")}
          alt="dev"
          style={styles.cardImg}
        />
        <View style={styles.cardTexts}>
          <Text style={styles.title}>About me</Text>
          <Text style={[styles.cardText, { color: colors.light }]}>
            Hi, I'm Malik yakub, a dedicated developer passionate about crafting
            efficient solutions, learning new technologies, and enhancing user
            experiences.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => Linking.openURL("https://mk-yakub.netlify.app")}
            >
              my portfolio
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HeroCards;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
  },
  card: {
    backgroundColor: colors["darker-pri"],
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 480,
    height: 250,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardImg: {
    width: 200,
    height: "100%",
    resizeMode: "contain",
  },
  cardTexts: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 200,
  },
  cardText: {
    fontSize: 18,
    fontFamily: "jaldi",
    color: colors.dark,
    marginBottom: 10,
    textAlign: "right",
  },
  title: {
    fontSize: 35,
    marginBottom: 20,
    fontFamily: "Jaini",
    color: colors["darkest-pri"],
    textTransform: "capitalize",
  },
  button: {
    backgroundColor: colors["darkest-pri"],
    paddingVertical: 10,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "Jaini",
  },
});
