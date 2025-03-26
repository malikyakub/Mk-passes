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
import colors from "@/assets/colors/light_colors";

const TextOut = ({ msg, placeholder, onclear }) => {
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
        placeholderTextColor={colors.white}
        placeholder={`${placeholder} message appears here...`}
        value={text}
        onChangeText={(newText) => setText(newText)}
        readOnly
      />
      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn} onPress={onclear}>
          <MaterialIcons name="clear" size={24} color={colors.cyan[300]} />
          <Text style={styles.btnText}>clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => Clipboard.setString(text)}
        >
          <FontAwesome5 name="copy" size={24} color={colors.cyan[300]} />
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
    backgroundColor: colors.black,
    overflow: "hidden",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  textArea: {
    backgroundColor: colors.dark,
    textAlignVertical: "top",
    color: colors.white,
    fontSize: 20,
    height: 230,
    width: "100%",
    fontFamily: "Fira",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBlock: 10,
    gap: 10,
  },
  btn: {
    backgroundColor: colors.cyan[200],
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    flex: 1,
  },
  btnText: {
    fontSize: 20,
    fontFamily: "Jaldi",
    fontWeight: "bold",
    color: colors.dark,
  },
});
