import { createContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, logoutUser } from "@/lib/auth/auth";
import { isTokenExpired } from "@/utils/utils";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = getToken();
      if (!token || isTokenExpired(token)) {
        logoutUser();
        router.push("/auth");
      }
    };
    checkToken();
    const interval = setInterval(checkToken, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [router]);

  // ...inside checkToken()
if (!token || isTokenExpired(token)) {
  logoutUser();
  toast({
    title: "Session expired",
    description: "Please log in again.",
    variant: "destructive",
  });
  router.push("/auth");
}

  return <>{children}</>;
};