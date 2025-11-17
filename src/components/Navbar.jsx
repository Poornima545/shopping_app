import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid  fw-bolder">
                <Link className="navbar-brand text-white fs-2 shop-title" to="/">
                    My Shop
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item text-uppercase">
                            <Link className="nav-link active text-white" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item text-uppercase">
                            <Link className="nav-link sidebar" to="/shop">
                                Shop
                            </Link>
                        </li>
                        <li className="nav-item text-uppercase">
                            <Link className="nav-link sidebar" to="/cart">
                                Cart
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="navbar-brand text-primary ms-5" to="/login">
                                SignIn?
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
