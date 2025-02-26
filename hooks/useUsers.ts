import { useState } from "react";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "./useAuth";
import deleteUserAccount from "@/assets/models/Deleteuser";


interface ReturnType {
  data?: any;
  err: string | null;
}

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {saveUser, UpdateUserEmail, UpdateUserPassword} = useAuth()

  async function AllUsers(): Promise<ReturnType> {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) throw new Error("No users found");

      return { data, err: null };
    } catch (error: unknown) {
      return { data: null, err: String(error) };
    } finally {
      setIsLoading(false);
    }
  }

  async function GetUserById(id: string): Promise<ReturnType> {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
      if (error) throw new Error(error.message);

      return { data, err: null };
    } catch (error: unknown) {
      return { data: null, err: String(error) };
    } finally {
      setIsLoading(false);
    }
  }

  async function UpdateUser(id: string, newData: object): Promise<ReturnType> {
    setIsLoading(true);
    if(Object.keys(newData)[0] == 'email'){
      await UpdateUserEmail(Object.values(newData)[0])
    }
    try {
      const { data, error } = await supabase.from("users").update(newData).eq("id", id).select();
      if (error) throw new Error(error.message);
      return { data, err: null };
    } catch (error: unknown) {
      return { data: null, err: String(error) };
    } finally {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
    error ? console.log(error) : 'saved in the AsyncStorage'
    await saveUser(data)
      setIsLoading(false);
    }
  }

  async function DeleteUser(id: string): Promise<ReturnType> {
    setIsLoading(true);
    await deleteUserAccount(id);
    try {
      const { data, error } = await supabase.from("users").delete().eq("id", id).select();
      if (error) throw new Error(error.message);

      return { data, err: null };
    } catch (error: unknown) {
      return { data: null, err: String(error) };
    } finally {
      await AsyncStorage.removeItem('UserData');
      setIsLoading(false);
    }
  }

  async function UploadProfile(userId: string, imageFile: File) {
    setIsLoading(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `profile_${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { data, error } = await supabase.storage
        .from("user_profiles")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: true,
          contentType: imageFile.type,
        });

      if (error) throw new Error(error.message);

      const { data: publicUrlData } = supabase.storage
        .from("user_profiles")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("users")
        .update({ image_url: publicUrlData.publicUrl })
        .eq("id", userId);

      if (updateError) throw new Error(updateError.message);

      return { data: publicUrlData.publicUrl, err: null };
    } catch (error) {
      return { data: null, err: String(error) };
    } finally {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()
    error ? console.log(error) : 'saved in the AsyncStorage'
    await saveUser(data)
      setIsLoading(false);
    }
  }

  async function ClearUserProfile(id: string): Promise<ReturnType> {
    setIsLoading(true);
    try {
      const { data: files, error: listError } = await supabase.storage
        .from("user_profiles")
        .list(id);

      if (listError) throw new Error(listError.message);

      if (!files || files.length === 0) {
        return { data: null, err: "No files found in the folder" };
      }

      const filePaths = files.map((file) => `${id}/${file.name}`);

      const { data, error: deleteError } = await supabase.storage
        .from("user_profiles")
        .remove(filePaths);

      if (deleteError) throw new Error(deleteError.message);

      return { data, err: null };
    } catch (error) {
      return { data: null, err: String(error) };
    } finally {
      setIsLoading(false);
    }
  }


  async function SaveSettingsToSession(newSettings: object): Promise<{ data: object | null; err: string | null }> {
    setIsLoading(true);
    try {
      const storedSettings = await AsyncStorage.getItem("userSettings");
      const parsedSettings = storedSettings ? JSON.parse(storedSettings) : {};
  
      const updatedSettings = { ...parsedSettings, ...newSettings };
  
      await AsyncStorage.setItem("userSettings", JSON.stringify(updatedSettings));
  
      return { data: updatedSettings, err: null };
    } catch (error) {
      return { data: null, err: String(error) };
    } finally {
      setIsLoading(false);
    }
  }
  

  return {
    AllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
    UploadProfile,
    ClearUserProfile,
    SaveSettingsToSession, // Added function
    isLoading,
  };
};

export default useUsers;