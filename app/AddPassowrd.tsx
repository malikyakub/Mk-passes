import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import colors from "@/assets/colors/colors";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "expo-router";

const AddPassword = () => {
  const [isActionCalled, setIsActionCalled] = useState(false);
  const [actionIsLFam, setActionIsLFam] = useState<boolean | null>(null);
  const router = useRouter();

  // Input states
  const [accountName, setAccountName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [digits, setDigits] = useState<number | null>(null); // Numeric value
  const [password, setPassword] = useState<string>("");

  const pressHandler = (opt: number) => {
    setActionIsLFam(opt === 1);
    setIsActionCalled(true);
  };

  const handleAddPress = () => {
    console.log({
      accountName,
      userName,
      digits,
      password,
    });
    router.push("/Passwords");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        {isActionCalled ? (
          <View style={styles.form}>
            <View>
              <TouchableOpacity onPress={() => setIsActionCalled(false)}>
                <Image
                  style={styles.back}
                  source={require("@/assets/Icons/back.png")}
                />
              </TouchableOpacity>
              <Text style={styles.label}>Account Name</Text>
              <TextInput
                style={styles.textinput}
                inputMode="text"
                placeholder="YouTube"
                value={accountName}
                onChangeText={setAccountName}
              />
            </View>
            <View>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.textinput}
                inputMode="text"
                placeholder="user012"
                value={userName}
                onChangeText={setUserName}
              />
            </View>
            <View>
              <Text style={styles.label}>Number of Digits</Text>
              <TextInput
                style={styles.textinput}
                inputMode="numeric"
                placeholder="12"
                value={digits?.toString() || ""}
                onChangeText={(text) => {
                  const num = parseInt(text, 10);
                  setDigits(!isNaN(num) ? num : null);
                }}
              />
            </View>
            <View style={styles.password}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.passwordTextinput}
                inputMode="text"
                placeholder={
                  actionIsLFam ? "Your password..." : "Create your password"
                }
                placeholderTextColor={colors.opacity.light[50]}
                editable={!actionIsLFam}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={handleAddPress}>
              <Text style={styles.addBtntext}>Add</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => pressHandler(1)}
              style={styles.card}
            >
              <View style={styles.side}></View>
              <Text style={styles.text}>L-fam Generated Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pressHandler(2)}
              style={styles.card}
            >
              <View style={styles.side}></View>
              <Text style={styles.text}>Manually Create Your Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <BottomNav current={"passwords"} />
    </SafeAreaView>
  );
};

export default AddPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan[100],
    justifyContent: "center",
  },
  hero: {
    flex: 1,
    padding: 20,
    zIndex: 1,
  },
  back: {
    marginBottom: 20,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  card: {
    height: 60,
    backgroundColor: colors.opacity.cyan[20],
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  side: {
    backgroundColor: colors.cyan[300],
    width: 10,
    height: "100%",
    position: "absolute",
    left: 0,
  },
  text: {
    fontFamily: "jaldi",
    fontSize: 20,
    color: colors.dark,
  },
  form: {
    // Form container
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
  password: {
    marginTop: 20,
  },
  passwordTextinput: {
    backgroundColor: colors.dark,
    color: colors.light,
    paddingLeft: 8,
    height: 60,
    fontSize: 20,
    fontFamily: "Jaldi",
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.cyan[300],
  },
  addBtn: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.cyan[300],
    marginTop: 100,
    alignSelf: "center",
  },
  addBtntext: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
  },
});
