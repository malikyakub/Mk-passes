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
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";
import ProfileHeader from "@/components/ProfileHeader";
import { useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";

interface User {
  id: string;
  fullname: string;
  email: string;
  image_url: string;
}

const Profile = () => {
  const [fullName, setFullName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const router = useRouter();
  const { GetLoggedInUser } = useAuth();
  const [user, setUser] = useState<User>();

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

  console.log(user?.id);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
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
                  placeholder="malik yakub"
                  value={fullName}
                  onChangeText={(newtext) => setFullName(newtext)}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.textinput}
                  inputMode="text"
                  placeholder="mk-yare"
                  value={username}
                  onChangeText={(newtext) => setUsername(newtext)}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => router.push("/Setting")}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
