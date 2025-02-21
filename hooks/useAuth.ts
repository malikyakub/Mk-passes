import { useState } from "react";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      if (data) {
        await AsyncStorage.setItem("user", JSON.stringify(data[0]));
      }
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  async function Login(email: string, password: string): Promise<ReturnType> {
    setisloading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();
      setisloading(false);
      if (error) return { data: null, err: error.message };
      if (data) {
        await AsyncStorage.setItem("user", JSON.stringify(data));
      }
      return { data, err: null };
    } catch (error: unknown) {
      setisloading(false);
      return { data: null, err: String(error) };
    }
  }

  async function SaveUserIdToSession(userId: string) {
    setisloading(true);
    await AsyncStorage.setItem("userId", userId);
    setisloading(false);
  }

  async function GetLoggedInUser() {
    setisloading(true);
    const user = await AsyncStorage.getItem("user");
    setisloading(false);
    return user ? JSON.parse(user) : null;
  }

  async function Logout() {
    setisloading(true);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userId");
    setisloading(false);
  }

  return {
    CreateNewUser,
    Login,
    SaveUserIdToSession,
    GetLoggedInUser,
    Logout,
    isloading,
  };
};

export default useAuth;
