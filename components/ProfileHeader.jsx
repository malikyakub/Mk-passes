import * as FileSystem from "expo-file-system";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import colors from "@/assets/colors/colors";
import { useRouter } from "expo-router";
import useUsers from "@/hooks/useUsers";
import { BlurView } from "expo-blur";
import NotificationCard from "./NotificationCard";

const ProfileHeader = ({ fullname, email, image_url, user_id }) => {
  const router = useRouter();
  const { UploadProfile } = useUsers();
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    title: "",
    is_open: false,
    image_url: "",
    action: () => {},
  });
  const [profileImage, setProfileImage] = useState(
    image_url
      ? { uri: image_url }
      : require("@/assets/images/users/no-profile.png")
  );
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    setProfileImage(
      image_url
        ? { uri: image_url }
        : require("@/assets/images/users/no-profile.png")
    );
  }, [image_url]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setNotification({
        title: "Error",
        message: "Petmission denied",
        type: "error",
        is_open: true,
        action: () => {
          setNotification((prev) => ({ ...prev, is_open: false }));
          clearTimeout(timeout);
        },
      });
      const timeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, is_open: false }));
      }, 3000);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        setUploading(true);
        const selectedImageUri = result.assets[0].uri;
        setProfileImage({ uri: selectedImageUri });

        const fileInfo = await FileSystem.getInfoAsync(selectedImageUri);
        if (!fileInfo.exists) {
          throw new Error("File does not exist");
        }

        const fileExtension = selectedImageUri.split(".").pop();
        const fileName = `profile_${Date.now()}.${fileExtension}`;

        const file = {
          uri: selectedImageUri,
          name: fileName,
          type: `image/${fileExtension}`,
        };

        const { err } = await UploadProfile(user_id, file);
        if (err) {
          setNotification({
            title: "Error",
            message: err,
            type: "error",
            is_open: true,
            action: () => {
              setNotification((prev) => ({ ...prev, is_open: false }));
              clearTimeout(timeout);
            },
          });
          const timeout = setTimeout(() => {
            setNotification((prev) => ({ ...prev, is_open: false }));
          }, 3000);
          return;
        } else {
          setNotification({
            title: "Profile Updated",
            message: "Now, your profile succesifully updated",
            type: "success",
            is_open: true,
            action: () => {
              setNotification((prev) => ({ ...prev, is_open: false }));
              clearTimeout(timeout);
            },
          });
          const timeout = setTimeout(() => {
            setNotification((prev) => ({ ...prev, is_open: false }));
          }, 3000);
          return;
        }
      } catch (error) {
        setNotification({
          title: "Error",
          message: "Something went wrong while selecting the image.",
          type: "error",
          is_open: true,
          action: () => {
            setNotification((prev) => ({ ...prev, is_open: false }));
            clearTimeout(timeout);
          },
        });
        const timeout = setTimeout(() => {
          setNotification((prev) => ({ ...prev, is_open: false }));
        }, 3000);
        return;
      } finally {
        setUploading(false);
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
        <ImageBackground source={profileImage} style={styles.pfp}>
          {uploading && (
            <BlurView intensity={80} style={styles.blur}>
              <ActivityIndicator size="large" color={colors.cyan[300]} />
            </BlurView>
          )}
        </ImageBackground>

        <TouchableOpacity
          onPress={pickImage}
          style={styles.addProfileContainer}
          disabled={uploading}
        >
          <Image
            style={styles.addProfileIcon}
            source={require("@/assets/Icons/camera.png")}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{fullname}</Text>
      <Text style={styles.job}>{email}</Text>
      {notification.is_open && (
        <NotificationCard
          title={notification.title}
          message={notification.message}
          type={notification.type}
          is_open={notification.is_open}
          image_url={notification.image_url}
          action={notification.action}
          onClose={() =>
            setNotification((prev) => ({ ...prev, is_open: false }))
          }
        />
      )}
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
    justifyContent: "center",
    alignItems: "center",
    height: 250,
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
    resizeMode: "cover",
    borderRadius: 150,
    overflow: "hidden",
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
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
