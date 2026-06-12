import React, { useState } from "react";
import "../styles/main.css";
import CartBubble from "../components/CartBubble";

const menuData = {
    pizza: {
        Cheese: [
            { name: "Mozzarella", price: 20 },
            { name: "Cheddar", price: 20 },
            { name: "Parmesan", price: 30 },
            { name: "Vegan Cheese", price: 25 },
            { name: "Blue Cheese", price: 35 },
            { name: "Kiri Cheese", price: 20 },
        ],
        Protein: [
            { name: "Pepperoni", price: 35 },
            { name: "Sausage", price: 30 },
            { name: "Bacon", price: 40 },
            { name: "Grilled Chicken", price: 50 },
            { name: "Meat", price: 60 },
        ],
        Veggies: [
            { name: "Mushrooms", price: 10 },
            { name: "Onions", price: 5 },
            { name: "Green Peppers", price: 5 },
            { name: "Olives", price: 5 },
            { name: "Tomatoes", price: 5 },
        ],
        Sauces: [
            { name: "BBQ", price: 5 },
            { name: "Ranch", price: 5 },
            { name: "Hot", price: 5 },
        ],
    },
    pasta: {
        Protein: [
            { name: "Chicken", price: 40 },
            { name: "Shrimp", price: 60 },
            { name: "Meatballs", price: 50 },
            { name: "Sausage", price: 30 },
            { name: "Bacon", price: 40 },
        ],
        Veggies: [
            { name: "Mushrooms", price: 15 },
            { name: "Spinach", price: 15 },
            { name: "Broccoli", price: 10 },
            { name: "Zucchini", price: 10 },
            { name: "Bell Peppers", price: 10 },
        ],
        Sauces: [
            { name: "Marinara", price: 10 },
            { name: "Ranch", price: 5 },
            { name: "BBQ", price: 5 },
            { name: "Alfredo", price: 15 },
            { name: "Pesto", price: 15 },
            { name: "Hot Sauce", price: 5 },
        ],
        Cheese: [
            { name: "Parmesan", price: 15 },
            { name: "Mozzarella", price: 10 },
            { name: "Cheddar", price: 10 },
            { name: "Blue Cheese", price: 15 },
            { name: "Kiri Cheese", price: 10 },
        ],
    },
    soup: {
        Crunchy_Toppings: [
            { name: "Croutons", price: 10 },
            { name: "Tortilla Strips", price: 10 },
            { name: "Fried Onions", price: 10 },
        ],
        protein: [
            { name: "Grilled Chicken", price: 20 },
            { name: "Shrimp", price: 30 },
            { name: "Meatballs", price: 20 },
        ],
        Cheese: [
            { name: "Shredded Cheddar", price: 10 },
            { name: "Mozzarella", price: 10 },
        ],
        Veggies: [
            { name: "Green Onions", price: 5 },
            { name: "Sweet Corn", price: 5 },
        ],
    },
    dessert: {
        Cakes: [
            { name: "Chocolate Cake", price: 50 },
            { name: "Vanilla Cake", price: 40 },
            { name: "Red Velvet Cake", price: 35 },
            { name: "Cheesecake", price: 50 },
            { name: "Strawberry Shortcake", price: 40 },
        ],
        Ice_Cream: [
            { name: "Vanilla", price: 20 },
            { name: "Chocolate", price: 20 },
            { name: "Strawberry", price: 20 },
        ],
        Fruits: [
            { name: "Mixed Berries", price: 15 },
            { name: "Sliced Bananas", price: 10 },
            { name: "Pineapple Chunks", price: 10 },
            { name: "Mango Slices", price: 15 },
            { name: "Peach Slices", price: 10 },
            { name: "Kiwi Slices", price: 15 },
            { name: "Strawberry Slices", price: 10 },
        ],
        Extras: [
            { name: "Whipped Cream", price: 10 },
            { name: "Chocolate Syrup", price: 10 },
            { name: "Caramel Drizzle", price: 10 },
            { name: "Sprinkles", price: 10 },
            { name: "Chopped Nuts", price: 10 },
            { name: "Chocolate Chips", price: 10 },
            { name: "Crushed Lotus Biscuits", price: 10 },
            { name: "Crushed Oreo Cookies", price: 10 },
            { name: "Marshmallows", price: 10 },
        ],
    },
};

