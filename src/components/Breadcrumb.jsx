// components/Breadcrumb.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../sass/breadcrumb/breadcrumb.scss'; // Assicurati di importare il file di stile

const Breadcrumb = () => {
  const location = useLocation();
  
  const paths = location.pathname.split('/').filter(path => path); // Divide il percorso in parti

  return (
    <div>
      <ul className="breadcrumb">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        {paths.map((path, index) => {
          const to = '/' + paths.slice(0, index + 1).join('/'); // Ricostruisci il percorso fino a quel punto
          return (
            <li key={index}>
              <span> / </span>
              <Link to={to} className={location.pathname === to ? 'active' : ''}>
                {path.charAt(0).toUpperCase() + path.slice(1)} {/* Capitalizza la prima lettera */}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
