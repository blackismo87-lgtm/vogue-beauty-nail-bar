import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, User, LogOut, Calendar as CalIcon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { insforge } from '../lib/insforge';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await insforge.auth.getCurrentSession();
      setSession(data?.session);
    };
    fetchSession();

    // Note: in a real app, you'd want to listen to auth state changes here
  }, []);

  const handleLogout = async () => {
    await insforge.auth.signOut();
    setSession(null);
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 2rem',
      backgroundColor: 'var(--nav-bg)',
      borderBottom: '1px solid var(--border-color)',
      color: 'var(--text-primary)'
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.5rem',
        fontWeight: '700',
        letterSpacing: '1px'
      }}>
        <Link to="/" style={{ color: 'var(--text-primary)' }}>
          <span style={{ fontSize: '2rem' }}>V</span>
          <span style={{ display: 'inline-block', position: 'relative' }}>
            o
            <span style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'var(--color-vogue-pink)',
              width: '8px',
              height: '14px',
              borderRadius: '4px 4px 8px 8px',
              zIndex: -1
            }}></span>
          </span>
          gue
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', cursor: 'pointer' }}>
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        <button onClick={() => setShowMenu(!showMenu)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
          <Menu size={28} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '0.5rem',
            minWidth: '200px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none', color: 'var(--text-primary)', padding: '0.75rem 1rem', display: 'block', borderRadius: '4px' }}>
              Nouveau Réservation
            </Link>

            {session ? (
              <>
                <Link to="/appointments" style={{ textDecoration: 'none', color: 'var(--text-primary)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '4px' }}>
                  <CalIcon size={16} /> Mes Rendez-vous
                </Link>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', color: 'var(--color-vogue-red)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', borderRadius: '4px' }}>
                  <LogOut size={16} /> Se déconnecter
                </button>
              </>
            ) : (
              <Link to="/register" style={{ textDecoration: 'none', color: 'var(--text-primary)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '4px' }}>
                <User size={16} /> Se connecter
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
