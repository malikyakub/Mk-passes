import {
  Image,
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";
import BottomNav from "@/components/BottomNav";
import UserHeader from "@/components/UserHeader";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

const Userpage = () => {
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);
  const [screeCaptureAllowed, setScreeCaptureAllowed] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [appThemeLight, setAppThemeLight] = useState(false);
  const [notificationsAllowed, setNotificationsAllowed] = useState(true);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader />
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
          <TouchableOpacity
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
                <Text style={styles.section_details}>m******b@hotmail.com</Text>
              </View>
            </View>
          </TouchableOpacity>
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
                <Text style={styles.section_details}>************</Text>
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
                onValueChange={() => setIsAppLockEnabled(!isAppLockEnabled)}
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
                  setScreeCaptureAllowed(!screeCaptureAllowed)
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
                onValueChange={() => setBiometricsEnabled(!biometricsEnabled)}
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
                onValueChange={() => setAppThemeLight(!appThemeLight)}
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
                  setNotificationsAllowed(!notificationsAllowed)
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
          <TouchableOpacity style={styles.sub_section}>
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
          <TouchableOpacity style={styles.sub_section}>
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
          <TouchableOpacity style={styles.sub_section}>
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
