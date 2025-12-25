"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import type { Database } from "@/types/supabase";

// Import types from your Database schema
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
type PointsTransactionInsert =
  Database["public"]["Tables"]["points_transactions"]["Insert"];

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (
    updates: Partial<Profile>
  ) => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({ success: false, error: "Auth not initialized" }),
  signUp: async () => ({ success: false, error: "Auth not initialized" }),
  signOut: async () => {},
  updateProfile: async () => ({
    success: false,
    error: "Auth not initialized",
  }),
  refreshSession: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Get typed Supabase client
  const supabase = getSupabaseBrowserClient();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }

        setUser(session?.user ?? null);

        // If user is authenticated, fetch profile
        if (session?.user?.id) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        toast.error("Failed to initialize authentication");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        await fetchProfile(currentUser.id);

        switch (event) {
          case "SIGNED_IN":
            toast.success("Welcome to FlowvaHub!");
            router.refresh();
            break;
          case "USER_UPDATED":
            toast.success("Profile updated successfully");
            break;
        }
      } else {
        setProfile(null);
        if (event === "SIGNED_OUT") {
          toast.success("Logged out successfully");
          router.push("/");
          router.refresh();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  // Helper function to fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows returned
          await createProfile(userId);
          return;
        }
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Create profile for new users with correct types
  const createProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        throw new Error("No user data available");
      }

      // Create profile data with correct typing
      const profileData: ProfileInsert = {
        id: userId,
        email: userData.user.email || "",
        full_name:
          userData.user.user_metadata?.full_name ||
          userData.user.user_metadata?.name ||
          userData.user.email?.split("@")[0] ||
          "User",
        points: 1000,
        avatar_url: userData.user.user_metadata?.avatar_url || null,
      };

      const { data, error } = await supabase
        .from("profiles")
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error("Profile creation error:", error);
        throw error;
      }

      setProfile(data);

      // Add welcome points transaction with correct typing
      const transactionData: PointsTransactionInsert = {
        user_id: userId,
        points: 1000,
        type: "earned",
        description: "Welcome bonus",
      };

      try {
        await supabase.from("points_transactions").insert(transactionData);
      } catch (transactionError) {
        console.error("Failed to add points transaction:", transactionError);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create user profile");
    }
  };

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          return {
            success: false,
            error: "Invalid email or password",
          };
        }
        if (error.message.includes("Email not confirmed")) {
          return {
            success: false,
            error: "Please confirm your email address before signing in",
          };
        }
        return {
          success: false,
          error: error.message || "Failed to sign in",
        };
      }

      return { success: true };
    } catch (error: any) {
      console.error("Sign in error:", error);
      return {
        success: false,
        error: error.message || "Failed to sign in",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);

      const { error, data } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          return {
            success: false,
            error: "An account with this email already exists",
          };
        }
        if (error.message.includes("Password should be at least")) {
          return {
            success: false,
            error: "Password must be at least 6 characters",
          };
        }
        return {
          success: false,
          error: error.message || "Failed to create account",
        };
      }

      // Create profile immediately for email signup
      if (data.user && data.user.identities?.[0]?.provider === "email") {
        const profileData: ProfileInsert = {
          id: data.user.id,
          email: data.user.email || "",
          full_name: fullName,
          points: 1000,
          avatar_url: null,
        };

        await supabase.from("profiles").insert(profileData);
      }

      toast.success(
        data.user?.identities?.length === 0
          ? "Please check your email to confirm your account"
          : "Account created successfully!"
      );

      return { success: true };
    } catch (error: any) {
      console.error("Sign up error:", error);
      return {
        success: false,
        error: error.message || "Failed to create account",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  // Update user profile with better error handling
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    try {
      console.log("Attempting to update profile:", {
        userId: user.id,
        updates,
      });

      // Only include fields that actually exist in the database
      const safeUpdates: any = {};

      // Map TypeScript fields to database columns
      if (updates.full_name !== undefined)
        safeUpdates.full_name = updates.full_name;
      if (updates.avatar_url !== undefined)
        safeUpdates.avatar_url = updates.avatar_url;
      if (updates.points !== undefined) safeUpdates.points = updates.points;

      // Add updated_at timestamp
      safeUpdates.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from("profiles")
        .update(safeUpdates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Database update error:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });

        // Provide user-friendly error messages
        if (error.code === "42501") {
          return {
            success: false,
            error: "Permission denied. Please check your RLS policies.",
          };
        }
        if (error.code === "23505") {
          return {
            success: false,
            error: "A profile with this email already exists.",
          };
        }
        throw error;
      }

      console.log("Profile updated successfully:", data);
      setProfile((prev) => (prev ? { ...prev, ...safeUpdates } : null));

      return { success: true };
    } catch (error: any) {
      console.error("Update profile error:", error);
      return {
        success: false,
        error: error.message || "Failed to update profile",
      };
    }
  };

  // Refresh session
  const refreshSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession();

      if (error) throw error;

      setUser(session?.user ?? null);

      if (session?.user?.id) {
        await fetchProfile(session.user.id);
      }
    } catch (error: any) {
      console.error("Refresh session error:", error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
