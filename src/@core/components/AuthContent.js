import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUserStore } from "../store/userStore";

export default function AuthContent({ children }) {

  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)


  

  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!isAuthenticated) {
      
      router.push('/pages/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}
