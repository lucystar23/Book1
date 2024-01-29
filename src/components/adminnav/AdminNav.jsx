import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartBar, faUsers, faPlus, faBoxes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './AdminNav.css'; // Don't forget to import your CSS file

const AdminNav = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    Navigate('/login');
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
    </div>
  );
};

export default AdminNav;
