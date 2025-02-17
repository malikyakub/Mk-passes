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
import { router } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.img}
        alt="logo"
      />
      <Text style={styles.welcomingText}>Create an account</Text>
      <View style={styles.hero}>
        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Full Name"
            value={form.fullname}
            onChangeText={(value) => handleChange("fullname", value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => handleChange("email", value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Username"
            value={form.username}
            onChangeText={(value) => handleChange("username", value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Create password</Text>
          <TextInput
            style={styles.textinput}
            secureTextEntry
            placeholder="Create password"
            value={form.password}
            onChangeText={(value) => handleChange("password", value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={styles.textinput}
            secureTextEntry
            placeholder="Confirm password"
            value={form.password}
            onChangeText={(value) => handleChange("password", value)}
          />
        </View>

        <View style={styles.Or}>
          <View style={styles.or_lines}></View>
          <Text style={styles.Or_text}>OR</Text>
          <View style={styles.or_lines}></View>
        </View>
        <TouchableOpacity style={styles.google}>
          <Image
            style={styles.google_img}
            source={require("@/assets/Icons/google.png")}
          />
          <Text style={styles.google_text}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => router.push("/Home")}
      >
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
      <View style={styles.Login}>
        <Text style={styles.LoginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <Text style={styles.LoginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

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
  Or: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    width: "100%",
    marginVertical: 20,
  },
  Or_text: {
    fontSize: 20,
    color: colors.dark,
  },
  or_lines: {
    flex: 1,
    height: 1,
    backgroundColor: colors.dark,
  },
  google: {
    backgroundColor: colors.light,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    height: 60,
  },
  google_img: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  google_text: {
    fontSize: 30,
    color: colors.dark,
    fontFamily: "Jaldi-bold",
  },
  startBtn: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.cyan[300],
  },
  startText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
  },
  forgotPasswordText: {
    color: colors.cyan[300],
    textAlign: "right",
    fontFamily: "Jaldi",
  },
  Login: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
  LoginText: {
    fontFamily: "Jaldi",
    fontSize: 20,
    color: colors.dark,
  },
  LoginLink: {
    color: colors.cyan[300],
    fontSize: 20,
    fontFamily: "Jaldi-bold",
  },
});
