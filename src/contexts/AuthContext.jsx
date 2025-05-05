import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';

//Create new context for auth
export const AuthContext = createContext();

//Component wraps around the app to manage auth state
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);//Holds logged in user

    useEffect(() => {
        //Listening for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            
            // console.log('Auth State Changed:', currentUser);
        });

        return () => unsubscribe();
    }, []);

    //updates username on display
    const updateUser = async (name) => {
        if(!auth.currentUser) return;

        await updateProfile(auth.currentUser, {
            displayName: name,
        });

        //updates user state with new display name
        setUser({ ...auth.currentUser});
    }

    //Signs out current user
    const logout = async () =>{
        try{
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:" , error);
        }
    }

    return (
        <AuthContext.Provider value= {{ user, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

//Hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};