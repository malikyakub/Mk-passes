import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
  const [isloading, setisloading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const SignUp = async (email: string, password: string, extraData: object) => {
    setisloading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setisloading(false);
      return { data: null, err: error.message };
    }

    const userId = data.user?.id;
    if (userId) {
      const { data, error } = await supabase.from("users").insert([{ id: userId, email, ...extraData }]);
      if (error) {
        console.log(error);
      }
      console.log(data);
      await saveUser(extraData)
    }

    setisloading(false);
    return { data, err: null };
  };

  const LoginWithEmail = async (email: string, password: string) => {
    setisloading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    const { data: userData, error: userError } = await supabase.from('users').select('*').eq('email', email).single()
    userError ? console.log(error) : 'saved in the async storage'
    await saveUser(userData)
    setisloading(false);
    return error ? { data: null, err: error.message } : { data, err: null };
  };

  const GetLoggedInUser = async () => {
    setisloading(true);
    try {
      const storedData = await AsyncStorage.getItem("UserData");
      const userData = storedData ? JSON.parse(storedData) : null;
  
      return userData;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    } finally {
      setisloading(false);
    }
  };
  

  const signOut = async () => {
    setisloading(true);
    await supabase.auth.signOut();
    setUser(null);
    await AsyncStorage.removeItem('UserData');
    setisloading(false);
  };
  const UpdateUserEmail = async (email : string) => {
    setisloading(true);
    const { data, error } = await supabase.auth.updateUser({
      email: email,
    })
    return error ? error.message : 'Email Updated succesifully!'

  }
  
  const UpdateUserPassword = async (password : string) => {
    setisloading(true);
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    })
    return error ? error.message : 'Password Updated succesifully!'

  }

  const saveUser = async (extraData: object) => {
    setisloading(true);
    try {
      const storedData = await AsyncStorage.getItem("UserData");
      const parsedData = storedData ? JSON.parse(storedData) : {};
  
      const updatedData = { ...parsedData, ...extraData };
  
      await AsyncStorage.setItem("UserData", JSON.stringify(updatedData));
  
      return { data: updatedData, err: null };
    } catch (error) {
      return { data: null, err: String(error) };
    } finally {
      setisloading(false);
    }
  };
  
  

  return {
    SignUp,
    LoginWithEmail,
    GetLoggedInUser,
    signOut,
    UpdateUserEmail,
    UpdateUserPassword,
    saveUser,
    user,
    isloading,
  };
};

export default useAuth;
