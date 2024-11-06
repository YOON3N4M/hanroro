"use client";

import { ReactNode, useEffect } from "react";

import { User, onAuthStateChanged } from "firebase/auth";
import { useAuthActions, useUser } from "@/store/auth";
import { auth } from "@/lib/firebase/firebase";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const user = useUser();

  const { setIsLogin, setUser } = useAuthActions();

  useEffect(() => {
    onAuthStateChanged(auth, (sessionUser: User | null) => {
      if (sessionUser) {
        setIsLogin("authenticated");
        setUser(sessionUser);
      } else {
        setIsLogin("unauthenticated");
        setUser(null);
      }
    });
  }, []);

  return <div className="w-full h-full">{children}</div>;
}

export default AuthProvider;
