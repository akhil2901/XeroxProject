import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [error, setError] = useState('');

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          console.log('Login in Email and Password', email, password);
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log('Error while Logging in ', error);
            setError(error);
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          } catch (error) {
            console.log('Error while signing in with Google', error);
          }
        },
        fbLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential);
          } catch (error) {
            console.log('Error while Signing in from FaceBook', error);
          }
        },
        register: async (email, password) => {
          console.log('Sign Up Email and Password', email, password);
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            console.log('Error while Signing ip ', error);
          }
        },
        logout: async () => {
          console.log('Signing Out');
          try {
            auth().signOut();
          } catch (error) {
            console.log('Error while Signing out', error);
          }
        },
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
