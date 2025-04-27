"use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { AuthState, User } from "@/types";

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<{
  authState: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  authState: initialState,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check for user on mount
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Get the user's role from a custom table
          const { data: userData } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          setAuthState({
            user: {
              id: session.user.id,
              email: session.user.email || "",
              role: userData?.role || "customer",
            },
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error checking auth session:", error);
        setAuthState({
          user: null,
          isLoading: false,
          error: "Failed to check authentication status",
        });
      }
    };

    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Get the user's role from a custom table
        const { data: userData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        setAuthState({
          user: {
            id: session.user.id,
            email: session.user.email || "",
            role: userData?.role || "customer",
          },
          isLoading: false,
          error: null,
        });
      } else if (event === "SIGNED_OUT") {
        setAuthState({
          user: null,
          isLoading: false,
          error: null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to sign in",
      }));
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Create a customer profile by default
      if (data.user) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          role: "customer",
        });
      }
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to sign up",
      }));
    }
  };

  const signOut = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to sign out",
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
