import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";
import ProfileHeader from "@/components/ProfileHeader";
import { useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";
import useUsers from "@/hooks/useUsers";
import NotificationCard from "@/components/NotificationCard";

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
  const { UpdateUser, isLoading } = useUsers();
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
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser || !authUser.user) {
        console.error("No authenticated user found.");
        return;
      }

      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.user.id)
        .single();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

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
          }, 3000);
          return;
        }

        if (email) await UpdateUserEmail(email);

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
        }, 3000);
      } else {
        console.error("User ID is undefined");
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
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
          >
            <ProfileHeader
              fullname={user?.fullname}
              email={user?.email}
              image_url={user?.image_url}
              user_id={user?.id}
            />
            <View style={styles.hero}>
              <View style={styles.field}>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                  style={styles.textinput}
                  inputMode="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.textinput}
                  inputMode="email"
                  placeholder="Enter email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.textinput}
                  inputMode="text"
                  placeholder="Enter username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity style={styles.saveBtn} onPress={updateHandler}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    position: "relative",
  },
  scrollView: {
    flexGrow: 1,
  },
  hero: {
    flex: 1,
    padding: 20,
    zIndex: 1,
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
