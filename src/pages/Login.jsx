import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from "./GoogleLogin"
import { supabase } from "../services/SupabaseClient";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        error: ""
    })
    const { email, password, error } = formData
    const navigate = useNavigate()
    const { setUser, setToken } = useAuth()

    //input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    //handle supabase login
    const handleLogin = async (e) => {
        e.preventDefault()
        setFormData({
            ...formData, error: ""
        })

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                setFormData((prev) => ({ ...prev, error: error.message }))
                return
            }

            //save user session
            setUser(data.user)
            setToken(data.session.access_token)

            //navigate to shop page
            navigate("/shop")
        } catch (err) {
            setFormData((prev) => ({ ...prev, error: "Something went wrong. Try again!" }))
        }
    }

    return (
        <main className="home-bg">
            <section className="container-fluid vh-100 d-flex align-items-center">
                <div className="w-50 login p-5 text-center">
                    <header className="fw-bolder fs-1 text-uppercase mb-4">Login</header>
                    <form onSubmit={handleLogin} className="text-center">
                        {
                            error && <p className="text-danger">{error}</p>
                        }
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={handleChange}
                                className="form-control form-control-lg"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={handleChange}
                                className="form-control form-control-lg"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success text-uppercase btn-lg w-100">Sign in</button>
                        <p className="text-end pt-2">Don’t have an account?
                            <Link to="/register" className="text-decoration-underline"> Sign up</Link>
                        </p>
                        <div className="d-flex align-items-center my-3">
                            <hr className="flex-grow-1" />
                            <span className="mx-2">OR</span>
                            <hr className="flex-grow-1" />
                        </div>

                        <GoogleLogin />
                    </form>
                </div>
            </section>
        </main>
    )
}