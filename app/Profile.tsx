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
import useUsers from "@/hooks/useUsers";
import NotificationCard from "@/components/NotificationCard";
import { useRouter } from "expo-router";

interface User {
  id: string;
  fullname: string;
  username: string;
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

const Profile = () => {
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const router = useRouter();
  const { GetLoggedInUser, UpdateUserEmail } = useAuth();
  const { UpdateUser } = useUsers();
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
    };
    fetchUser();
  }, []);

  const updateHandler = async () => {
    if (fullName || username || email) {
      if (user?.id) {
        const updatedData: Partial<User> = {};
        if (fullName) updatedData.fullname = fullName;
        if (email) updatedData.email = email;
        if (username) updatedData.username = username;

        const { err } = await UpdateUser(user.id, updatedData);
        if (err) {
          setNotification({
            title: "Error",
            message: err,
            type: "error",
            is_open: true,
            action: () =>
              setNotification((prev) => ({ ...prev, is_open: false })),
          });
          setTimeout(() => {
            setNotification((prev) => ({ ...prev, is_open: false }));
          }, 2000);
          return;
        }

        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            fullname: fullName ? fullName : prev.fullname,
            email: email ? email : prev.email,
            username: username ? username : prev.username,
          };
        });

        setNotification({
          title: "Update Successful",
          message: "Your profile has been updated",
          type: "success",
          is_open: true,
          action: () =>
            setNotification((prev) => ({ ...prev, is_open: false })),
        });
        setTimeout(() => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          router.push("/Setting");
        }, 2000);
      } else {
        router.push("/Login");
      }
    } else {
      setNotification({
        title: "Warning",
        message: "All fields are required",
        type: "warning",
        is_open: true,
        action: () => setNotification((prev) => ({ ...prev, is_open: false })),
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 2000);
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
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              readOnly
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
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

export default Profile;

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
