function PasswordGenerator({ digits, username, accountName }) {
  function LFam() {
    const eng_alphabets = [];
    for (let i = 0; i < 26; i++) {
      eng_alphabets.push(String.fromCharCode(65 + i)); // A-Z
    }

    function encryptText(text) {
      let processedMessage = text
        .toUpperCase()
        .split(" ")
        .map((word) =>
          word
            .split("")
            .map((char) => {
              if (!isNaN(char)) {
                return; // Ignore numbers
              }
              const charIndex = eng_alphabets.indexOf(char) + 1;
              return charIndex > 0 ? charIndex.toString(16).toUpperCase() : "";
            })
            .filter(Boolean)
            .join(".")
        )
        .join("+");

      // Remove trailing "+" or "."
      if (processedMessage.endsWith("+")) {
        processedMessage = processedMessage.slice(0, -1);
      }
      if (processedMessage.endsWith(".")) {
        processedMessage = processedMessage.slice(0, -1);
      }

      return processedMessage;
    }

    const randomSelection = Math.random() < 0.5 ? username : accountName;
    const encryptedPassword = encryptText(randomSelection);
    if (encryptedPassword.length < 6) {
      return;
    }
    return encryptedPassword;

    // console.log("Generated Encrypted Password:", encryptedPassword);
  }

  function Manual() {
    console.log(digits);
  }

  return { LFam, Manual };
}

export default PasswordGenerator;
