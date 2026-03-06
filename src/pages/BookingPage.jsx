import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock } from 'lucide-react';
import { insforge } from '../lib/insforge';

export default function BookingPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    // Form state
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Booking submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await insforge.auth.getCurrentSession();
            if (data?.session?.user) {
                setUser(data.session.user);
            }
            setLoadingAuth(false);
        };
        checkUser();
    }, []);

    const handleConfirmBooking = async () => {
        if (!user) {
            // Redirect to login if unauthenticated
            navigate('/register');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const { error: dbError } = await insforge.database
                .from('appointments')
                .insert([
                    {
                        user_email: user.email,
                        user_name: user.profile?.name || 'Client',
                        service_name: selectedService.name,
                        service_price: selectedService.price,
                        appointment_date: `2026-11-${selectedDate.toString().padStart(2, '0')}`,
                        appointment_time: selectedTime,
                        status: 'confirmed'
                    }
                ]);

            if (dbError) throw dbError;

            setSuccess(true);
        } catch (err) {
            setError(err.message || "Erreur lors de la réservation.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const services = [
        { id: 1, name: 'Manucure Classique', price: '45€', duration: '45 min' },
        { id: 2, name: 'Pédicure Spa Signature', price: '70€', duration: '60 min' },
        { id: 3, name: 'Massage Suédois', price: '90€', duration: '60 min' }
    ];

    const timeSlots = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            <Navigation />

            <main style={{ flexGrow: 1, padding: '2rem 1.5rem', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                {/* Progress Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: step >= 1 ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: step >= 1 ? 700 : 400 }}>Services</span>
                    <span>&gt;</span>
                    <span style={{ color: step >= 2 ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: step >= 2 ? 700 : 400 }}>Date & Heure</span>
                    <span>&gt;</span>
                    <span style={{ color: step >= 3 ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: step >= 3 ? 700 : 400 }}>Confirmation</span>
                </div>

                {step === 1 && (
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Choisissez un Service</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {services.map(s => (
                                <div
                                    key={s.id}
                                    onClick={() => setSelectedService(s)}
                                    style={{
                                        padding: '1.5rem',
                                        border: `1px solid ${selectedService?.id === s.id ? 'var(--color-vogue-red)' : 'var(--border-color)'}`,
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'border-color 0.2s'
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{s.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Clock size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />{s.duration}</p>
                                    </div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{s.price}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '3rem', opacity: selectedService ? 1 : 0.5 }}
                            disabled={!selectedService}
                            onClick={() => setStep(2)}
                        >
                            Continuer
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '1.5rem' }} onClick={() => setStep(1)}>
                            <ChevronLeft size={20} /> <span style={{ fontWeight: 600 }}>Retour</span>
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Sélectionnez une Date</h2>

                        {/* Fake Calendar */}
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <ChevronLeft size={20} color="#ccc" />
                                <span style={{ fontWeight: 600 }}>Novembre 2026</span>
                                <ChevronRight size={20} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', textAlign: 'center', marginBottom: '1rem' }}>
                                {days.map(d => <div key={d} style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{d}</div>)}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                                {[12, 13, 14, 15, 16, 17].map((date, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedDate(date)}
                                        style={{
                                            aspectRatio: '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            backgroundColor: selectedDate === date ? 'var(--color-vogue-red)' : 'transparent',
                                            color: selectedDate === date ? 'var(--color-white)' : 'var(--text-primary)',
                                            fontWeight: selectedDate === date ? 600 : 400
                                        }}
                                    >
                                        {date}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Heure Disponible</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                            {timeSlots.map(time => (
                                <div
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    style={{
                                        padding: '0.75rem 0',
                                        textAlign: 'center',
                                        border: `1px solid ${selectedTime === time ? 'var(--color-vogue-red)' : 'var(--border-color)'}`,
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        backgroundColor: selectedTime === time ? 'var(--color-vogue-red)' : 'transparent',
                                        color: selectedTime === time ? 'var(--color-white)' : 'inherit',
                                        fontWeight: 600
                                    }}
                                >{time}</div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', opacity: (selectedDate && selectedTime) ? 1 : 0.5 }}
                            disabled={!(selectedDate && selectedTime)}
                            onClick={() => {
                                if (!user) {
                                    alert('Veuillez vous connecter pour continuer.');
                                    navigate('/register');
                                } else {
                                    setStep(3);
                                }
                            }}
                        >
                            Voir le Récapitulatif
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '1.5rem' }} onClick={() => setStep(2)}>
                            <ChevronLeft size={20} /> <span style={{ fontWeight: 600 }}>Retour</span>
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Confirmation</h2>

                        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Service</span>
                                <span style={{ fontWeight: 600 }}>{selectedService?.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Date</span>
                                <span style={{ fontWeight: 600 }}>Jeudi {selectedDate} Nov 2026 à {selectedTime}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                                <span style={{ fontWeight: 700 }}>Total</span>
                                <span style={{ fontWeight: 700, color: 'var(--color-vogue-red)' }}>{selectedService?.price}</span>
                            </div>
                        </div>

                        {error && (
                            <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#ffebee', color: 'var(--color-vogue-red)', border: '1px solid var(--color-vogue-red)', borderRadius: '4px', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        {success ? (
                            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#e8f5e9', border: '1px solid #4caf50', borderRadius: '12px' }}>
                                <h3 style={{ color: '#2e7d32', marginBottom: '1rem', fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>Rendez-vous Confirmé !</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Un email de confirmation a été envoyé à {user?.email}.</p>
                                <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/')}>Retour à l'accueil</button>
                            </div>
                        ) : (
                            <>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}
                                    onClick={handleConfirmBooking}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Confirmation en cours...' : 'Confirmer la Réservation'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                    <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Annuler</Link>
                                </div>
                            </>
                        )}
                    </div>
                )}

            </main>
        </div>
    );
}
