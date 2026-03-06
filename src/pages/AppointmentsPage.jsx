import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { insforge } from '../lib/insforge';

export default function AppointmentsPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            const { data: { session } } = await insforge.auth.getCurrentSession();

            if (!session) {
                navigate('/register');
                return;
            }

            setUser(session.user);

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
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            <Navigation />

            <main style={{ flexGrow: 1, padding: '3rem 1.5rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>Mes Rendez-vous</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                    Retrouvez l'historique et les détails de vos réservations chez Vogue Beauty Nail Bar.
                </p>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Chargement de vos réservations...</div>
                ) : appointments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px' }}>
                        <Calendar size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Aucun rendez-vous</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Vous n'avez pas encore réservé de prestation.</p>
                        <Link to="/booking" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                            Prendre Rendez-vous
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {appointments.map((apt) => (
                            <div key={apt.id} style={{
                                padding: '2rem',
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Status Indicator */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    backgroundColor: 'var(--color-vogue-red)'
                                }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '0.2rem' }}>{apt.service_name}</h3>
                                        <div style={{ display: 'inline-block', padding: '0.2rem 0.8rem', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                                            {apt.status === 'confirmed' ? 'Confirmé' : apt.status}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-vogue-red)' }}>
                                        {apt.service_price}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={16} />
                                        <span>{new Date(apt.appointment_date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Clock size={16} />
                                        <span>{apt.appointment_time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
