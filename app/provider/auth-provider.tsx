"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

// Define types matching your Supabase schema
type User = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    name?: string;
  };
} | null;

type Profile = {
  id: string;
  email: string;
  full_name: string;
  points: number;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
} | null;

type AuthContextType = {
  user: User;
  profile: Profile;
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
  //   updateProfile: (updates: Partial<Profile>) => Promise<{ success: boolean; error?: string }>
  refreshSession: () => Promise<void>;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({ success: false, error: "Auth not initialized" }),
  signUp: async () => ({ success: false, error: "Auth not initialized" }),
  signOut: async () => {},
  //   updateProfile: async () => ({ success: false, error: 'Auth not initialized' }),
  refreshSession: async () => {},
});

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Get Supabase client instance
  const supabase = getSupabaseBrowserClient();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");

        // Get current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }

        console.log("Session found:", session ? "Yes" : "No");
        setUser(session?.user ?? null);

        // If user is authenticated, fetch profile
        if (session?.user?.id) {
          console.log("Fetching profile for user:", session.user.id);
          await fetchProfile(session.user.id);
        } else {
          console.log("No user ID found, setting profile to null");
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
      console.log(
        "Auth state changed:",
        event,
        "Session:",
        session ? "Yes" : "No"
      );

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        await fetchProfile(currentUser.id);

        // Handle different auth events
        switch (event) {
          case "SIGNED_IN":
            toast.success("Welcome to FlowvaHub!");
            router.refresh();
            break;
          case "USER_UPDATED":
            toast.success("Profile updated successfully");
            break;
          case "TOKEN_REFRESHED":
            console.log("Token refreshed successfully");
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
      console.log("Fetching profile from database for user:", userId);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.log("Profile fetch error:", error);

        // If profile doesn't exist (PGRST116 = no rows returned), create one
        if (error.code === "PGRST116") {
          console.log("Profile not found, creating new profile...");
          //   await createProfile(userId)
          return;
        }

        // For other errors, throw them
        throw error;
      }

      console.log("Profile found:", data);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);

      // Only show toast for non-404 errors
      if (!(error as any).code || (error as any).code !== "PGRST116") {
        toast.error("Failed to load user profile");
      }
    }
  };

  // Create profile for new users
  //   const createProfile = async (userId: string) => {
  //     try {
  //       console.log('Creating profile for user:', userId)

  //       // Get user details from auth
  //       const { data: userData } = await supabase.auth.getUser()

  //       if (!userData.user) {
  //         throw new Error('No user data available')
  //       }

  //       const profileData = {
  //         id: userId,
  //         email: userData.user.email || '',
  //         full_name: userData.user.user_metadata?.full_name ||
  //                    userData.user.user_metadata?.name ||
  //                    'User',
  //         points: 1000, // Default welcome points
  //         avatar_url: userData.user.user_metadata?.avatar_url || null,
  //       }

  //       console.log('Inserting profile:', profileData)

  //       const { data, error } = await supabase
  //         .from('profiles')
  //         .insert(profileData)
  //         .select()
  //         .single()

  //       if (error) {
  //         console.error('Profile creation error:', error)
  //         throw error
  //       }

  //       console.log('Profile created successfully:', data)
  //       setProfile(data)

  //       // Add welcome points transaction
  //       try {
  //         await supabase.from('points_transactions').insert({
  //           user_id: userId,
  //           points: 1000,
  //           type: 'earned',
  //           description: 'Welcome bonus',
  //         })
  //         console.log('Welcome points transaction added')
  //       } catch (transactionError) {
  //         console.error('Failed to add points transaction:', transactionError)
  //         // Don't throw here - profile creation succeeded
  //       }
  //     } catch (error) {
  //       console.error('Error creating profile:', error)
  //       toast.error('Failed to create user profile')
  //       throw error // Re-throw so calling function knows it failed
  //     }
  //   }

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Signing in user:", email);

      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);

        // Handle specific error cases
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

      console.log("Sign in successful:", data.user?.id);
      return { success: true };
    } catch (error: any) {
      console.error("Unexpected sign in error:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      console.log("Signing up user:", email);

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Sign up error:", error);

        // Handle specific error cases
        if (error.message.includes("User already registered")) {
          return {
            success: false,
            error: "An account with this email already exists",
          };
        }

        if (error.message.includes("Password should be at least")) {
          return {
            success: false,
            error: "Password must be at least 6 characters long",
          };
        }

        return {
          success: false,
          error: error.message || "Failed to create account",
        };
      }

      console.log("Sign up response:", data);

      // Show success message based on email confirmation status
      if (data.user?.identities?.length === 0) {
        toast.success("Please check your email to confirm your account");
      } else {
        // Auto-login if email confirmation is disabled
        toast.success("Account created successfully! Welcome to FlowvaHub");
      }

      return { success: true };
    } catch (error: any) {
      console.error("Unexpected sign up error:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      console.log("Signing out...");

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }

      console.log("Sign out successful");

      // Clear local state
      setUser(null);
      setProfile(null);

      // Don't redirect here - the auth state change listener will handle it
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  //   const updateProfile = async (updates: Partial<Profile>) => {
  //     if (!user) {
  //       return {
  //         success: false,
  //         error: 'User not authenticated'
  //       }
  //     }

  //     try {
  //       console.log('Updating profile for user:', user.id, 'Updates:', updates)

  //       const { error } = await supabase
  //         .from('profiles')
  //         .update(updates)
  //         .eq('id', user.id)

  //       if (error) {
  //         console.error('Update profile error:', error)
  //         throw error
  //       }

  //       console.log('Profile updated successfully')

  //       // Update local profile state
  //       setProfile(prev => prev ? { ...prev, ...updates } : null)

  //       return { success: true }
  //     } catch (error: any) {
  //       console.error('Update profile error:', error)
  //       return {
  //         success: false,
  //         error: error.message || 'Failed to update profile'
  //       }
  //     }
  //   }

  // Refresh session
  const refreshSession = async () => {
    try {
      console.log("Refreshing session...");

      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession();

      if (error) {
        console.error("Refresh session error:", error);
        throw error;
      }

      console.log("Session refreshed:", session ? "Yes" : "No");

      setUser(session?.user ?? null);

      if (session?.user?.id) {
        await fetchProfile(session.user.id);
      }
    } catch (error: any) {
      console.error("Refresh session error:", error);
      throw error;
    }
  };

  // Handle Google OAuth login
  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google OAuth...");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Google OAuth error:", error);
        throw error;
      }

      console.log("Google OAuth initiated successfully");
    } catch (error: any) {
      console.error("Google OAuth error:", error);
      toast.error(error.message || "Google login failed");
      throw error;
    }
  };

  // Context value
  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    // updateProfile,
    refreshSession,
  };

  console.log("AuthProvider rendering, loading:", loading, "user:", user?.id);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
