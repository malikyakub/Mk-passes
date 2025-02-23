import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/components/ProfileHeader";
import { router } from "expo-router";
import OTPInput from "@/components/OTPInput";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";

interface User {
  id: string;
  fullname: string;
  email: string;
  image_url: string;
}

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState<string>();
  const [codeIsSent, setCodeIsSent] = useState<Boolean>(false);
  const { GetLoggedInUser } = useAuth();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await GetLoggedInUser();
      const userInfo = await supabase
        .from("users")
        .select("*")
        .eq("id", loggedInUser?.id)
        .single();
      if (userInfo.data) {
        setUser(userInfo.data);
      } else {
        console.error(userInfo.error);
      }
    };
    fetchUser();
  }, [user]);

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
          {!codeIsSent ? (
            <View style={styles.field}>
              <Text style={styles.label}>Please enter your new email</Text>
              <TextInput
                style={styles.textinput}
                placeholder="New Email"
                value={newEmail}
                onChangeText={(text) => setNewEmail(text)}
              />
            </View>
          ) : (
            <OTPInput digits={6} />
          )}

          <TouchableOpacity
            style={styles.ContinueBtn}
            onPress={
              codeIsSent
                ? () => router.push("/Home")
                : () => setCodeIsSent(true)
            }
          >
            <Text style={styles.ContinueText}>
              {codeIsSent ? "Verify" : "Send Code"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangeEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan[100],
  },
  keyboardContainer: {
    flex: 1,
  },
  hero: {
    padding: 20,
    width: "100%",
    marginVertical: 20,
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
    fontSize: 30,
    fontFamily: "Jaini",
    color: colors.cyan[300],
    marginBottom: 20,
  },
  field: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontFamily: "jaldi",
    fontSize: 18,
    color: colors.dark,
    marginBottom: 5,
  },
  textinput: {
    backgroundColor: colors.opacity.dark[20],
    color: colors.dark,
    paddingLeft: 8,
    fontSize: 18,
    fontFamily: "Jaldi",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  ContinueBtn: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.cyan[300],
    marginTop: 20,
  },
  ContinueText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Jaini",
  },
});
