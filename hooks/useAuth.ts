import { useState } from "react";
import { supabase } from "@/utils/supabase";

interface ReturnType {
  data?: any;
  err: string | null;
}

const useAuth = () => {
  const [isloading, setisloading] = useState(false);


  async function CreateNewUser(newUser: object): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase.from("users").insert([newUser]).select();
      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  async function GetUser(id: string): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase.from("users").select("*").eq("user_id", id).single();
      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }



  async function Login(email: string, password: string): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase.from("users").select("*").eq("email", email).eq("password", password
      ).single();
      setisloading(false);
      if (error) return { data: null, err: error.message };
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }
  

  return {
    CreateNewUser,
    GetUser,
    Login,
    isloading,
  };
};

export default useAuth;