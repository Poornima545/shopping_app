import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../services/SupabaseClient"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //Check if user is already logged-in
        const getSession = async () => {
            const {
                data: { session }, error } = await supabase.auth.getSession();
            if (error) console.error("Error fetching session:", error)

            if (session) {
                setUser(session.user)
                setToken(session.access_token)
            }
            setLoading(false)
        }
        getSession()


        //Listen for login/logout changes
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUser(session.user)
                setToken(session.access_token)
            } else {
                setUser(null)
                setToken(null)
            }
        })

        //cleanup
        return () => {
            subscription?.subscription?.unsubscribe()
        }
    }, [])

    if (loading) return <p>Loading...</p>;

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)