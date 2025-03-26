import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "@/assets/colors/light_colors";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import TextOut from "@/components/TextOut";
import useLFam from "@/hooks/useL-Fam";
import { useState, useMemo } from "react";
import HeroCard from "@/components/HeroCard";

const Decryption = () => {
  const [text, setText] = useState("");
  const { decryptText } = useLFam();

  const decryptedText = useMemo(() => decryptText(text), [text]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}>
        <HeroCard
          image_url={
            "https://i.pinimg.com/474x/ce/fd/43/cefd4337d888fca5ea68f0ab1bb9adcc.jpg"
          }
          title={"Mk-Passes"}
          body={"Decrypt it with"}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textCont}>
            <TextInput
              inputMode="text"
              placeholder="Enter encrypted text"
              placeholderTextColor={colors.white}
              style={styles.textInput}
              value={text}
              onChangeText={setText}
            />
          </View>
          <TextOut
            msg={decryptedText}
            placeholder={"Decrypted"}
            onclear={() => setText("")}
          />
        </ScrollView>
      </View>
      <View>
        <BottomNav current={"decryption"} />
      </View>
    </SafeAreaView>
  );
};

export default Decryption;

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
    paddingBottom: 0,
  },
  textCont: {
    backgroundColor: colors.black,
    marginBlock: 20,
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
    color: colors.white,
    fontSize: 20,
    height: "100%",
    flex: 1,
    borderRadius: 5,
    fontFamily: "Jaldi",
  },
});
