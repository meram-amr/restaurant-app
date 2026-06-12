import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Review from "../components/Review";

function ReviewPage({ setPage }) {
    return (
        <>
            <Navbar />
            <Review />
            <Footer />
        </>
    );
}

export default ReviewPage;