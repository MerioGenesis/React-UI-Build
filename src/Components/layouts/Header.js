import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    // Properties
    //Hooks
    //Context
    //Methods
    //View
    return (
        <header>
            <Link to="/">
                <img src="https://icons.iconarchive.com/icons/iconsmind/outline/256/Car-2-icon.png" alt="Logo" />
            </Link>
            <Link to="/">
                <h1>React First Build</h1>
            </Link>
            <div className="login">
                <p>Welcome Mario!</p>
            </div>
        </header>
    )
}

export default Header;