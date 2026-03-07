import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { insforge } from '../lib/insforge';

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [session, setSession] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [fetchingData, setFetchingData] = useState(false);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        const { data: { session: currentSession } } = await insforge.auth.getCurrentSession();
        setSession(currentSession);
        if (currentSession) {
            fetchUserData(currentSession.user.email);
        }
    };

    const fetchUserData = async (email) => {
        setFetchingData(true);
        try {
            // Fetch Appointments
            const { data: aptData } = await insforge.database
                .from('appointments')
                .select('*')
                .eq('user_email', email)
                .order('appointment_date', { ascending: false });

            if (aptData) setAppointments(aptData);

            // Fetch Promotions
            const { data: promoData } = await insforge.database
                .from('promotions')
                .select('*')
                .order('created_at', { ascending: false });

            if (promoData) setPromotions(promoData || []);
        } catch (err) {
            console.error("Error fetching profile data:", err);
        } finally {
            setFetchingData(false);
        }
    };

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
                const { error: signInError, data: authData } = await insforge.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (signInError) throw signInError;
                setSession(authData);
                fetchUserData(formData.email);
            } else {
                const { error: signUpError, data: signUpData } = await insforge.auth.signUp({
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

                if (signUpData?.accessToken) {
                    setSession(signUpData);
                    fetchUserData(formData.email);
                } else {
                    setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                    setIsLogin(true);
                }
            }
        } catch (err) {
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await insforge.auth.signOut();
        setSession(null);
        setAppointments([]);
        setPromotions([]);
    };

    if (session) {
        return (
            <>
                <Navigation />
                <main className="animate-fade-in" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '6rem' }}>
                    <div style={{ width: '100%', maxWidth: '900px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <div>
                                <p className="label-mini" style={{ color: 'var(--color-primary)' }}>Bienvenue</p>
                                <h1 style={{ fontSize: '1.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    {session.user.metadata?.first_name || 'Élégance'} {session.user.metadata?.last_name || 'Vogue'}
                                </h1>
                            </div>
                            <button onClick={handleLogout} className="btn" style={{ border: '1px solid var(--border-color)', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                                Déconnexion
                            </button>
                        </div>

                        {/* Quick Action */}
                        <div style={{ marginBottom: '4rem', textAlign: 'center', padding: '3rem', backgroundColor: 'var(--color-bg-dark)', color: 'white', borderRadius: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Prête pour un moment de détente ?</h2>
                            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Réservez votre prochaine prestation en quelques clics.</p>
                            <button onClick={() => navigate('/booking')} className="btn btn-primary" style={{ width: '100%', maxWidth: '300px' }}>
                                Prendre Rendez-vous
                            </button>
                        </div>

                        <div className="responsive-grid" style={{ gap: '3rem' }}>
                            {/* Appointments History */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Historique</h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{appointments.length} rendez-vous</span>
                                </div>
                                {fetchingData ? (
                                    <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Chargement de l'historique...</p>
                                ) : appointments.length === 0 ? (
                                    <div className="vogue-card" style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                                        <p style={{ fontSize: '0.875rem' }}>Aucun rendez-vous passé.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {appointments.slice(0, 3).map(apt => (
                                            <div key={apt.id} className="vogue-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{apt.service_name}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                        {new Date(apt.appointment_date).toLocaleDateString('fr-FR')} à {apt.appointment_time}
                                                    </p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{apt.service_price.toLocaleString()} F</p>
                                                    <span style={{ fontSize: '0.625rem', textTransform: 'uppercase' }}>{apt.status === 'confirmed' ? 'Passé' : apt.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Promotions Section */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Offres Exclusive</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {promotions.map(promo => (
                                        <div key={promo.id} className="vogue-card" style={{ padding: 0, overflow: 'hidden' }}>
                                            <div style={{ height: '120px', width: '100%' }}>
                                                <img src={promo.image_url} alt={promo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ padding: '1rem' }}>
                                                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{promo.title}</h4>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{promo.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {promotions.length === 0 && !fetchingData && (
                                        <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Aucune promotion pour le moment.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navigation />

            <main className="animate-fade-in" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', minHeight: '80vh', alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: '450px' }}>
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
                            <span style={{ fontSize: '1.25rem', fontWeight: 400 }}>Espace Privé</span>
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
                        Édition Limitée • Bamako
                    </p>

                    {/* Aesthetic Detail */}
                    <div style={{ position: 'absolute', top: '15%', right: '-30px', opacity: 0.05, pointerEvents: 'none' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '180px' }}>spa</span>
                    </div>
                </div>
            </main>
        </>
    );
}
