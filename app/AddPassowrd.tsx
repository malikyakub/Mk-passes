import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import colors from "@/assets/colors/colors";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "expo-router";
import PasswordGenerator from "@/assets/models/PasswordGenerator";
import uuid from "react-native-uuid";
import useAuth from "@/hooks/useAuth";
import usePasswords from "@/hooks/usePasswords";
import NotificationCard from "@/components/NotificationCard";
import { supabase } from "@/utils/supabase";

interface User {
  id: string;
  fullname: string;
  email: string;
  username: string;
}

interface Notification {
  message: string;
  type: string;
  title: string;
  is_open: boolean;
  image_url?: string;
  action: () => void;
}

const AddPassword = () => {
  const [isActionCalled, setIsActionCalled] = useState(false);
  const [actionIsLFam, setActionIsLFam] = useState<boolean | null>(null);
  const [notification, setNotification] = useState<Notification>({
    message: "",
    type: "",
    title: "",
    is_open: false,
    image_url: "",
    action: () => {},
  });
  const router = useRouter();
  const [passid, setPassId] = useState<string>(uuid.v4());
  const [accountName, setAccountName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [digits, setDigits] = useState<number | null>(null);
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User>();

  // const { GetLoggedInUser } = useAuth();
  const { CreateNewPassword, isloading } = usePasswords();

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

  const { LFam } = PasswordGenerator({
    accountName,
    username: userName,
    digits,
  });

  const pressHandler = (opt: number) => {
    setActionIsLFam(opt === 1);
    setIsActionCalled(true);
  };

  const handleAddPress = async () => {
    if (password) {
      const newPassword = {
        id: passid,
        user_id: user?.id,
        account_name: accountName,
        username: userName,
        password: password,
        icon: accountName.toLowerCase(),
      };
      const { err } = await CreateNewPassword(newPassword);
      if (err) {
        if (err.charCodeAt(0) == 110) {
          setNotification({
            title: "Error",
            message: "Your're not logged in",
            type: "error",
            is_open: true,
            action: () => {
              router.push("/Login"), clearTimeout(timeout);
            },
          });
          const timeout = setTimeout(() => {
            setNotification((prev) => ({ ...prev, is_open: false }));
            router.push("/Login");
          }, 3000);
          return;
        }
        setNotification({
          title: "Error",
          message: "An error occured please try again",
          type: "error",
          is_open: true,
          action: () => {
            setNotification((prev) => ({ ...prev, is_open: false }));
            clearTimeout(timeout);
          },
        });
        const timeout = setTimeout(() => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          router.push("/Login");
        }, 3000);
        return;
      }

      setNotification({
        title: "Success",
        message: "Password created successfully",
        type: "success",
        is_open: true,
        action: () => {
          router.push(`../password/${passid}`);
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
        router.push("/Login");
      }, 3000);
      return;
    } else {
      setNotification({
        title: "Warning",
        message: "All fields are required",
        type: "warning",
        is_open: true,
        action: () => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 3000);
      return;
    }
  };

  useEffect(() => {
    if (actionIsLFam && accountName && userName) {
      const generatedPassword = LFam();
      setPassword(generatedPassword);
      setDigits(generatedPassword.length);
    }
  }, [accountName, userName, actionIsLFam]);

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
                editable={!actionIsLFam}
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
  form: {},
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
