import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Clipboard,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState, useEffect } from "react";
import colors from "@/assets/colors/colors";

const TextOut = ({ msg, placeholder }) => {
  const [text, setText] = useState(null);

  useEffect(() => {
    setText(msg);
  }, [msg]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor={colors.light}
        placeholder={`${placeholder} message appears here...`}
        value={text}
        onChangeText={(newText) => setText(newText)}
      />
      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn} onPress={() => setText("")}>
          <MaterialIcons name="clear" size={24} color={colors["darkest-pri"]} />
          <Text style={styles.btnText}>clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => Clipboard.setString(text)}
        >
          <FontAwesome5 name="copy" size={24} color={colors["darkest-pri"]} />
          <Text style={styles.btnText}>copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextOut;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    height: 300,
    borderRadius: 5,
    backgroundColor: "#000",
    overflow: "hidden",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  textArea: {
    backgroundColor: colors.dark,
    textAlignVertical: "top",
    color: colors.light,
    fontSize: 20,
    height: 230,
    width: "100%",
    fontFamily: "Fira",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 170,
    marginBlock: 10,
  },
  btn: {
    backgroundColor: colors["darker-pri"],
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    width: 80,
  },
  btnText: {
    fontSize: 20,
    fontFamily: "Jaldi",
    fontWeight: "bold",
    color: colors.dark,
  },
});
