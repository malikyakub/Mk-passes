import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";

const ConfirmCard = ({ title, message, is_open, onClose, onAccept }) => {
  if (!is_open) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.bg}></View>
        <View style={styles.text_container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.btn_text}>CANCEL</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.btn} onPress={onAccept}>
            <Text style={styles.btn_text}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmCard;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    backgroundColor: colors.opacity.dark[50],
    width: "100%",
    height: "150%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  card: {
    width: "80%",
    display: "flex",
    padding: 20,
    backgroundColor: colors.light,
    borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  text_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Jaldi-bold",
    fontSize: 40,
    color: colors.cyan[300],
  },
  message: {
    fontFamily: "Jaldi",
    fontSize: 20,
    color: colors.dark,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 40,
  },
  line: {
    width: 1,
    backgroundColor: colors.dark,
    height: "100%",
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    fontFamily: "Jaldi-bold",
    fontSize: 20,
    color: colors.cyan[300],
    letterSpacing: 1,
  },
});
