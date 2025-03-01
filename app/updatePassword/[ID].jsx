import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Clipboard,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import usePasswords from "@/hooks/usePasswords";
import colors from "@/assets/colors/colors";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfirmCard from "@/components/ConfirmCard";
import NotificationCard from "@/components/NotificationCard";
import { Entypo, Ionicons } from "@expo/vector-icons";

const imageMap = {
  youtube: require("@/assets/api/images/youtube.png"),
  facebook: require("@/assets/api/images/facebook.png"),
};

const UpdatePassword = () => {
  const { ID } = useLocalSearchParams();
  const { GetPassword, isloading, DeletePassword, UpdatePassword } =
    usePasswords();
  const [password, setPassword] = useState();
  const [showNPassword, setShowNPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [copiedCpass, setCopiedCpass] = useState(false);
  const [copiedNpass, setCopiedNpass] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    title: "",
    is_open: false,
    image_url: "",
    action: () => {},
  });
  const [confirmDialog, setConfirmDialog] = useState({
    is_open: false,
    title: "",
    message: "",
    onAccept: () => {},
    onCancel: () => {},
  });

  useEffect(() => {
    const fetchPassword = async () => {
      if (ID) {
        const { data, err } = await GetPassword(ID);
        if (err) {
          console.error("Error fetching password:", err);
        } else {
          setPassword(data);
        }
      }
    };

    fetchPassword();
  }, [ID]);

  const copyHandler = (type) => {
    if (type === "current") {
      Clipboard.setString(password.password);
      setCopiedCpass(true);
      setTimeout(() => setCopiedCpass(false), 3000);
    } else if (type === "new") {
      Clipboard.setString(newPassword);
      setCopiedNpass(true);
      setTimeout(() => setCopiedNpass(false), 3000);
    }
  };

  const deleteHandler = () => {
    setConfirmDialog({
      is_open: true,
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this password?",
      onAccept: async () => {
        const { err } = DeletePassword(ID);
        if (err) {
          setNotification({
            title: "Error",
            message: "Error happened",
            type: "error",
            is_open: true,
            action: () => {
              setNotification((prev) => ({ ...prev, is_open: false }));
              clearTimeout(timeout);
            },
          });
          const timeout = setTimeout(() => {
            setNotification((prev) => ({ ...prev, is_open: false }));
          }, 2000);
          return;
        }
        setConfirmDialog({ ...confirmDialog, is_open: false });
        setNotification({
          title: "Deleted successfully",
          message:
            "the password " + password.password + " deleted succesifully",
          type: "success",
          is_open: true,
          action: () => {
            setNotification(router.push("/Passwords"));
            clearTimeout(timeout);
          },
        });
        const timeout = setTimeout(() => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          router.push("/Passwords");
        }, 2000);
        return;
      },
      onCancel: () => {
        setConfirmDialog({ ...confirmDialog, is_open: false });
      },
    });
  };

  const updateHandler = async () => {
    const { err } = await UpdatePassword(ID, { password: newPassword });
    if (err) {
      console.log(err);
      setNotification({
        title: "Error",
        message: err,
        type: "error",
        is_open: true,
        action: () => {
          setNotification(router.push("/Passwords"));
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
        router.push("/Passwords");
      }, 2000);
      return;
    }
    setNotification({
      title: "Updated successfully",
      message: "the password " + password.password + " updated succesifully",
      type: "success",
      is_open: true,
      action: () => {
        setNotification(router.push("/Passwords"));
        clearTimeout(timeout);
      },
    });
    const timeout = setTimeout(() => {
      setNotification((prev) => ({ ...prev, is_open: false }));
      router.push("/Passwords");
    }, 2000);
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        {isloading ? (
          <ActivityIndicator size="large" color={colors.cyan[300]} />
        ) : password ? (
          <>
            <View style={styles.password_header}>
              <TouchableOpacity
                style={styles.back_btn}
                onPress={() => router.back()}
              >
                <Image
                  style={styles.back_img}
                  source={require("../../assets/Icons/back.png")}
                />
              </TouchableOpacity>
              {imageMap[password.icon] ? (
                <Image
                  source={imageMap[password.icon]}
                  style={styles.pass_image}
                />
              ) : (
                <Image
                  source={require("@/assets/Icons/no-profile.png")}
                  style={styles.pass_image}
                />
              )}
              <Text style={styles.accountName}>{password.account_name}</Text>
              <Text>
                {new Date(password.created_at).toLocaleDateString("en-CA")}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Current Password</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textinput}
                  secureTextEntry={!showCPassword}
                  placeholder="Current password"
                  value={password.password}
                  readOnly
                />
                <Entypo
                  name={showCPassword ? "eye" : "eye-with-line"}
                  size={24}
                  color={colors.dark}
                  onPress={() => setShowCPassword(!showCPassword)}
                />
                {copiedCpass ? (
                  <Text style={styles.copy}>Copied</Text>
                ) : (
                  <Ionicons
                    name="copy"
                    size={24}
                    color={colors.dark}
                    onPress={() => copyHandler("current")}
                  />
                )}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textinput}
                  secureTextEntry={!showNPassword}
                  placeholder="New password"
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                />
                <Entypo
                  name={showNPassword ? "eye" : "eye-with-line"}
                  size={24}
                  color={colors.dark}
                  onPress={() => setShowNPassword(!showNPassword)}
                />
                {copiedNpass ? (
                  <Text style={styles.copy}>Copied</Text>
                ) : (
                  <Ionicons
                    name="copy"
                    size={24}
                    color={colors.dark}
                    onPress={() => copyHandler("new")}
                  />
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.saveBtn} onPress={updateHandler}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.txt}>No password found for this ID.</Text>
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

export default UpdatePassword;

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
  back_img: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  back_btn: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  password_header: {
    backgroundColor: colors.opacity.cyan[20],
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  pass_image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  accountName: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Jaini",
    color: colors.dark,
  },
  card: {
    backgroundColor: colors.opacity.cyan[20],
    marginTop: 20,
    display: "flex",
    paddingLeft: 60,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    overflow: "hidden",
  },
  side: {
    backgroundColor: colors.cyan[300],
    width: 10,
    height: "100%",
    position: "absolute",
    left: 0,
  },
  field: {
    marginBottom: 10,
  },
  label: {
    fontFamily: "jaldi",
    fontSize: 20,
    color: colors.dark,
  },
  input: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.opacity.dark[20],
    borderRadius: 5,
    padding: 5,
    gap: 10,
  },
  textinput: {
    color: colors.dark,
    paddingLeft: 8,
    fontSize: 20,
    fontFamily: "Jaldi",
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 15,
    resizeMode: "contain",
  },
  txt: {
    fontSize: 18,
    marginLeft: 5,
    fontFamily: "jaldi",
    fontWeight: "bold",
    opacity: 0.5,
  },
  next_btn: {
    position: "absolute",
    right: 20,
  },
  next_img: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  copy: {
    fontSize: 20,
    color: colors.cyan[300],
    fontFamily: "Jaldi",
    marginRight: 10,
  },
  saveBtn: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.cyan[300],
    marginTop: 50,
    alignSelf: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Jaini",
  },
});
