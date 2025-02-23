import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import colors from "@/assets/colors/colors";
import { useRouter } from "expo-router";
import useUsers from "@/hooks/useUsers";

const ProfileHeader = ({ fullname, email, image_url, user_id }) => {
  const router = useRouter();
  const { UploadProfile } = useUsers();
  const [profileImage, setProfileImage] = useState(
    image_url != null
      ? { uri: image_url }
      : require("@/assets/images/users/no-profile.png")
  );

  useEffect(() => {
    if (image_url) {
      setProfileImage({ uri: image_url });
    } else {
      setProfileImage(require("@/assets/images/users/no-profile.png"));
    }
  }, [image_url]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the gallery to select an image."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage({ uri: selectedImageUri });

      const { data, err } = await UploadProfile(user_id, selectedImageUri);
      if (err) {
        Alert.alert("Upload Failed", err);
        console.log(err);
      } else {
        Alert.alert("Upload Successful", "Profile image updated!");
      }
    }
  };

  return (
    <View style={styles.profile}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.push("/Setting")}
      >
        <Image
          style={styles.back}
          source={require("@/assets/Icons/back.png")}
        />
      </TouchableOpacity>

      <View style={styles.pfpContainer}>
        <Image style={styles.pfp} source={profileImage} />
        <TouchableOpacity
          onPress={pickImage}
          style={styles.addProfileContainer}
        >
          <Image
            style={styles.addProfileIcon}
            source={require("@/assets/Icons/camera.png")}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{fullname}</Text>
      <Text style={styles.job}>{email}</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  back: {
    marginBottom: 20,
    left: 0,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  backBtn: {
    position: "absolute",
    left: 30,
    top: 20,
  },
  pfpContainer: {
    position: "relative",
  },
  profile: {
    height: 400,
    backgroundColor: colors.cyan[300],
    justifyContent: "center",
    alignItems: "center",
  },
  addProfileContainer: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: colors.cyan[200],
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    right: 10,
    borderRadius: 30,
  },
  addProfileIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  pfp: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    borderRadius: 150,
  },
  name: {
    fontSize: 50,
    fontFamily: "Jaini",
    color: colors.light,
  },
  job: {
    fontSize: 20,
    letterSpacing: 2,
    marginTop: -10,
    color: colors.light,
    fontFamily: "Jaldi",
  },
});
