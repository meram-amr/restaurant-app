import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menu = [
    {
        title: "Pizza 🍕",
        items: [
            { name: "Chicken Ranch", desc: "Chicken & ranch sauce", price: 180 },
            { name: "BBQ Chicken", desc: "Chicken & BBQ sauce", price: 150 },
            { name: "Buffalo Chicken", desc: "Chicken & buffalo sauce", price: 150 },
            { name: "Supreme", desc: "Pepperoni, sausage, mushrooms", price: 200 },
            { name: "Meat Lover", desc: "Pepperoni, sausage, ham", price: 130 },
            { name: "Margherita", desc: "Tomato & cheese", price: 100 },
            { name: "Pepperoni", desc: "Pepperoni & cheese", price: 155 },
            { name: "Veggie", desc: "Mixed vegetables", price: 130 },
            { name: "Hawaiian", desc: "Ham & pineapple", price: 100 },
            { name: "Four Cheese", desc: "Mozzarella, cheddar, parmesan, feta", price: 140 },
        ],
    },
    {
        title: "Pasta 🍝",
        items: [
            { name: "Alfredo", desc: "Creamy sauce", price: 250 },
            { name: "Bolognese", desc: "Meat sauce", price: 110 },
            { name: "Arrabbiata", desc: "Spicy tomato sauce", price: 95 },
            { name: "Aglio e Olio", desc: "Garlic & olive oil", price: 100 },
            { name: "Carbonara", desc: "Egg & bacon", price: 120 },
            { name: "Lasagna", desc: "Beef layers", price: 120 },
            { name: "Pesto", desc: "Basil sauce", price: 200 },
            { name: "Seafood", desc: "Mixed seafood", price: 300 },
            { name: "Mushroom", desc: "Mixed mushrooms", price: 170 },
            { name: "Vegetarian", desc: "Mixed vegetables", price: 150 },
        ],
    },
    {
        title: "Soups 🍲",
        items: [
            { name: "Tomato", desc: "Fresh tomato soup", price: 80 },
            { name: "Mushroom", desc: "Creamy mushroom soup", price: 90 },
            { name: "Chicken Noodle", desc: "Chicken & noodle soup", price: 100 },
            { name: "Vegetable", desc: "Mixed vegetable soup", price: 70 },
            { name: "Lentil", desc: "Hearty lentil soup", price: 85 },
            { name: "Clam Chowder", desc: "Creamy clam soup", price: 120 },
            { name: "French Onion", desc: "Onion soup with cheese", price: 110 },
            { name: "Minestrone", desc: "Italian vegetable soup", price: 90 },
            { name: "Beef Barley", desc: "Beef & barley soup", price: 130 },
            { name: "Gazpacho", desc: "Cold tomato soup", price: 80 },
        ],
    },
    {
        title: "Salads 🥗",
        items: [
            { name: "Caesar", desc: "Romaine lettuce & croutons", price: 100 },
            { name: "Greek", desc: "Cucumber & feta cheese", price: 90 },
            { name: "Caprese", desc: "Tomato & mozzarella", price: 85 },
            { name: "Tuna", desc: "Tuna & avocado", price: 120 },
            { name: "Chicken", desc: "Grilled chicken & mixed greens", price: 110 },
            { name: "Cobb", desc: "Mixed greens & bacon", price: 130 },
            { name: "Pasta Salad", desc: "Pasta & mixed vegetables", price: 80 },
            { name: "Quinoa", desc: "Quinoa & mixed vegetables", price: 90 },
            { name: "Fruit Salad", desc: "Mixed fresh fruits", price: 70 },
            { name: "Garden Salad", desc: "Mixed greens & vegetables", price: 60 },
        ]
    },
    {
        title: "Desserts 🍰",
        items: [
            { name: "Tiramisu", desc: "Coffee-flavored dessert", price: 130 },
            { name: "Cheesecake", desc: "Creamy cheesecake", price: 150 },
            { name: "Chocolate Cake", desc: "Rich chocolate cake", price: 150 },
            { name: "Fruit Tart", desc: "Fresh fruit on pastry", price: 60 },
            { name: "Panna Cotta", desc: "Creamy vanilla pudding", price: 50 },
            { name: "Ice Cream", desc: "Assorted flavors", price: 40 },
            { name: "Brownie", desc: "Chocolate brownie", price: 45 },
            { name: "Lemon Meringue", desc: "Lemon pie with meringue", price: 85 },
            { name: "Creme Brulee", desc: "Caramelized custard", price: 125 },
            { name: "Apple Pie", desc: "Classic apple pie", price: 70 },
            { name: "Chocolate Mousse", desc: "Light chocolate dessert", price: 100 },
            { name: "Strawberry Shortcake", desc: "Strawberries & cream", price: 80 },
        ]
    },
    {
        title: "Drinks 🍹",
        items: [
            { name: "Coca Cola", desc: "Refreshing cola", price: 20 },
            { name: "Pepsi", desc: "Sweet Pepsi", price: 20 },
            { name: "Sprite", desc: "Lemon-lime soda", price: 20 },
            { name: "Fanta", desc: "Orange soda", price: 20 },
            { name: "Water", desc: "Still or sparkling", price: 15 },
            { name: "Juice", desc: "Fresh fruit juice", price: 30 },
            { name: "Coffee", desc: "Hot coffee", price: 25 },
            { name: "Tea", desc: "Hot tea", price: 20 },
            { name: "Smoothie", desc: "Blended fruit smoothie", price: 60 },
            { name: "Milkshake", desc: "Creamy milkshake", price: 125 },
            { name: "Lemonade", desc: "Fresh lemonade", price: 50 },
            { name: "Iced Tea", desc: "Chilled tea with lemon", price: 30 },
            { name: "Mojito", desc: "Minty cocktail", price: 150 },
            { name: "Spanish Latte", desc: "Espresso with condensed milk", price: 150 },
        ]
    }
];

function MenuCards({ setShowMenu }) {
    const [index, setIndex] = useState(0);

    const handleSwipe = (dir) => {
        if (dir === "left" && index < menu.length - 1) setIndex(index + 1);
        if (dir === "right" && index > 0) setIndex(index - 1);
    };

    const items = menu[index].items;
    const half = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, half);
    const rightItems = items.slice(half);

    return (
        <div className="menu-overlay">

            <div className="backdrop" onClick={() => setShowMenu(false)} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    className="card"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                        if (info.offset.x < -100) handleSwipe("left");
                        if (info.offset.x > 100) handleSwipe("right");
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2>{menu[index].title}</h2>

                    <div className="columns">

                        <div className="column">
                            {leftItems.map((item, i) => (
                                <div key={i} className="menu-item">
                                    <h4>{item.name}</h4>
                                    <span>{item.price} EGP</span>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="column">
                            {rightItems.map((item, i) => (
                                <div key={i} className="menu-item">
                                    <h4>{item.name}</h4>
                                    <span>{item.price} EGP</span>
                                    <p>{item.desc}</p>

                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="card-buttons">
                        <button onClick={() => handleSwipe("right")}>←</button>
                        <button onClick={() => handleSwipe("left")}>→</button>
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default MenuCards;