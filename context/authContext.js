"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, logoutUser } from "@/lib/auth/auth";
import { toast } from "@/hooks/use-toast";
import { isTokenExpired } from "@/utils/utils";

// You don't need to create a React context if you only want this effect globally;
// just wrap your <App /> or main layout with <AuthProvider>.
export function AuthProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = getToken();
      if (!token || isTokenExpired(token)) {
        logoutUser();
        toast({
          title: "Session expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        router.push("/auth");
      }
    };

    const currentPath = router.pathname;
    
    // Check if the current path is not the home page or the login page
    if (currentPath !== "/" && currentPath !== "/auth") {
      checkToken();
      const interval = setInterval(checkToken, 60 * 1000); // every minute
      return () => clearInterval(interval);
    }
  }, [router]);

  return <>{children}</>;
        }
