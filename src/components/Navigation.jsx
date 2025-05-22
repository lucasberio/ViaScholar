import './Navigation.css';

function Navigation() {
    return (
            <aside className = "sidebar">
                <nav className = "navbar">
                    <ul className = "nav-list">
                        <li className = "list-item">
                            <a href = "#" className = "nav-link">Dashboard</a>
                        </li>
                        <li className = "list-item">
                            <a href = "#" className = "nav-link">Saved Scholarships</a>
                        </li>
                        <li className = "list-item">
                            <a href = "#" className = "nav-link">Applied Scholarships</a>
                        </li>
                    </ul>
                </nav>
            </aside>
    );
}

export default Navigation