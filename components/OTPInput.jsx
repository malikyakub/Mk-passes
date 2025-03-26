import colors from "@/assets/colors/light_colors";
import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const OTPInput = ({ digits }) => {
  const length = digits;
  const [pin, setPin] = useState(new Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }

    if (newPin.every((digit) => digit !== "")) {
      console.log("Entered OTP:", newPin.join(""));
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={[
              styles.input,
              focusedIndex === index ? styles.inputFocused : null,
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onFocus={() => handleFocus(index)}
            keyboardType="numeric"
            maxLength={1}
            selectionColor="#2196F3"
          />
        ))}
      </View>
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    width: 40,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.opacity.light[50],
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: colors.cyan[300],
  },
});
