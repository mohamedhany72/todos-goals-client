import logo from "../assets/images/logo.png";

const Header = () => {
    return (
        <header>
            <div className="container">
                <img src={logo} alt="logo" />
            </div>
        </header>
    );
};

export default Header;
