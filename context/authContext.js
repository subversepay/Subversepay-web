"use client"

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken, logoutUser } from "@/lib/auth/auth";
import { toast } from "@/hooks/use-toast";
import { isTokenExpired } from "@/utils/utils";

// List of paths where auth check should be skipped
const skipAuthCheckPaths = [
  "/", // Home (classic root)
  "/auth",
  "/auth/login",
  "/auth/register",
  "/signup",
  "/Subversepay-web/", // GitHub Pages root
];

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

      // Only check auth if not in a skip path
      const shouldSkip = skipAuthCheckPaths.some(skip =>
         pathname === skip || pathname.startsWith(skip + "/")
      );
     if (shouldSkip) return;
      
     const token = getToken();
     if (!token || isTokenExpired(token)) {
        logoutUser();
        toast({
          title: "Session expired",
          description: "Please log in again.",
          variant: "destructive",
        });

      // Added a "next" param so user returns to their page after login
      router.push(`/auth?next=${pathname}`);
    }
  }, [pathname]);
  
  return <>{children}</>;
}
