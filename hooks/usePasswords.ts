import { useState } from "react";
import { supabase } from "@/utils/supabase";

interface ReturnType {
  data?: any;
  err: string | null;
}

const usePasswords = () => {
  const [isloading, setisloading] = useState(false);

  async function CreateNewPassword(newPassword: object): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase.from("passwords").insert([newPassword]).select();
      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  async function UpdatePassword(id: string, updatedFields: object): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase.from("passwords").update(updatedFields).eq("id", id).select();
      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  async function DeletePassword(id: string): Promise<ReturnType> {
    setisloading(true);
    try {
      const { error } = await supabase.from("passwords").delete().eq("id", id);
      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data: "Deleted successfully", err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  async function DeletePasswordsByUser(userId: string): Promise<ReturnType> {
    setisloading(true);
    try {
      const { error } = await supabase.from("passwords").delete().eq("user_id", userId);
      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data: "All passwords deleted successfully", err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  async function GetPasswords(userId?: string): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase
        .from("passwords")
        .select("*")
        .eq("user_id", userId);

      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  async function GetPassword(id: string): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase.from("passwords").select("*").eq("id", id).single();
      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  return {
    CreateNewPassword,
    UpdatePassword,
    DeletePassword,
    DeletePasswordsByUser,
    GetPasswords,
    GetPassword,
    isloading,
  };
};

export default usePasswords;
