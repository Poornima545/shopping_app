import { useCart } from "../context/CartContext";
import OrderSummary from "../services/OrderService";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (cartItems.length === 0) {
        return <h2 className="text-center mt-5">Your cart is empty</h2>;
    }

    return (
        <main className="container my-5">
            <header className="text-center mb-4">
                <h1 className="fw-bold text-primary">Your Shopping Cart</h1>
            </header>

            <section className="d-flex flex-column gap-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="d-flex align-items-center justify-content-between pb-3 border-bottom"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="me-3"
                            style={{ width: "250px", height: "250px", objectFit: "contain" }}
                        />

                        <div className="flex-grow-1">
                            <h5 className="mb-1">{item.title}</h5>
                            <p className="mb-1 text-muted">Price: ₹{item.price}</p>
                        </div>

                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                            >
                                −
                            </button>
                            <span className="mx-2 fw-bold">{item.quantity}</span>
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="btn btn-outline-danger btn-sm ms-3"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <OrderSummary/>
            </section>
        </main>
    );
};

export default Cart;
