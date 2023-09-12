import { useEffect } from "react";
import { useRouter } from "next/router";

import {useUserStore} from "../store/userStore";

export default function UnAuthContent({ children }) {
  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  

  
  // Navigate authenticated users to Members page.
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <>{children}</>;
  } 

  return <p>Loading...</p>;
}