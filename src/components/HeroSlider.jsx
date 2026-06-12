import { useState, useEffect } from "react";

import img1 from "../assets/food1.jpg";
import img2 from "../assets/food2.jpg";
import img3 from "../assets/food3.jpg";
import img4 from "../assets/food4.jpg";
import img5 from "../assets/food5.jpg";

const images = [img1, img2, img3, img4, img5];

function HeroSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider">

            <div
                className="slider-track"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                }}
            >
                {images.map((img, i) => (
                    <img key={i} src={img} alt="food" />
                ))}
            </div>

            <div className="dots">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`dot ${index === i ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeroSlider;