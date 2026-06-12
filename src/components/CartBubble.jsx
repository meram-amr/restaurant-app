import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function CartBubble({ cart, setCart }) {
    const [isOpen, setIsOpen] = useState(false);

    const itemCount = cart.length;
    const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <>
            <button className="cart-bubble" onClick={() => setIsOpen(true)}>
                🛒
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="cart-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            className="cart-drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className="cart-header">
                                <h2>Your Cart</h2>
                                <button className="cart-close" onClick={() => setIsOpen(false)}>
                                    ✕
                                </button>
                            </div>

                            <div className="cart-body">
                                {cart.length === 0 ? (
                                    <p className="cart-empty">Your cart is empty.</p>
                                ) : (
                                    cart.map((order) => (
                                        <div className="cart-order" key={order.id}>
                                            <div className="cart-order-header">
                                                <span>Order #{order.id.toString().slice(-4)}</span>
                                                <button
                                                    className="cart-remove"
                                                    onClick={() => removeFromCart(order.id)}
                                                >
                                                    🗑
                                                </button>
                                            </div>

                                            {order.categories.map((cat) => (
                                                <div className="cart-category" key={cat.name}>
                                                    <h4>{cat.name}</h4>
                                                    <ul>
                                                        {Object.entries(cat.toppings).map(
                                                            ([name, price]) => (
                                                                <li key={name}>
                                                                    <span>{name}</span>
                                                                    <span>{price} EGP</span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}

                                            <div className="cart-order-total">
                                                <span>Order Total</span>
                                                <span>{order.total} EGP</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="cart-footer">
                                    <div className="cart-grand-total">
                                        <span>Grand Total</span>
                                        <span>{grandTotal} EGP</span>
                                    </div>
                                    <button className="checkout-btn">Checkout</button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default CartBubble;