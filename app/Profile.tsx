import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";
import ProfileHeader from "@/components/ProfileHeader";
import { useRouter } from "expo-router";

const Profile = () => {
  const [fullName, setFullName] = useState<string>();
  const [job, setJob] = useState<string>();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
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
          <Text style={styles.label}>Job</Text>
          <TextInput
            style={styles.textinput}
            inputMode="text"
            placeholder="Frontend developer"
            value={job}
            onChangeText={(newtext) => setJob(newtext)}
          />
        </View>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => router.push("/Setting")}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 100,
    alignSelf: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
  },
});
