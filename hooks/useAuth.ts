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
    setisloading(true);
    const { data, error } = await supabase.auth.getUser();
    setisloading(false);
    return error ? null : data.user;
  };

  const signOut = async () => {
    setisloading(true);
    await supabase.auth.signOut();
    setUser(null);
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
  return {
    SignUp,
    LoginWithEmail,
    GetLoggedInUser,
    signOut,
    UpdateUserEmail,
    UpdateUserPassword,
    user,
    isloading,
  };
};

export default useAuth;
