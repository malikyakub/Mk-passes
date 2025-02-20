import { useState } from "react";
import { supabase } from "@/utils/supabase";

interface ReturnType {
  data?: any;
  err: string | null;
}

const useAuth = () => {
  const [isloading, setisloading] = useState(false);

  async function AllUsers(): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase.from("users").select("*");
      setisloading(false);
      if (error) return { data: null, err: error.message };
      if (!data || data.length === 0) return { data: null, err: "Not Found" };
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }
  
  
    async function UpdateUser(id: string, newData: object): Promise<ReturnType> {
      setisloading(true);
      try {
        const { data, error } = await supabase.from("users").update(newData).eq("user_id", id).select();
        setisloading(false);
        if (error) return { data: null, err: error.message };
        return { data, err: null };
      } catch (error: unknown) {
        setisloading(false);
        return { data: null, err: String(error) };
      }
    }
      async function UploadAvatarImage(id: string, avatarUrl: string): Promise<ReturnType> {
        setisloading(true);
        try {
          const { data, error } = await supabase.from("users").update({ avatar_url: avatarUrl }).eq("user_id", id).select();
          setisloading(false);
          if (error) return { data: null, err: error.message };
          return { data, err: null };
        } catch (error: unknown) {
          setisloading(false);
          return { data: null, err: String(error) };
        }
      }
      
        async function DeleteUser(id: string): Promise<ReturnType> {
          setisloading(true);
          try {
            const { data, error } = await supabase.from("users").delete().eq("user_id", id).select();
            setisloading(false);
            if (error) return { data: null, err: error.message };
            return { data, err: null };
          } catch (error: unknown) {
            setisloading(false);
            return { data: null, err: String(error) };
          }
        }

      return {
        isloading,
        AllUsers,
        UpdateUser,
        UploadAvatarImage,
        DeleteUser
      }
}
export default useAuth;