const CATEGORY_LABELS = {
    pizza: "Pizza 🍕",
    pasta: "Pasta 🍝",
    soup: "Soup 🥗",
    dessert: "Dessert 🍰",
};

function BuildYourMeal() {
    const [category, setCategory] = useState("pizza");
    const [selections, setSelections] = useState({
        pizza: {},
        pasta: {},
        soup: {},
        dessert: {},
    });

    const handleChange = (item, price, checked) => {
        setSelections((prev) => {
            const updated = { ...(prev[category] || {}) };
            if (checked) {
                updated[item] = price;
            } else {
                delete updated[item];
            }
            return { ...prev, [category]: updated };
        });
    };

    const currentSelection = selections[category] || {};

    const activeCategories = Object.keys(selections).filter(
        (cat) => Object.keys(selections[cat]).length > 0
    );

    const grandTotal = activeCategories.reduce((sum, cat) => {
        return sum + Object.values(selections[cat]).reduce((a, b) => a + b, 0);
    }, 0);

    const [cart, setCart] = useState([]);

    const [showToast, setShowToast] = useState(false);

    const handleAddToCart = () => {
        if (activeCategories.length === 0) return;

        const newItem = {
            id: Date.now(),
            categories: activeCategories.map((cat) => ({
                name: CATEGORY_LABELS[cat],
                toppings: { ...selections[cat] },
                subtotal: Object.values(selections[cat]).reduce((a, b) => a + b, 0),
            })),
            total: grandTotal,
        };

        setCart((prev) => [...prev, newItem]);
        setSelections({});

        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <div className="builder-page">
            <div className="categories">
                {Object.keys(CATEGORY_LABELS).map((cat) => (
                    <button
                        key={cat}
                        className={category === cat ? "active" : ""}
                        onClick={() => setCategory(cat)}
                    >
                        {CATEGORY_LABELS[cat]}
                    </button>
                ))}
            </div>

            <div className="builder-layout">
                <div className="builder-card">
                    <h2>{category.toUpperCase()}</h2>

                    <div className="columns">
                        {Object.keys(menuData[category]).map((group) => (
                            <div className="column" key={group}>
                                <h3>{group.replace("_", " ")}</h3>
                                {menuData[category][group].map((item) => (
                                    <label key={item.name} className="option">
                                        <input
                                            type="checkbox"
                                            checked={
                                                currentSelection[item.name] !== undefined
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    item.name,
                                                    item.price,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span>
                                            {item.name} (+{item.price} EGP)
                                        </span>
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="summary-box">
                    <h3 className="summary-title">Your Order</h3>

                    {activeCategories.length === 0 ? (
                        <p className="summary-empty">No items selected yet.</p>
                    ) : (
                        activeCategories.map((cat) => {
                            const catTotal = Object.values(selections[cat]).reduce(
                                (a, b) => a + b,
                                0
                            );
                            return (
                                <div className="summary-section" key={cat}>
                                    <h4 className="summary-section-title">
                                        {CATEGORY_LABELS[cat]}
                                    </h4>
                                    <ul className="summary-list">
                                        {Object.entries(selections[cat]).map(
                                            ([name, price]) => (
                                                <li key={name} className="summary-item">
                                                    <span>{name}</span>
                                                    <span>{price} EGP</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div className="summary-subtotal">
                                        <span>Subtotal</span>
                                        <span>{catTotal} EGP</span>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    <div className="summary-total">
                        <span>Grand Total</span>
                        <span>{grandTotal} EGP</span>
                    </div>

                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                        disabled={activeCategories.length === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            {showToast && (
                <div className="toast">
                    ✓ Added to cart!
                </div>
            )}

            <CartBubble cart={cart} setCart={setCart} />
        </div>
    );
}

export default BuildYourMeal;