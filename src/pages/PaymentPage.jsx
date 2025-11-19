import { useState, useEffect } from "react";

const PaymentPage = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem("latestOrder");
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    }, []);

    if (!order) {
        return <h2 className="text-center mt-5">No order found.</h2>;
    }

    const handlePayment = () => {
        alert("Payment Successful!");

        // Save order to completed orders
        const completedOrders =
            JSON.parse(localStorage.getItem("completedOrders")) || [];

        completedOrders.push(order);

        localStorage.setItem("completedOrders", JSON.stringify(completedOrders));

        // Remove orders once payment is completed
        localStorage.removeItem("latestOrder");

        // Redirect home
        window.location.href = "/";
    };

    return (
        <div className="container my-5">
            <h1>Payment</h1>
            <h4>Order ID: {order.orderId}</h4>
            <h4>Total: ₹{order.totalAmount}</h4>

            <button className="btn btn-success btn-lg mt-4" onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
};

export default PaymentPage;
