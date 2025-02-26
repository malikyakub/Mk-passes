import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PasswordCard from "@/components/PasswordCard";
import usePasswords from "@/hooks/usePasswords";
import useAuth from "@/hooks/useAuth";

type Password = {
  id: string;
  account_name: string;
  username: string;
  email: string;
  password: string;
  icon: string;
};

interface User {
  id: string;
  fullname: string;
  email: string;
  username: string;
}

const Passwords = () => {
  const { GetLoggedInUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetLoggedInUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const { passwords, isloading } = usePasswords(user?.id);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        {isloading ? (
          <ActivityIndicator size={30} color={colors.cyan[300]} />
        ) : (
          passwords.map((password) => (
            <PasswordCard
              key={password.id}
              passId={password.id}
              accountName={password.account_name}
              username={password.username}
              email={password.email}
              password={password.password}
              icon={password.icon}
            />
          ))
        )}
      </View>
      <BottomNav current={"passwords"} />
    </SafeAreaView>
  );
};

export default Passwords;

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
});
