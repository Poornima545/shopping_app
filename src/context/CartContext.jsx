import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saveCart = localStorage.getItem("cartItems");
            return saveCart ? JSON.parse(saveCart) : [];
        } catch (err) {
            console.error("Failed to parse cartItems from localStorage:", err);
            return [];
        }
    })

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id)
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id ? {
                        ...item, quantity: item.quantity + quantity
                    } : item
                )
            } else {
                return [...prev, { ...product, quantity }]
            }
        })
        alert(`Added "${product.title}" to cart!`);
    }

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId, quantity) => {
        setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item))
    }

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
    )

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)