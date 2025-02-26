import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";
import BottomNav from "@/components/BottomNav";
import UserHeader from "@/components/UserHeader";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import useAuth from "@/hooks/useAuth";
import useUsers from "@/hooks/useUsers";
import NotificationCard from "@/components/NotificationCard";
import ConfirmCard from "@/components/ConfirmCard";
import usePasswords from "@/hooks/usePasswords";
import { supabase } from "@/utils/supabase";
import deleteUserAccount from "@/assets/models/Deleteuser";

interface User {
  id: string;
  fullname: string;
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

interface ConfirmCard {
  is_open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onAccept: () => void;
}

const Userpage = () => {
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);
  const [screeCaptureAllowed, setScreeCaptureAllowed] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [appThemeLight, setAppThemeLight] = useState(false);
  const [notificationsAllowed, setNotificationsAllowed] = useState(true);
  const router = useRouter();
  const { GetLoggedInUser, isloading, signOut } = useAuth();
  const { DeleteUser, ClearUserProfile, SaveSettingsToSession } = useUsers();
  const { DeleteAllPasswords } = usePasswords();
  const [user, setUser] = useState<User>();
  const [notification, setNotification] = useState<Notification>({
    message: "",
    type: "",
    title: "",
    is_open: false,
    image_url: "",
    action: () => {},
  });
  const [confirmDialog, setConfirmDialog] = useState<ConfirmCard>({
    is_open: false,
    title: "",
    message: "",
    onAccept: () => {},
    onClose: () => {},
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

  const logoutHandler = async () => {
    setConfirmDialog({
      is_open: true,
      title: "Logout",
      message: "Are you sure you want to logout from this account?",
      onAccept: async () => {
        await signOut();
        setConfirmDialog({ ...confirmDialog, is_open: false });
        router.push("/Login");
      },
      onClose: () => {
        setConfirmDialog({ ...confirmDialog, is_open: false });
      },
    });
  };

  const deletHandler = async () => {
    if (!user?.id) {
      setNotification({
        title: "Delete account",
        message: "User ID not found",
        type: "error",
        is_open: true,
        action: () => {
          router.push("/Login");
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
        router.push("/Login");
      }, 3000);
      return;
    }

    setConfirmDialog({
      is_open: true,
      title: "Delete account",
      message:
        "Are you sure you wanna delete your account along with all your data?",
      onAccept: async () => {
        setConfirmDialog({ ...confirmDialog, is_open: false });
        try {
          await deleteUserAccount(user.id);
          const { err: passwordDeleteErr } = await DeleteAllPasswords(user.id);
          if (passwordDeleteErr) {
            console.log(passwordDeleteErr);
          }

          const { err } = await DeleteUser(user.id);
          if (err) {
            console.log(err);
            setNotification({
              title: "Delete account",
              message: err,
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

          await ClearUserProfile(user.id);
          await signOut();
          setNotification({
            title: "Success",
            message: "Account deleted successfully",
            type: "success",
            is_open: true,
            action: () => {
              router.push("/Login");
              clearTimeout(timeout);
            },
          });

          const timeout = setTimeout(() => {
            setNotification((prev) => ({ ...prev, is_open: false }));
            router.push("/Login");
          }, 3000);
        } catch (error) {
          console.error("Error deleting user account:", error);
          setNotification({
            title: "Delete account",
            message: "An error occurred while deleting your account",
            type: "error",
            is_open: true,
            action: () => {
              setNotification((prev) => ({ ...prev, is_open: false }));
              clearTimeout(timeout);
            },
          });

          const timeout = setTimeout(() => {
            setNotification((prev) => ({ ...prev, is_open: false }));
          }, 3000);
        } finally {
          setConfirmDialog({ ...confirmDialog, is_open: false });
        }
      },
      onClose: () => {
        setConfirmDialog({ ...confirmDialog, is_open: false });
      },
    });
  };

  const clearHandler = async () => {
    if (!user?.id) {
      setNotification({
        title: "Clear Passwords",
        message: "User ID not found",
        type: "error",
        is_open: true,
        action: () => {
          router.push("/Login");
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
        router.push("/Login");
      }, 3000);
      return;
    }

    setConfirmDialog({
      is_open: true,
      title: "Clear Passwords",
      message: "Are you sure you wanna clear all your passwords?",
      onAccept: async () => {
        setConfirmDialog({ ...confirmDialog, is_open: false });
        const { data, err } = await DeleteAllPasswords(user.id);
        if (err) {
          console.log(err);
          setNotification({
            title: "Clear passwords",
            message: err,
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
          title: "Clear passwords",
          message: data,
          type: "success",
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
      },
      onClose: () => {
        setConfirmDialog({ ...confirmDialog, is_open: false });
      },
    });
  };

  async function loadUserSettings() {
    try {
      const storedSettings = await AsyncStorage.getItem("userSettings");
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setIsAppLockEnabled(parsedSettings.isAppLockEnabled || false);
        setScreeCaptureAllowed(parsedSettings.screeCaptureAllowed || false);
        setBiometricsEnabled(parsedSettings.biometricsEnabled || false);
        setAppThemeLight(parsedSettings.appThemeLight || false);
        setNotificationsAllowed(parsedSettings.notificationsAllowed || false);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }

  useEffect(() => {
    loadUserSettings();
  }, []);

  const handleToggle = async (settingKey: string, currentValue: boolean) => {
    const newValue = !currentValue;
    updateLocalState(settingKey, newValue);

    try {
      const { err } = await SaveSettingsToSession({ [settingKey]: newValue });

      if (err) {
        console.log("Error saving setting:", err);
        updateLocalState(settingKey, currentValue);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      updateLocalState(settingKey, currentValue);
    }
  };

  const updateLocalState = (key: string, value: boolean) => {
    if (key === "isAppLockEnabled") setIsAppLockEnabled(value);
    if (key === "screeCaptureAllowed") setScreeCaptureAllowed(value);
    if (key === "biometricsEnabled") setBiometricsEnabled(value);
    if (key === "appThemeLight") setAppThemeLight(value);
    if (key === "notificationsAllowed") setNotificationsAllowed(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader
        fullname={user?.fullname}
        email={user?.email}
        image_url={user?.image_url}
      />
      <ScrollView style={styles.hero}>
        <View style={styles.section}>
          <Text style={styles.section_header}>Account Information</Text>
          <TouchableOpacity
            style={styles.sub_section}
            onPress={() => router.push("/Profile")}
          >
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/user.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>Profile</Text>
                <Text style={styles.section_details}>Update your profile</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.sub_section}
            onPress={() => router.push("/ChangeEmail")}
          >
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/email.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>Change Email</Text>
                <Text style={styles.section_details}>m**b@hotmail.com</Text>
              </View>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => router.push("/PasswordChange")}
            style={styles.sub_section}
          >
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/key.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>Change Password</Text>
                <Text style={styles.section_details}></Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.line}></View>
        </View>
        <View style={styles.section}>
          <Text style={styles.section_header}>Security</Text>
          <View style={styles.sub_section}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/lock.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>App lock</Text>
                <Text style={styles.section_details}>
                  Require app lock when you open the app
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: colors.opacity.dark[50],
                  true: colors.opacity.cyan[50],
                }}
                thumbColor={isAppLockEnabled ? colors.cyan[300] : colors.dark}
                ios_backgroundColor={colors.opacity.dark[50]}
                onValueChange={() =>
                  handleToggle("isAppLockEnabled", isAppLockEnabled)
                }
                value={isAppLockEnabled}
                style={{ position: "absolute", right: 0 }}
              />
            </View>
          </View>
          <View style={styles.sub_section}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/screen-capture.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>Screen capture</Text>
                <Text style={styles.section_details}>
                  Allow other applications to capture your screen
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: colors.opacity.dark[50],
                  true: colors.opacity.cyan[50],
                }}
                thumbColor={
                  screeCaptureAllowed ? colors.cyan[300] : colors.dark
                }
                ios_backgroundColor={colors.opacity.dark[50]}
                onValueChange={() =>
                  handleToggle("screeCaptureAllowed", screeCaptureAllowed)
                }
                value={screeCaptureAllowed}
                style={{ position: "absolute", right: 0 }}
              />
            </View>
          </View>
          <View style={styles.sub_section}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/fingerprint.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>Enable biometrics</Text>
                <Text style={styles.section_details}>
                  Fingerprint or Face Id
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: colors.opacity.dark[50],
                  true: colors.opacity.cyan[50],
                }}
                thumbColor={biometricsEnabled ? colors.cyan[300] : colors.dark}
                ios_backgroundColor={colors.opacity.dark[50]}
                onValueChange={() =>
                  handleToggle("biometricsEnabled", biometricsEnabled)
                }
                value={biometricsEnabled}
                style={{ position: "absolute", right: 0 }}
              />
            </View>
          </View>
          <View style={styles.line}></View>
        </View>
        <View style={styles.section}>
          <Text style={styles.section_header}>General settings</Text>
          <View style={styles.sub_section}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/theme.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>App theme</Text>
                <Text style={styles.section_details}>
                  {appThemeLight ? "Light" : "Dark"}
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: colors.opacity.dark[50],
                  true: colors.opacity.cyan[50],
                }}
                thumbColor={appThemeLight ? colors.cyan[300] : colors.dark}
                ios_backgroundColor={colors.opacity.dark[50]}
                onValueChange={() =>
                  handleToggle("appThemeLight", appThemeLight)
                }
                value={appThemeLight}
                style={{ position: "absolute", right: 0 }}
              />
            </View>
          </View>
          <View style={styles.sub_section}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/bell.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>Allow notifications</Text>
                <Text style={styles.section_details}>notifications</Text>
              </View>
              <Switch
                trackColor={{
                  false: colors.opacity.dark[50],
                  true: colors.opacity.cyan[50],
                }}
                thumbColor={
                  notificationsAllowed ? colors.cyan[300] : colors.dark
                }
                ios_backgroundColor={colors.opacity.dark[50]}
                onValueChange={() =>
                  handleToggle("notificationsAllowed", notificationsAllowed)
                }
                value={notificationsAllowed}
                style={{ position: "absolute", right: 0 }}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.sub_section}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/language.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>Language</Text>
                <Text style={styles.section_details}>System language</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sub_section}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/location.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text}>Region</Text>
                <Text style={styles.section_details}>banadir mogadisu</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.line}></View>
        </View>
        <View style={styles.section}>
          <Text style={styles.section_header_Danger}>Danger zone</Text>
          <TouchableOpacity style={styles.sub_section} onPress={logoutHandler}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/logout.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text_danger}>Log out</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sub_section} onPress={clearHandler}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/clean.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text_danger}>Clear passowrds</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sub_section} onPress={deletHandler}>
            <View style={styles.section_info}>
              <Image
                style={styles.section_icon}
                source={require("@/assets/Icons/delete.png")}
              />
              <View style={styles.txt}>
                <Text style={styles.section_text_danger}>Delete account</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.line}></View>
        </View>
      </ScrollView>
      <BottomNav current={"settings"} />
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

      <ConfirmCard
        title={confirmDialog.title}
        message={confirmDialog.message}
        is_open={confirmDialog.is_open}
        onClose={() => setConfirmDialog({ ...confirmDialog, is_open: false })}
        onAccept={confirmDialog.onAccept}
      />
    </SafeAreaView>
  );
};

export default Userpage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cyan[100],
    justifyContent: "center",
    flex: 1,
  },
  hero: {
    flex: 1,
    padding: 20,
    zIndex: 1,
  },
  section: {
    marginBlock: 10,
  },
  sub_section: {
    marginBottom: 10,
  },
  section_header: {
    fontSize: 25,
    fontFamily: "jaldi",
    fontWeight: "bold",
    color: colors.cyan[300],
    marginBottom: 10,
  },
  section_header_Danger: {
    fontSize: 25,
    fontFamily: "jaldi",
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 10,
  },
  section_info: {
    display: "flex",
    flexDirection: "row",
  },
  section_icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 15,
  },
  txt: {
    display: "flex",
    flexDirection: "column",
  },
  section_text: {
    fontSize: 18,
    fontFamily: "jaldi",
    color: colors.dark,
  },
  section_text_danger: {
    fontSize: 20,
    fontFamily: "jaldi",
    color: colors.dark,
  },
  section_details: {
    fontFamily: "jaldi",
    fontSize: 10,
    color: colors.dark,
    opacity: 0.8,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.cyan[300],
    marginTop: 10,
  },
});