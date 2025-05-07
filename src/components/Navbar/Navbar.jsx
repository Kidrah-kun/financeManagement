import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return(
        <aside className="sidebar">
            <div className="sidebar-title">FinTrack</div>
            <nav>
                <ul>
                    <li><NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}><span role="img" aria-label="dashboard">📊</span> Dashboard</NavLink></li>
                    <li><NavLink to="/transactions" className={({isActive}) => isActive ? 'active' : ''}><span role="img" aria-label="transactions">↕️</span> Transactions</NavLink></li>
                    <li><NavLink to="/goals" className={({isActive}) => isActive ? 'active' : ''}><span role="img" aria-label="goals">🎯</span> Savings Goals</NavLink></li>
                    <li><NavLink to="/budget" className={({isActive}) => isActive ? 'active' : ''}><span role="img" aria-label="budget">💰</span> Budget</NavLink></li>
                    <li><NavLink to="/export" className={({isActive}) => isActive ? 'active' : ''}><span role="img" aria-label="export">📁</span> Export Data</NavLink></li>
                    <li><NavLink to="/settings" className={({isActive}) => isActive ? 'active' : ''}><span role="img" aria-label="settings">⚙️</span> Settings</NavLink></li>
                </ul>
            </nav>
        </aside>
    );
}

export default Navbar;