// src/components/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../plugins/Axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     if (token) {
  //       API.defaults.headers.common.Authorization = `Bearer ${token}`;
  //       try {
  //         const res = await API.get("/me"); // <-- match Laravel route
  //         setUser(res.data);
  //       } catch {
  //         setUser(null);
  //         await AsyncStorage.removeItem("token");
  //       }
  //     }
  //     setBooted(true);
  //   };
  //   loadUser();
  // }, []);

  useEffect(() => {
  const loadUser = async () => {
    console.log("Loading user...");
    const token = await AsyncStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      try {
        const res = await API.get("/me");
        console.log("User loaded:", res.data);
        setUser(res.data);
      } catch (err) {
        console.log("Error loading user:", err.message);
        setUser(null);
        await AsyncStorage.removeItem("token");
      }
    }
    setBooted(true);
    console.log("Boot complete");
  };
  loadUser();
}, []);

  const login = async (email, password) => {
    const res = await API.post("/login", { email, password });
    await AsyncStorage.setItem("token", res.data.token);
    API.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await API.post("/register", { name, email, password });
    await AsyncStorage.setItem("token", res.data.token);
    API.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
    setUser(res.data.user);
  };

  const logout = async () => {
    try { await API.post("/logout"); } catch {}
    await AsyncStorage.removeItem("token");
    delete API.defaults.headers.common.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, booted, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
