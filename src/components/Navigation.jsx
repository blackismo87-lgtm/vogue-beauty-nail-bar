import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { insforge } from '../lib/insforge';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await insforge.auth.getCurrentSession();
      setSession(data?.session);
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await insforge.auth.signOut();
    setSession(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Header */}
      <header className="glass-panel" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        justifyContent: 'space-between',
      }}>
        <div style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setShowMenu(!showMenu)}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>menu</span>
        </div>

        <h1 style={{
          fontSize: '1.25rem',
          lineHeight: '1.2',
          textAlign: 'center',
          flex: 1,
          letterSpacing: '-0.02em'
        }}>
          <Link to="/" style={{ color: 'inherit' }}>Vogue Beauty</Link>
        </h1>

        <div style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button style={{ background: 'none', border: 'none', display: 'flex', color: 'inherit', cursor: 'pointer' }}>
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>

        {/* Desktop-like Dropdown / Mobile Overlay */}
        {showMenu && (
          <div className="glass-panel" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderBottom: '1px solid var(--border-color)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <Link to="/booking" onClick={() => setShowMenu(false)} style={{ fontStyle: 'italic', fontSize: '1.125rem' }}>Réserver un soin</Link>
            {session ? (
              <>
                <Link to="/appointments" onClick={() => setShowMenu(false)} style={{ fontStyle: 'italic', fontSize: '1.125rem' }}>Mes Rendez-vous</Link>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', textAlign: 'left', fontStyle: 'italic', fontSize: '1.125rem', color: 'var(--color-primary)', cursor: 'pointer' }}>Se déconnecter</button>
              </>
            ) : (
              <Link to="/registration" onClick={() => setShowMenu(false)} style={{ fontStyle: 'italic', fontSize: '1.125rem' }}>Espace Client</Link>
            )}
          </div>
        )}
      </header>

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '0.5rem 1rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px'
        }}>
          <Link to="/" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: isActive('/') ? 'var(--color-primary)' : 'var(--text-muted)',
            flex: 1
          }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accueil</span>
          </Link>

          <Link to="/booking" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: isActive('/booking') ? 'var(--color-primary)' : 'var(--text-muted)',
            flex: 1
          }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/booking') ? "'FILL' 1" : "'FILL' 0" }}>calendar_today</span>
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Réserver</span>
          </Link>

          <Link to="/appointments" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: isActive('/appointments') ? 'var(--color-primary)' : 'var(--text-muted)',
            flex: 1
          }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/appointments') ? "'FILL' 1" : "'FILL' 0" }}>schedule</span>
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mes RDV</span>
          </Link>

          <Link to="/registration" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: isActive('/registration') ? 'var(--color-primary)' : 'var(--text-muted)',
            flex: 1
          }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/registration') ? "'FILL' 1" : "'FILL' 0" }}>person</span>
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profil</span>
          </Link>
        </div>
      </nav>

      {/* Spacer to fix bottom nav covering content */}
      <div style={{ height: '80px' }}></div>
    </>
  );
}
