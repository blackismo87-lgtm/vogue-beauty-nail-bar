import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex' }}>
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        <Menu size={28} />
      </div>
    </nav>
  );
}
