import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

interface ReturnType {
  data?: any;
  err: string | null;
}

const usePasswords = (userId?: string) => {
  const [passwords, setPasswords] = useState<any[]>([]);
  const [isloading, setisloading] = useState(false);

  async function fetchPasswords() {
    if (!userId) return;
    setisloading(true);
    try {
      const { data, error } = await supabase.from("passwords").select("*").eq("user_id", userId);
      setisloading(false);
      if (error) return console.error(error.message);
      setPasswords(data || []);
    } catch (error: unknown) {
      setisloading(false);
      console.error("Error fetching passwords:", error);
    }
  }

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("passwords_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "passwords", filter: `user_id=eq.${userId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPasswords((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setPasswords((prev) =>
              prev.map((p) => (p.id === payload.new.id ? payload.new : p))
            );
          } else if (payload.eventType === "DELETE") {
            setPasswords((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    fetchPasswords();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

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

  async function DeleteAllPasswords(userId: string): Promise<ReturnType> {
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
    passwords,
    CreateNewPassword,
    UpdatePassword,
    DeletePassword,
    DeleteAllPasswords,
    GetPassword,
    GetPasswords,
    isloading,
  };
};

export default usePasswords;
