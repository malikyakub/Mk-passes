import { useState } from "react";
import { supabase } from "@/utils/supabase";

interface ReturnType {
  data?: any;
  err: string | null;
}

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      const { data, error } = await supabase.from("users").update(newData).eq("id", id).select();
      if (error) throw new Error(error.message);

      return { data, err: null };
    } catch (error: unknown) {
      return { data: null, err: String(error) };
    } finally {
      setIsLoading(false);
    }
  }
  async function DeleteUser(id: string): Promise<ReturnType> {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("users").delete().eq("id", id).select();
      if (error) throw new Error(error.message);
  
      return { data, err: null };
    } catch (error: unknown) {
      return { data: null, err: String(error) };
    } finally {
      setIsLoading(false);
    }
  }
  async function UploadProfile(userId : string, imageFile : File) {
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
  
  
  
  return {
    AllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
    UploadProfile,
    ClearUserProfile,
    isLoading,
  };
};

export default useUsers;
