import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import colors from "@/assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/components/ProfileHeader";

const PasswordChange = () => {
  const [newPassword, setNewPassword] = useState<string>();
  const [oldPassword, setOldPassword] = useState<string>();
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>();

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.hero}>
          <View style={styles.field}>
            <Text style={styles.label}>Old password</Text>
            <TextInput
              style={styles.textinput}
              secureTextEntry
              placeholder="Old password"
              value={oldPassword}
              onChangeText={(newtext) => setOldPassword(newtext)}
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
        </ScrollView>
      </KeyboardAvoidingView>
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
  
});
