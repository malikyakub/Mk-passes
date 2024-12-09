import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import React from "react";

const HeaderBtns = () => {
  return (
    <View style={styles.btns}>
      <TouchableOpacity>
        <Image
          source={require("../assets/Icons/add.png")}
          style={styles.icon}
          alt="search-icon"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/Icons/search.png")}
          style={styles.icon}
          alt="search-icon"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/Icons/more.png")}
          style={styles.icon}
          alt="search-icon"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBtns;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  btns: {
    flexDirection: "row",
    gap: 10,
  },
});
