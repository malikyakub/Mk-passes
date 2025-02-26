import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/components/ProfileHeader";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";
import NotificationCard from "@/components/NotificationCard";
import { router } from "expo-router";

interface User {
  id: string;
  fullname: string;
  email: string;
  image_url: string;
}

interface Notification {
  message: string;
  type: string;
  title: string;
  is_open: boolean;
  image_url?: string;
  action: () => void;
}

const PasswordChange = () => {
  const [newPassword, setNewPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>();
  const { GetLoggedInUser, UpdateUserPassword } = useAuth();
  const [user, setUser] = useState<User>();
  const [notification, setNotification] = useState<Notification>({
    message: "",
    type: "",
    title: "",
    is_open: false,
    image_url: "",
    action: () => {},
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetLoggedInUser();
      setUser(userData);

      //
    };
    fetchUser();
  }, []);

  const updateHandler = async () => {
    if (!newPassword || !email || !passwordConfirmation) {
      setNotification({
        title: "Warning",
        message: "All fields are required",
        type: "warning",
        is_open: true,
        action: () => setNotification((prev) => ({ ...prev, is_open: false })),
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 3000);
      return;
    }

    if (newPassword !== passwordConfirmation) {
      setNotification({
        title: "Error",
        message: "Passwords do not match",
        type: "error",
        is_open: true,
        action: () => setNotification((prev) => ({ ...prev, is_open: false })),
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 3000);
      return;
    }

    if (email !== user?.email) {
      setNotification({
        title: "Error",
        message: "Email does not match your account",
        type: "error",
        is_open: true,
        action: () => setNotification((prev) => ({ ...prev, is_open: false })),
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 3000);
      return;
    }

    try {
      const result = await UpdateUserPassword(newPassword);

      if (result) {
        throw new Error(result);
      }

      setNotification({
        title: "Success",
        message: "Password updated successfully",
        type: "success",
        is_open: true,
        action: () => setNotification((prev) => ({ ...prev, is_open: false })),
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
        router.push("/Setting");
      }, 3000);
    } catch (err: any) {
      setNotification({
        title: "Error",
        message: err.message || "Something went wrong",
        type: "error",
        is_open: true,
        action: () => setNotification((prev) => ({ ...prev, is_open: false })),
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        fullname={user?.fullname}
        email={user?.email}
        image_url={user?.image_url}
        user_id={user?.id}
      />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.hero}>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter your email"
              value={email}
              onChangeText={(newtext) => setEmail(newtext)}
              inputMode="email"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>New password</Text>
            <TextInput
              style={styles.textinput}
              secureTextEntry
              placeholder="New password"
              value={newPassword}
              onChangeText={(newtext) => setNewPassword(newtext)}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Confirm password</Text>
            <TextInput
              style={styles.textinput}
              secureTextEntry
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChangeText={(newtext) => setPasswordConfirmation(newtext)}
            />
          </View>
          <TouchableOpacity style={styles.saveBtn} onPress={updateHandler}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    </SafeAreaView>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cyan[100],
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  hero: {
    padding: 20,
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
    marginVertical: 5,
    borderRadius: 5,
  },
  saveBtn: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.cyan[300],
    marginTop: 50,
    alignSelf: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
  },
});
