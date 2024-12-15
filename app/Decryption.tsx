import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import colors from "@/assets/colors/colors";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import TextOut from "@/components/TextOut";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

const Encryption = () => {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        <TextOut msg={text} placeholder={"Decrypted"} />
        <View style={styles.textCont}>
          <TextInput
            inputMode="text"
            placeholder="your message"
            placeholderTextColor={colors.light}
            style={styles.textInput}
            value={text}
            onChangeText={(newText) => setText(newText)}
          />
          <TouchableOpacity style={styles.btn} onPress={() => setText("")}>
            <MaterialIcons
              name="clear"
              size={24}
              color={colors["darkest-pri"]}
            />
            <Text style={styles.btnText}>clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <BottomNav current={"decryption"} />
      </View>
    </SafeAreaView>
  );
};

export default Encryption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
  },
  hero: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    zIndex: 1,
  },
  textCont: {
    backgroundColor: "#000",
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    backgroundColor: colors.dark,
    color: colors.light,
    fontSize: 20,
    height: "100%",
    width: "80%",
    fontFamily: "Jaldi",
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
