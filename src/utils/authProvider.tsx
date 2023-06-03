import React, { PropsWithChildren, useState } from "react"
import firebase from "firebase/app"
import { useEffect } from "react";
import { auth } from "../config/firebase";

type ContextState = firebase.User | null

export const FirebaseAuthContext = React.createContext<ContextState>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [user, setUser] = useState<ContextState>(null)

    useEffect(() => {
        const authDisposable = auth.onAuthStateChanged( async (authorizedUser) => {
            if(authorizedUser) {
                setUser(authorizedUser)
            } else {
                setUser(null)
            }
        })

        return () => {
            authDisposable()
        }

    }, [])

    return (
        <FirebaseAuthContext.Provider value={user}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}

export default AuthProvider