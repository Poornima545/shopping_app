import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/SupabaseClient"

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cartItems, addToCart } = useCart();
    const navigate = useNavigate()

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const handleLogout = () => {
        const { error } = supabase.auth.signOut()
        if (!error) navigate("/")
    }

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
        } catch (err) {
            setError("Failed to fetch products. Please try again later.");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p className="text-center mt-5">Loading products...</p>;
    if (error) return <p className="text-center text-danger mt-5">{error}</p>;

    return (
        <main className="container my-5">
            <nav className="d-flex justify-content-end mb-4">
                <Link to="/cart" className="btn btn-outline-primary">
                    🛒 Cart ({cartCount})
                </Link>
                <button onClick={handleLogout} className="btn btn-link p-1 text-decoration-underline text-dark">Logout?</button>
            </nav>

            <header className="text-center mb-5">
                <h1 className="fw-bold text-primary">Welcome to MyShop</h1>
                <h6 className="text-muted">Shop all your favourites in one place.</h6>
            </header>

            <div className="row row-cols-1 row-cols-md-2 g-4">
                {products.map((product) => (
                    <div key={product.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="card-img-top p-3"
                                style={{ height: "200px", objectFit: "contain" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title">{product.title}</h6>
                                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                                    {product.description.slice(0, 80)}...
                                </p>
                                <p className="fw-bold">₹{product.price}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="btn btn-dark text-white mt-auto"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Shop;
