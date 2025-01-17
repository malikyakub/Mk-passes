import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import colors from "@/assets/colors/colors";

const CreatePassword = (actionTodo: string) => {
  const [action, setAction] = useState();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.hero}></View>
      <BottomNav current={"passwords"} />
    </SafeAreaView>
  );
};

export default CreatePassword;

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
});
