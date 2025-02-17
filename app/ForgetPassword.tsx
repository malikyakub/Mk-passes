import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "@/assets/colors/colors";
import OTPInput from "@/components/OTPInput";
import { router } from "expo-router";

const ForgetPassword = () => {
  const [email, SetEmail] = useState<string>();
  const [codeIsSent, setCodeIsSent] = useState<Boolean>(false);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.img}
        alt="logo"
      />
      <Text style={styles.welcomingText}>
        {codeIsSent
          ? `Enter the code sent to \n ${email}`
          : "Verify your email"}
      </Text>
      <View style={styles.hero}>
        {!codeIsSent ? (
          <View style={styles.field}>
            <Text style={styles.label}>Please enter your email</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Email"
              value={email}
              onChangeText={(newtext) => SetEmail(newtext)}
            />
          </View>
        ) : (
          <OTPInput digits={6} />
        )}
      </View>
      <TouchableOpacity
        style={styles.ContinureBtn}
        onPress={
          codeIsSent ? () => router.push("/Home") : () => setCodeIsSent(true)
        }
      >
        <Text style={styles.Continuetext}>
          {codeIsSent ? "Verify" : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan[100],
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 25,
  },
  welcomingText: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Jaini",
    color: colors.cyan[300],
  },
  hero: {
    padding: 20,
    width: "100%",
    marginVertical: 20,
  },
  field: {
    marginBottom: 10,
  },
  label: {
    fontFamily: "jaldi",
    fontSize: 20,
    color: colors.dark,
  },
  textinput: {
    backgroundColor: colors.opacity.dark[20],
    color: colors.dark,
    paddingLeft: 8,
    fontSize: 20,
    fontFamily: "Jaldi",
    borderRadius: 5,
  },
  ContinureBtn: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.cyan[300],
  },
  Continuetext: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
  },
});
