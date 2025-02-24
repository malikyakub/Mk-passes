import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PasswordCard from "@/components/PasswordCard";
import passwordJson from "@/assets/api/passwords.json";
import usePasswords from "@/hooks/usePasswords";
import useAuth from "@/hooks/useAuth";
import { isLoading } from "expo-font";
import { supabase } from "@/utils/supabase";

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
  const [passwords, setPasswords] = useState<Password[]>([]);
  const { GetPasswords, isloading } = usePasswords();
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

  useEffect(() => {
    if (!user?.id) return;

    const fetchPasswords = async () => {
      const { data, err } = await GetPasswords(user.id);
      if (err) {
        console.log(err);
        return;
      }
      setPasswords(data);
    };

    fetchPasswords();
  }, [user]);

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
