import { useState, useEffect } from "react";

export function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); 
    }
  }, []);

  return { user, setUser };
}
