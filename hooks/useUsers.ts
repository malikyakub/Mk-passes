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
      const { data, error } = await supabase.from("users").select("*").eq("user_id", id).single();
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
      const { data, error } = await supabase.from("users").update(newData).eq("user_id", id).select();
      if (error) throw new Error(error.message);

      return { data, err: null };
    } catch (error: unknown) {
      return { data: null, err: String(error) };
    } finally {
      setIsLoading(false);
    }
  }

  async function UploadAvatarImage(id: string, avatarUrl: string): Promise<ReturnType> {
    return await UpdateUser(id, { avatar_url: avatarUrl });
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

  return {
    AllUsers,
    GetUserById,
    UpdateUser,
    UploadAvatarImage,
    DeleteUser,
    isLoading,
  };
};

export default useUsers;
