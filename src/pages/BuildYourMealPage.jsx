import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BuildYourMeal from "../components/BuildYourMeal";

function BuildYourMealPage({ setPage }) {
    return (
        <>
            <Navbar />
            <BuildYourMeal />
            <Footer />
        </>
    );
}

export default BuildYourMealPage;