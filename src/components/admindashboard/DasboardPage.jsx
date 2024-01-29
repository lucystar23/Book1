// Dashboard.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faPlus, faBoxes, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`dashboard-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <aside>
        <div className="toggle-btn" onClick={handleToggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <nav>
          <Link to="/dashboard" title="Dashboard">
            <FontAwesomeIcon icon={faChartBar} />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </Link>
          <Link to="/adminusers" title="Users">
            <FontAwesomeIcon icon={faUsers} />
            {!isSidebarCollapsed && <span>Users</span>}
          </Link>
          <Link to="/add-categories" title="Add Categories">
            <FontAwesomeIcon icon={faPlus} />
            {!isSidebarCollapsed && <span>Add Categories</span>}
          </Link>
          <Link to="/add-products" title="Add Products">
            <FontAwesomeIcon icon={faBoxes} />
            {!isSidebarCollapsed && <span>Add Products</span>}
          </Link>
        </nav>
        <footer>
          <div onClick={handleLogout} title="Logout">
            <FontAwesomeIcon icon={faSignOutAlt} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </div>
        </footer>
      </aside>

      <maind>
        <header>
          <div className="navbar">
            <h1>Bibliofind</h1>
          </div>
        </header>

        <section>
          <h2>Welcome to the Dashboard</h2>
          <div id="main-content">
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h3>User</h3>
                <p>Count: 10</p>
              </div>

              <div className="dashboard-card">
                <h3>Products</h3>
                <p>Count: 20</p>
              </div>

              <div className="dashboard-card">
                <h3>Orders</h3>
                <p>Count: 5</p>
              </div>
            </div>
          </div>
        </section>
      </maind>
    </div>
  );
};

export default DashboardPage;
