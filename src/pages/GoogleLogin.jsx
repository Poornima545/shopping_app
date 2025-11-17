import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/SupabaseClient";
import { useEffect } from "react";

export const GoogleLogin = () => {
    const navigate = useNavigate()
    const { setUser, setToken } = useAuth()

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:5173/shop"
            }
        });
        if (error) console.error("Google login error:", error.message)
    }

    useEffect(() => {
        supabase.auth.getSession().then(({
            data: { session }
        }) => {
            if (session) {
                setUser(session.user)
                setToken(session.access_token)
                navigate("/shop")
            }
        })
    }, [])

    return (
        <div className="mt-3">
            <button type="button"
                onClick={handleGoogleLogin}
                className="btn btn-danger btn-lg w-100">
                Sign in with Google
            </button>
        </div>
    )
}