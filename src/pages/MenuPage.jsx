import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuCards from "../components/MenuCards";

function MenuPage({ setPage }) {
    return (
        <>
            <Navbar />
            <MenuCards />
            <Footer />
        </>
    );
}

export default MenuPage;