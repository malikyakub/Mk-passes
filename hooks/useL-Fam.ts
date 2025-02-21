import { useCallback } from "react";

const useLFam = () => {
  const eng_alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const encryptText = useCallback((text: string) => {
    if (!text) return "";

    return text
      .split(" ")
      .map((word) =>
        word
          .split("")
          .map((char) => {
            if (!isNaN(parseInt(char))) {
              return `[${String.fromCharCode(96 + parseInt(char))}]`;
            }
            if (!eng_alphabets.includes(char.toUpperCase())) {
              return `[${char}]`; 
            }
            const charIndex = eng_alphabets.indexOf(char.toUpperCase()) + 1;
            const hexValue = charIndex.toString(16).toUpperCase();
            return char === char.toLowerCase() ? `l${hexValue}` : hexValue; 
          })
          .join(".")
      )
      .join("+");
  }, []);

  const decryptText = useCallback((text: string) => {
    if (!text) return "";

    return text
      .split("+")
      .map((word) =>
        word
          .split(".")
          .map((part) => {
            if (part.startsWith("[") && part.endsWith("]")) {
              const insideBrackets = part.slice(1, -1);
              if (insideBrackets.match(/[a-z]/)) {
                return (insideBrackets.charCodeAt(0) - 96).toString();
              }
              return insideBrackets; 
            }
            const isLowerCase = part.startsWith("l");
            const hexValue = isLowerCase ? part.slice(1) : part;
            const index = parseInt(hexValue, 16) - 1;
            const letter = eng_alphabets[index] || "";
            return isLowerCase ? letter.toLowerCase() : letter; 
          })
          .join("")
      )
      .join(" ");
  }, []);

  return { encryptText, decryptText };
};

export default useLFam;
