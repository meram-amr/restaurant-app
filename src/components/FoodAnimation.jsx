import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import fork from "../assets/fork.png";
import pasta from "../assets/pasta.png";

function FoodAnimation() {
    const [showButtons, setShowButtons] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.4, once: true });
    const navigate = useNavigate();

    return (
        <div className="intro-container" ref={sectionRef}>

            <motion.img
                src={fork}
                className="fork"
                initial={{ x: "-100vw", rotate: -20 }}
                animate={isInView ? { x: 0, rotate: 0 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                onAnimationComplete={() => {
                    if (isInView) setTimeout(() => setShowButtons(true), 300);
                }}
            />

            <motion.img
                src={pasta}
                className="pasta"
                initial={{ x: "100vw", rotate: 20 }}
                animate={isInView ? { x: 0, rotate: 0 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <motion.div
                className="impact-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={showButtons ? { scale: [0, 1.5, 1], opacity: [0, 1, 0.7] } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {showButtons && (
                <motion.div
                    className="actions"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <button onClick={() => navigate("/menu")}>
                        Menu
                    </button>
                    <button onClick={() => navigate("/build")}>
                        Build Your Meal
                    </button>
                    <button onClick={() => navigate("/reviews")}>
                        Leave Review
                    </button>
                </motion.div>
            )}
        </div>
    );
}

export default FoodAnimation;