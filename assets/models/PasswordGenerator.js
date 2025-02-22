function PasswordGenerator({ digits, username, accountName }) {
  function LFam() {
    const eng_alphabets = [];
    for (let i = 0; i < 26; i++) {
      eng_alphabets.push(String.fromCharCode(65 + i)); // A-Z
    }

    function encryptText(text) {
      let processedMessage = "";

      for (let char of text.toUpperCase()) {
        if (char === " ") {
          processedMessage += "+";
        } else {
          const charIndex = eng_alphabets.indexOf(char) + 1;
          if (charIndex > 0) {
            processedMessage += `${charIndex.toString(16).toUpperCase()}.`;
          }
        }
      }

      if (processedMessage.endsWith(".")) {
        processedMessage = processedMessage.slice(0, -1);
      }

      processedMessage = processedMessage
        .replace(/\./g, "-")
        .replace(/\+/g, "----");

      processedMessage = processedMessage.replace(/----+/g, "----");

      return processedMessage;
    }

    const randomSelection = Math.random() < 0.5 ? username : accountName;
    const encryptedPassword = encryptText(randomSelection);

    return encryptedPassword;
  }

  function Manual() {
    console.log(digits);
  }

  return { LFam, Manual };
}

export default PasswordGenerator;
