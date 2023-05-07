import {Link} from 'react-router-dom';
import './Navbar.css';
export const Navbar = () => {

    return(
        <div className="navbar">
            <h3>My website</h3>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/new-message">New Message</Link></li>
            </ul>
        </div>
    )
}