import Navbar from "../components/Navbar";
import pic01 from "../assets/pic-01.jpg";
import pic02 from "../assets/pic-02.jpg";
import pic03 from "../assets/pic-03.webp";

const Home = () => {
    return (
        <main>
            <Navbar />
            <header className="text-center py-5 bg-light">
                <h1 className="fw-bold text-primary">Welcome to MyShop</h1>
                <p className="lead">Browse products, add to cart, sign in, and manage your cart.</p>
            </header>

            {/* Image Gallery Section  */}
            <div className="container my-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <img src={pic01} alt="Homepage banner 1" className="img-fluid rounded shadow-sm" />
                    </div>
                    <div className="col-md-4">
                        <img src={pic02} alt="Homepage banner 2" className="img-fluid rounded shadow-sm" />
                    </div>
                    <div className="col-md-4">
                        <img src={pic03} alt="Homepage banner 3" className="img-fluid rounded shadow-sm" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
