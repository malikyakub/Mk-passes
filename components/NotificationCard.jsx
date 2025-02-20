import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const NotificationCard = ({
  type = "default",
  title,
  message,
  is_open,
  image_url,
  action,
  onClose,
}) => {
  if (!is_open) return null;

  let imageSource;
  let titleColor;

  switch (type) {
    case "success":
      imageSource = require("@/assets/Icons/success.png");
      titleColor = colors.notifications.success;
      break;
    case "info":
      imageSource = require("@/assets/Icons/info.png");
      titleColor = colors.notifications.info;
      break;
    case "error":
      imageSource = require("@/assets/Icons/error.png");
      titleColor = colors.notifications.error;
      break;
    case "warning":
      imageSource = require("@/assets/Icons/warning.png");
      titleColor = colors.notifications.warning;
      break;
    case "notification":
      imageSource = { uri: image_url };
      titleColor = colors.notifications.default;
      break;
    default:
      imageSource = require("@/assets/images/logo.png");
      titleColor = colors.notifications.default;
      break;
  }

  return (
    <TouchableOpacity onPress={action} style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.image_container}>
          <Image style={styles.image} source={imageSource} />
        </View>
        <View style={styles.text_cont}>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity style={styles.close_btn} onPress={onClose}>
          <AntDesign name="close" size={24} color={colors.dark} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 0,
    zIndex: 10,
  },
  hero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  text_cont: {
    flex: 1,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontFamily: "Jaldi-bold",
  },
  message: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: "Jaldi",
    color: colors.dark,
  },
  image_container: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  close_btn: {
    backgroundColor: colors.opacity.dark[20],
    padding: 2,
    borderRadius: 5,
  },
});
