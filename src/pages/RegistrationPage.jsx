import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { insforge } from '../lib/insforge';

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg('');
        setLoading(true);

        try {
            if (isLogin) {
                const { data, error: signInError } = await insforge.auth.signInWithPassword({
                    email,
                    password
                });

                if (signInError) throw signInError;

                if (data?.session) {
                    navigate('/booking');
                }
            } else {
                const { data, error: signUpError } = await insforge.auth.signUp({
                    email,
                    password,
                    name: `${firstName} ${lastName}`.trim()
                });

                if (signUpError) throw signUpError;

                if (data?.requireEmailVerification) {
                    setSuccessMsg('Veuillez vérifier votre boîte de réception pour valider votre compte.');
                } else if (data?.session) {
                    navigate('/booking');
                }
            }
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

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
                            type="button"
                            onClick={() => { setIsLogin(false); setError(null); setSuccessMsg(''); }}
                            style={{ flex: 1, padding: '1rem', background: 'transparent', border: 'none', borderBottom: `2px solid ${!isLogin ? 'var(--color-vogue-red)' : 'transparent'}`, fontWeight: !isLogin ? 700 : 400, color: !isLogin ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        >
                            S'inscrire
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsLogin(true); setError(null); setSuccessMsg(''); }}
                            style={{ flex: 1, padding: '1rem', background: 'transparent', border: 'none', borderBottom: `2px solid ${isLogin ? 'var(--color-vogue-red)' : 'transparent'}`, fontWeight: isLogin ? 700 : 400, color: isLogin ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        >
                            Se connecter
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {error && (
                            <div style={{ padding: '1rem', backgroundColor: '#ffebee', color: 'var(--color-vogue-red)', border: '1px solid var(--color-vogue-red)', borderRadius: '4px', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        {successMsg && (
                            <div style={{ padding: '1rem', backgroundColor: '#e8f5e9', color: '#2e7d32', border: '1px solid #4caf50', borderRadius: '4px', fontSize: '0.9rem' }}>
                                {successMsg}
                            </div>
                        )}

                        {!isLogin && (
                            <>
                                <input type="text" placeholder="Prénom" className="input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                <input type="text" placeholder="Nom de famille" className="input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </>
                        )}

                        <input type="email" placeholder="Adresse e-mail" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Mot de passe" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        {isLogin && (
                            <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                                <a href="#" style={{ color: 'var(--color-vogue-red)', fontSize: '0.9rem' }}>Mot de passe oublié ?</a>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', marginTop: '1rem', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer un compte')}
                        </button>
                    </form>

                </div>
            </main>
        </div>
    );
}
