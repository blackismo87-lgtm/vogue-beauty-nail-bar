import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { insforge } from '../lib/insforge';

export default function AppointmentsPage() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            const { data: { session } } = await insforge.auth.getCurrentSession();

            if (!session) {
                navigate('/register');
                return;
            }

            // Fetch user's appointments
            const { data, error } = await insforge.database
                .from('appointments')
                .select('*')
                .eq('user_email', session.user.email)
                .order('appointment_date', { ascending: false });

            if (!error && data) {
                setAppointments(data);
            }
            setLoading(false);
        };

        fetchAppointments();
    }, [navigate]);

    return (
        <>
            <Navigation />

            <main className="animate-fade-in" style={{ padding: '2rem 1.5rem', paddingBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '3rem' }}>
                    <p className="label-mini" style={{ marginBottom: '0.5rem' }}>Espace Privé</p>
                    <h1 style={{
                        fontSize: '1.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        lineHeight: '1.2'
                    }}>
                        Mes Rendez-vous
                    </h1>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        Chargement de vos précieux moments...
                    </div>
                ) : appointments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'var(--border-color)', marginBottom: '1.5rem' }}>
                            calendar_today
                        </span>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Aucun rendez-vous à venir</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.875rem' }}>
                            Prenez soin de vous en réservant votre prochaine prestation chez Vogue Beauty.
                        </p>
                        <button onClick={() => navigate('/booking')} className="btn btn-primary" style={{ width: '100%', maxWidth: '300px' }}>
                            Prendre Rendez-vous
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {appointments.map((apt) => (
                            <div key={apt.id} className="vogue-card" style={{
                                padding: '1.5rem',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1 }}>
                                        <p className="label-mini" style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                                            {apt.status === 'confirmed' ? 'Confirmé' : apt.status}
                                        </p>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{apt.service_name}</h3>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 800, fontSize: '1.25rem' }}>{apt.service_price}{typeof apt.service_price === 'number' ? '€' : ''}</p>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    borderTop: '1px solid var(--border-color)',
                                    paddingTop: '1rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.875rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>calendar_month</span>
                                        <span>{new Date(apt.appointment_date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>schedule</span>
                                        <span>{apt.appointment_time}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>location_on</span>
                                        <span>Vogue Beauty Montaigne, Paris</span>
                                    </div>
                                </div>

                                <div style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    opacity: 0.03,
                                    pointerEvents: 'none'
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>spa</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
