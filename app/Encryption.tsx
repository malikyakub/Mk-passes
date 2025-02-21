import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "@/assets/colors/colors";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import TextOut from "@/components/TextOut";
import useLFam from "@/hooks/useL-Fam";
import { useState, useMemo } from "react";

const Encryption = () => {
  const [text, setText] = useState("");
  const { encryptText } = useLFam();

  const encryptedText = useMemo(() => encryptText(text), [text]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.hero}>
        <TextOut msg={encryptedText} placeholder={"Encrypted"} />
        <View style={styles.textCont}>
          <TextInput
            inputMode="text"
            placeholder="Your message"
            placeholderTextColor={colors.light}
            style={styles.textInput}
            value={text}
            onChangeText={setText}
          />
        </View>
      </ScrollView>
      <View>
        <BottomNav current={"encryption"} />
      </View>
    </SafeAreaView>
  );
};

export default Encryption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cyan[100],
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
    gap: 5,
  },
  textInput: {
    backgroundColor: colors.dark,
    color: colors.light,
    fontSize: 20,
    height: "100%",
    flex: 1,
    borderRadius: 5,
    fontFamily: "Jaldi",
  },
});
