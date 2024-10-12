import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config"; // Import your Firebase config
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false once we get the auth state
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return { user, loading };
};
