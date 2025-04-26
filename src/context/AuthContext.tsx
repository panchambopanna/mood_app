'use client'
import { auth, db } from '@/firebase'
import { UserData } from '@/utils/types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useState, useEffect } from 'react'

type AuthContextType = {
    currentUser: User | null;
    userDataObj: UserData | null;
    setUserDataObj: React.Dispatch<React.SetStateAction<UserData | null>>;
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    loading: boolean;
}


const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export const useAuth = ()=> useContext(AuthContext)

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userDataObj, setUserDataObj] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    // AUTH HANDLERS
    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email : string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // Set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if (!user) {
                    console.error('No User Found')
                    return
                }

                // if user exists, fetch data from firestore database
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData= {}
                if (docSnap.exists()) {
                    firebaseData = docSnap.data()
                }
                setUserDataObj(firebaseData)
            } catch (err) {
                console.error('Error fetching user data',err)
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        logout,
        login,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}