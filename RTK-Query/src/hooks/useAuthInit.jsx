import { useEffect, useState } from "react";

import { useRefreshTokenMutation } from "../features/api/usersApi";

import { useDispatch } from "react-redux";

import { login, logout } from "../features/slice/auth.js";

export default function useAuthInit() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    async function initialize() {
      try {
        const data = await refreshToken().unwrap();
        console.log("Initial token refresh: ", data);
        
        dispatch(login(data));
      } catch(err) {
        console.log(err);
        
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

  return loading;
}
