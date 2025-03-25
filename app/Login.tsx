import {
  ActivityIndicator,
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "@/assets/colors/colors";
import { router } from "expo-router";
import useAuth from "@/hooks/useAuth";
import NotificationCard from "@/components/NotificationCard";
import Entypo from "@expo/vector-icons/Entypo";
import { useFocusEffect } from "@react-navigation/native";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { LoginWithEmail, isloading } = useAuth();
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    title: "",
    is_open: false,
    image_url: "",
    action: () => {},
  });

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const loginHandler = async () => {
    if (email && password) {
      const { err } = await LoginWithEmail(email, password);
      if (err) {
        setNotification({
          message: "Invalid username or password",
          type: "error",
          title: "Error",
          is_open: true,
          image_url: "",
          action: () => {
            setNotification((prev) => ({ ...prev, is_open: false }));
            clearTimeout(timeout);
          },
        });
        const timeout = setTimeout(() => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          router.push("/Login");
        }, 2000);
        return;
      }
      router.push("/Home");
    } else {
      setNotification({
        message: "Please fill in all fields",
        type: "error",
        title: "Error",
        is_open: true,
        image_url: "",
        action: () => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
        router.push("/Login");
      }, 2000);
      return;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.img}
        alt="logo"
      />
      <Text style={styles.welcomingText}>Welcome back</Text>
      <View style={styles.hero}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textinput}
              placeholder="Email"
              inputMode="email"
              value={email}
              onChangeText={(newtext) => setEmail(newtext)}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textinput}
              secureTextEntry={!showPassword}
              placeholder="Password"
              value={password}
              onChangeText={(newtext) => setPassword(newtext)}
              autoCapitalize="none"
            />
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={24}
              color={colors.dark}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
        </View>
        <View style={styles.field}>
          <TouchableOpacity onPress={() => router.push("/ForgetPassword")}>
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </TouchableOpacity>
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
      <TouchableOpacity style={styles.startBtn} onPress={loginHandler}>
        {isloading ? (
          <ActivityIndicator size={30} color={colors.light} />
        ) : (
          <Text style={styles.startText}>Login</Text>
        )}
      </TouchableOpacity>
      <View style={styles.SignUp}>
        <Text style={styles.SignUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/SignUp")}>
          <Text style={styles.SignUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {notification.is_open && (
        <NotificationCard
          title={notification.title}
          message={notification.message}
          type={notification.type}
          is_open={notification.is_open}
          image_url={notification.image_url}
          action={notification.action}
          onClose={() =>
            setNotification((prev) => ({ ...prev, is_open: false }))
          }
        />
      )}
    </ScrollView>
  );
};

export default Login;

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
  input: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.opacity.dark[20],
    borderRadius: 5,
    height: 50,
    paddingInline: 5,
    gap: 5,
  },
  textinput: {
    color: colors.dark,
    paddingLeft: 8,
    paddingBlock: 15,
    fontSize: 20,
    fontFamily: "Jaldi",
    flex: 1,
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
    height: 50,
  },
  google_img: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  google_text: {
    fontSize: 25,
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
  SignUp: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
  SignUpText: {
    fontFamily: "Jaldi",
    fontSize: 20,
    color: colors.dark,
  },
  SignUpLink: {
    color: colors.cyan[300],
    fontSize: 20,
    fontFamily: "Jaldi-bold",
  },
});
