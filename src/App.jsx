import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import BuildYourMeal from "./pages/BuildYourMealPage";
import CartBubble from "./components/CartBubble";
import ReviewPage from "./pages/ReviewPage";

function App() {
    const [cart, setCart] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route
                    path="/build"
                    element={<BuildYourMeal cart={cart} setCart={setCart} />}
                />
                <Route path="/reviews" element={<ReviewPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;