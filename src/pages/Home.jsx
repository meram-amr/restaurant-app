import Navbar from "../components/Navbar";
import FoodAnimation from "../components/FoodAnimation";
import HeroSlider from "../components/HeroSlider";
import Footer from "../components/Footer";
import '../styles/main.css';
import React from "react";


function Home() {
    return (
        <>
            <Navbar />
            <HeroSlider />
            <FoodAnimation />
            <Footer />
        </>
    );
}

export default Home;