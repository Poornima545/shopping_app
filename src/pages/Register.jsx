import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/SupabaseClient";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const { name, email, password, phone, address } = formData;
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        phone,
                        address,
                    },
                },
            });

            if (signUpError) {
                setError(signUpError.message);
            } else {
                alert("Please check your email for verification.");
                navigate("/login");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <main className="register-bg d-flex justify-content-center align-items-center vh-100">
            <section className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <div>
                    <header className="mb-4 text-center">
                        <h2>Register</h2>
                    </header>
                    <form onSubmit={handleSignup}>
                        {error && <p className="text-danger">{error}</p>}

                        <div className="mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                value={name}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={handleChange}
                                className="form-control"
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
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                name="address"
                                placeholder="Enter Address"
                                value={address}
                                onChange={handleChange}
                                className="form-control"
                                rows="3"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Register
                        </button>

                        <p className="text-end pt-2">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Register;
