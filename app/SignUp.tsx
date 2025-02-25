import {
  ActivityIndicator,
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
import useAuth from "@/hooks/useAuth";
import uuid from "react-native-uuid";
import NotificationCard from "@/components/NotificationCard";
import Entypo from "@expo/vector-icons/Entypo";

interface Notification {
  message: string;
  type: string;
  title: string;
  is_open: boolean;
  image_url?: string;
  action: () => void;
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification>({
    message: "",
    type: "",
    title: "",
    is_open: false,
    image_url: "",
    action: () => {},
  });

  const [form, setForm] = useState<{
    fullname: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { SignUp, isloading } = useAuth();

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = async () => {
    if (
      form.fullname === "" ||
      form.email === "" ||
      form.username === "" ||
      form.password === ""
    ) {
      setNotification({
        title: "Warning",
        message: "All fields are required",
        type: "warning",
        is_open: true,
        action: () => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 3000);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setNotification({
        title: "Error",
        message: "Passwords do not match",
        type: "error",
        is_open: true,
        action: () => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 3000);
      return;
    }

    const newUser = {
      fullname: form.fullname,
      email: form.email,
      username: form.username,
    };

    const { err } = await SignUp(form.email, form.password, newUser);
    if (err) {
      if (err.charCodeAt(0) === 100) {
        setNotification({
          title: "Warning",
          message: "User with this email already exists",
          type: "warning",
          is_open: true,
          action: () => {
            setNotification((prev) => ({ ...prev, is_open: false }));
            clearTimeout(timeout);
          },
        });
        const timeout = setTimeout(() => {
          setNotification((prev) => ({ ...prev, is_open: false }));
        }, 3000);
        return;
      } else {
        setNotification({
          title: "Account creation Failed",
          message: err,
          type: "error",
          is_open: true,
          action: () => {
            setNotification((prev) => ({ ...prev, is_open: false }));
            clearTimeout(timeout);
          },
        });
        const timeout = setTimeout(() => {
          setNotification((prev) => ({ ...prev, is_open: false }));
        }, 3000);
        return;
      }
    }

    setNotification({
      title: "Account created",
      message: "Account created successfully",
      type: "success",
      is_open: true,
      action: () => {
        router.push("/Profile");
        clearTimeout(timeout);
      },
    });
    const timeout = setTimeout(() => {
      setNotification((prev) => ({ ...prev, is_open: false }));
      router.push("/Home");
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomingText}>Create an account</Text>
      <View style={styles.hero}>
        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textinput}
              placeholder="Full Name"
              value={form.fullname}
              onChangeText={(value) => handleChange("fullname", value)}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textinput}
              placeholder="Email"
              inputMode="email"
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textinput}
              placeholder="Username"
              value={form.username}
              onChangeText={(value) => handleChange("username", value)}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Create password</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textinput}
              secureTextEntry={!showPassword}
              placeholder="Create password"
              value={form.password}
              onChangeText={(value) => handleChange("password", value)}
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
          <Text style={styles.label}>Confirm password</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textinput}
              secureTextEntry={!showPassword}
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
            />
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={24}
              color={colors.dark}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
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
      <TouchableOpacity style={styles.startBtn} onPress={handleSignUp}>
        {isloading ? (
          <ActivityIndicator size={30} color={colors.light} />
        ) : (
          <Text style={styles.startText}>Create account</Text>
        )}
      </TouchableOpacity>
      <View style={styles.Login}>
        <Text style={styles.LoginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <Text style={styles.LoginLink}>Login</Text>
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
    height: "100%",
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
    padding: 5,
    gap: 5,
  },
  textinput: {
    color: colors.dark,
    paddingLeft: 8,
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
    width: 200,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.cyan[300],
  },
  startText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
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
