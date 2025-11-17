import { useCart } from "../context/CartContext";

const OrderSummary = () => {
    const { cartItems, totalPrice } = useCart();

    const handleProceedToPay = () => {
        const orderData = {
            orderId: Date.now(), // unique id
            items: cartItems,
            totalAmount: totalPrice,
            orderDate: new Date().toISOString(),
        };

        // Save temporary order
        localStorage.setItem("latestOrder", JSON.stringify(orderData));

        // Redirect to payment page
        window.location.href = "/payment";
    };

    return (
        <div className="text-end mt-4 border-top pt-4">
            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>

            <button
                className="btn btn-primary btn-lg mt-3"
                onClick={handleProceedToPay}
            >
                Proceed to Pay
            </button>
        </div>
    );
};

export default OrderSummary;
