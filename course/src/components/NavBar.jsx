import { Link } from "react-router-dom";

function NavBar(){
    return(
    <nav>
        <ul>
            <li>
                <Link to="/">Landing</Link>
            </li>
            <li>
                <Link to="/courses">Show Courses</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/about">Create Course</Link>
            </li>
        </ul>
    </nav>
    )
}

export default NavBar 