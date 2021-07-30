import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          console.log("Login in Email and Password", email, password);
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log("Error while Logging in ", error);
            setError(error);
          }
        },
        register: async (email, password) => {
          console.log("Sign Up Email and Password", email, password);
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            console.log("Error while Signing ip ", error);
          }
        },
        logout: async () => {
          console.log("Signing Out");
          try {
            auth().signOut();
          } catch (error) {
            console.log("Error while Signing out", error);
          }
        },
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
