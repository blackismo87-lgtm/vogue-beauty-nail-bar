import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function RegistrationPage() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            <Navigation />

            <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>

                <div style={{ width: '100%', maxWidth: '400px' }}>

                    {/* Logo / Title */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700 }}>
                            V<span style={{ color: 'var(--color-vogue-red)' }}>o</span>gue
                        </h1>
                        <p style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', marginTop: '0.5rem' }}>Beauty Nail Bar</p>
                    </div>

                    {/* Toggle */}
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                        <button
                            onClick={() => setIsLogin(false)}
                            style={{ flex: 1, padding: '1rem', background: 'transparent', border: 'none', borderBottom: `2px solid ${!isLogin ? 'var(--color-vogue-red)' : 'transparent'}`, fontWeight: !isLogin ? 700 : 400, color: !isLogin ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        >
                            S'inscrire
                        </button>
                        <button
                            onClick={() => setIsLogin(true)}
                            style={{ flex: 1, padding: '1rem', background: 'transparent', border: 'none', borderBottom: `2px solid ${isLogin ? 'var(--color-vogue-red)' : 'transparent'}`, fontWeight: isLogin ? 700 : 400, color: isLogin ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        >
                            Se connecter
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {!isLogin && (
                            <>
                                <input type="text" placeholder="Prénom" className="input-field" />
                                <input type="text" placeholder="Nom de famille" className="input-field" />
                            </>
                        )}

                        <input type="email" placeholder="Adresse e-mail" className="input-field" />
                        <input type="password" placeholder="Mot de passe" className="input-field" />

                        {isLogin && (
                            <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                                <a href="#" style={{ color: 'var(--color-vogue-red)', fontSize: '0.9rem' }}>Mot de passe oublié ?</a>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', marginTop: '1rem' }}>
                            {isLogin ? 'Se connecter' : 'Créer un compte'}
                        </button>
                    </form>

                </div>
            </main>
        </div>
    );
}
