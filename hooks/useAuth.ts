import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

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
      console.log('hello');
      const { data, error } = await supabase.from("users").insert([{ id: userId, email, ...extraData }]);
      if (error) {
        console.log(error);
      }
      console.log(data);
    }

    setisloading(false);
    return { data, err: null };
  };

  const LoginWithEmail = async (email: string, password: string) => {
    setisloading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setisloading(false);
    return error ? { data: null, err: error.message } : { data, err: null };
  };

  const GetLoggedInUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return error ? null : data.user;
  };

  const signOut = async () => {
    setisloading(true);
    await supabase.auth.signOut();
    setUser(null);
    setisloading(false);
  };
  return {
    SignUp,
    LoginWithEmail,
    GetLoggedInUser,
    signOut,
    user, // Real-time user state
    isloading,
  };
};

export default useAuth;
