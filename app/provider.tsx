"use client";
import { AuthProvider } from "./provider/auth-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
