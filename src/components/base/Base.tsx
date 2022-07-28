import './Base.css';
import NavBar from "../utils/NavBar/NavBar";
import { Outlet } from 'react-router-dom';

function Base() {
    return (
        <div>
            <NavBar/>
            <Outlet />
        </div>
    );
}

export default Base;