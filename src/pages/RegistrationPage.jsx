import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { insforge } from '../lib/insforge';

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            if (isLogin) {
                const { error: signInError } = await insforge.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (signInError) throw signInError;
                navigate('/booking');
            } else {
                const { error: signUpError } = await insforge.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                        }
                    }
                });
                if (signUpError) throw signUpError;
                setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navigation />

            <main className="animate-fade-in" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
                {/* Header / Logo Area */}
                <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '3rem' }}>
                    <h1 style={{
                        fontSize: '1.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        lineHeight: '1.2',
                        fontStyle: 'normal'
                    }}>
                        Vogue Beauty<br />
                        <span style={{ fontSize: '1.25rem', fontWeight: 400 }}>Nail Bar</span>
                    </h1>
                </div>

                {/* Toggle Switcher */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
                    <button
                        type="button"
                        onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                        style={{
                            flex: 1,
                            paddingBottom: '1rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: !isLogin ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: !isLogin ? 'var(--text-primary)' : 'var(--text-muted)',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        S'inscrire
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                        style={{
                            flex: 1,
                            paddingBottom: '1rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: isLogin ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: isLogin ? 'var(--text-primary)' : 'var(--text-muted)',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Se connecter
                    </button>
                </div>

                {/* Form Section */}
                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {error && (
                        <div style={{ padding: '1rem', backgroundColor: 'rgba(236, 19, 19, 0.1)', color: 'var(--color-primary)', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{ padding: '1rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                            {success}
                        </div>
                    )}

                    {!isLogin && (
                        <>
                            <div>
                                <label className="label-mini">Prénom</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="editorial-input"
                                    placeholder="Prénom"
                                    required
                                />
                            </div>
                            <div>
                                <label className="label-mini">Nom de famille</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="editorial-input"
                                    placeholder="Nom de famille"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="label-mini">Adresse e-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="editorial-input"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="label-mini">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="editorial-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                            <input type="checkbox" required style={{ width: '1rem', height: '1rem', accentColor: 'var(--color-primary)' }} />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                J'accepte les conditions d'utilisation et la politique de confidentialité.
                            </span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1.25rem' }}
                    >
                        {loading ? 'Traitement...' : isLogin ? 'Se connecter' : 'Créer un compte'}
                    </button>
                </form>

                <p style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6 }}>
                    Édition Limitée • Paris
                </p>

                {/* Aesthetic Detail */}
                <div style={{ position: 'absolute', top: '15%', right: '-30px', opacity: 0.05, pointerEvents: 'none' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '180px' }}>spa</span>
                </div>
            </main>
        </>
    );
}
