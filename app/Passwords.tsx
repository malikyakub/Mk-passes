import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PasswordCard from "@/components/PasswordCard";
import passwordJson from "@/assets/api/passwords.json";

type Password = {
  ID: number;
  "account-name": string;
  username: string;
  email: string;
  password: string;
  icon: string;
};

const Passwords = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);

  useEffect(() => {
    setPasswords(passwordJson as Password[]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        {passwords.map((password) => (
          <PasswordCard
            key={password.ID}
            passId={password.ID}
            accountName={password["account-name"]}
            username={password.username}
            email={password.email}
            password={password.password}
            icon={password.icon}
          />
        ))}
      </View>
      <BottomNav current={"passwords"} />
    </SafeAreaView>
  );
};

export default Passwords;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
  },
  hero: {
    flex: 1,
    padding: 20,
    zIndex: 1,
  },
});
