import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { insforge } from '../lib/insforge';
import manicureImg from '../assets/images/manicure.png';
import pedicureImg from '../assets/images/pedicure.png';
import facialImg from '../assets/images/facial.png';
import massageImg from '../assets/images/massage.png';

const SERVICES = [
    { id: 1, name: 'Manucure Orientale', price: 7500, duration: '45 min', image: manicureImg },
    { id: 2, name: 'Pédicure Zen', price: 12000, duration: '60 min', image: pedicureImg },
    { id: 3, name: 'Soin Visage Complet', price: 20000, duration: '60 min', image: facialImg },
    { id: 4, name: 'Massage Relaxant', price: 20000, duration: '60 min', image: massageImg },
    { id: 5, name: 'Gommage Clarifiant', price: 15000, duration: '45 min', image: massageImg },
    { id: 6, name: 'Vernis Permanent', price: 10000, duration: '30 min', image: manicureImg }
];

const TIME_SLOTS = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
];

export default function BookingPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [weekOffset, setWeekOffset] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    });

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await insforge.auth.getCurrentSession();
            if (data?.session?.user) {
                setUser(data.session.user);
            }
        };
        checkSession();
    }, []);

    // Use current week for the calendar as per mockup "Vogue Beauty Flow"
    const calendarDays = useMemo(() => {
        const days = [];
        const today = new Date();
        // Today at 00:00:00
        today.setHours(0, 0, 0, 0);

        // Find the start of the current week (let's say Monday) or just start from today
        // For simple "7 days at a time" flow, we use today + (weekOffset * 7)
        const startDay = new Date(today);
        startDay.setDate(today.getDate() + (weekOffset * 7));

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDay);
            date.setDate(startDay.getDate() + i);
            days.push(date);
        }
        return days;
    }, [weekOffset]);

    const handleCreateBooking = async () => {
        if (!user) {
            navigate('/register');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Optionnel: On peut toujours sauvegarder en BDD si on veut garder une trace interne
            await insforge.database
                .from('appointments')
                .insert([
                    {
                        user_name: `${formData.firstName} ${formData.lastName}`,
                        user_phone: formData.phone,
                        service_name: selectedService.name,
                        service_price: selectedService.price,
                        appointment_date: selectedDate.toISOString().split('T')[0],
                        appointment_time: selectedTime,
                        status: 'pending'
                    }
                ]);

            const message = `Bonjour Vogue Beauty, je souhaite réserver une prestation :
📌 *${selectedService.name}*
📅 Date : ${selectedDate.toLocaleDateString('fr-FR')}
🕒 Heure : ${selectedTime}
👤 Client : ${formData.firstName} ${formData.lastName}
📞 Tél : ${formData.phone}`;

            const whatsappUrl = `https://wa.me/22379282800?text=${encodeURIComponent(message)}`;
            window.location.href = whatsappUrl;
            setSuccess(true);
        } catch (err) {
            setError("Une erreur est survenue. Vous pouvez quand même nous contacter sur WhatsApp.");
            // Redirection même en cas d'erreur BDD pour ne pas bloquer l'utilisateur
            const message = `Bonjour, je souhaite réserver : ${selectedService.name} le ${selectedDate.toLocaleDateString('fr-FR')} à ${selectedTime}. Client: ${formData.firstName} ${formData.lastName}, Tél: ${formData.phone}`;
            window.location.href = `https://wa.me/22379282800?text=${encodeURIComponent(message)}`;
        } finally {
            setLoading(false);
        }
    };

    const steps = ['Services', 'Date & Heure', 'Confirmation'];

    if (success) {
        return (
            <>
                <Navigation />
                <main className="animate-fade-in" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '80px', color: '#16a34a', marginBottom: '2rem' }}>check_circle</span>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Réservation Confirmée</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                        Merci pour votre confiance. Vous recevrez un e-mail de confirmation sous peu.
                    </p>
                    <button onClick={() => navigate('/appointments')} className="btn btn-primary" style={{ width: '100%', maxWidth: '300px' }}>
                        Voir mes rendez-vous
                    </button>
                </main>
            </>
        );
    }

    return (
        <>
            <Navigation />

            <main className="animate-fade-in" style={{ padding: '1.5rem', paddingBottom: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: '800px' }}>
                    {/* Step Indicator */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', marginTop: '1rem' }}>
                        {steps.map((label, idx) => (
                            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
                                <div style={{
                                    width: '0.5rem',
                                    height: '0.5rem',
                                    borderRadius: '50%',
                                    backgroundColor: step > idx ? 'var(--color-primary)' : 'var(--border-color)',
                                    marginBottom: '0.75rem',
                                    zIndex: 2
                                }}></div>
                                <span style={{
                                    fontSize: '0.625rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    fontWeight: step === idx + 1 ? 800 : 400,
                                    color: step === idx + 1 ? 'var(--text-primary)' : 'var(--text-muted)'
                                }}>
                                    {label}
                                </span>
                                {idx < steps.length - 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '0.2rem',
                                        left: '50%',
                                        width: '100%',
                                        height: '1px',
                                        backgroundColor: 'var(--border-color)',
                                        zIndex: 1
                                    }}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Contents */}
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>Quelle prestation désirez-vous ?</h2>
                            <div className="responsive-grid">
                                {SERVICES.map((s) => (
                                    <div
                                        key={s.id}
                                        onClick={() => setSelectedService(s)}
                                        style={{
                                            padding: '1.5rem',
                                            borderRadius: '1rem',
                                            border: selectedService?.id === s.id ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                                            backgroundColor: selectedService?.id === s.id ? 'rgba(236, 19, 19, 0.03)' : 'var(--bg-card)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1.25rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <div style={{ width: '80px', height: '80px', borderRadius: '0.75rem', overflow: 'hidden', flexShrink: 0 }}>
                                            <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{s.name}</h3>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.duration}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontWeight: 800, fontSize: '1.125rem' }}>{s.price.toLocaleString()} F</p>
                                            {selectedService?.id === s.id && <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>check_circle</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>Sélectionnez un créneau</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                                {/* Minimal Calendar */}
                                <div style={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderRadius: '1.5rem',
                                    padding: '1.5rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <span
                                            className="material-symbols-outlined"
                                            onClick={() => weekOffset > 0 && setWeekOffset(weekOffset - 1)}
                                            style={{
                                                cursor: weekOffset > 0 ? 'pointer' : 'not-allowed',
                                                opacity: weekOffset > 0 ? 1 : 0.2,
                                                padding: '0.5rem'
                                            }}
                                        >
                                            chevron_left
                                        </span>
                                        <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {calendarDays[0].toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                        </span>
                                        <span
                                            className="material-symbols-outlined"
                                            onClick={() => setWeekOffset(weekOffset + 1)}
                                            style={{ cursor: 'pointer', padding: '0.5rem' }}
                                        >
                                            chevron_right
                                        </span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                                        {calendarDays.map((d) => {
                                            const isSelected = selectedDate?.toDateString() === d.toDateString();
                                            return (
                                                <div
                                                    key={d.toISOString()}
                                                    onClick={() => setSelectedDate(d)}
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        padding: '0.75rem 0',
                                                        borderRadius: '1rem',
                                                        cursor: 'pointer',
                                                        backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                                                        color: isSelected ? 'white' : 'inherit',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '0.625rem', opacity: 0.6, marginBottom: '0.25rem' }}>
                                                        {d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}
                                                    </span>
                                                    <span style={{ fontWeight: 700 }}>{d.getDate()}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                    {TIME_SLOTS.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedTime(t)}
                                            style={{
                                                padding: '1rem 0',
                                                borderRadius: '0.75rem',
                                                border: selectedTime === t ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                                                backgroundColor: selectedTime === t ? 'rgba(236, 19, 19, 0.05)' : 'transparent',
                                                color: selectedTime === t ? 'var(--color-primary)' : 'inherit',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                            <div className="vogue-card" style={{ padding: '2rem', textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Vos Coordonnées</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <label className="label-mini">Prénom</label>
                                        <input
                                            type="text"
                                            className="editorial-input"
                                            placeholder="Ex: Awa"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="label-mini">Nom</label>
                                        <input
                                            type="text"
                                            className="editorial-input"
                                            placeholder="Ex: Diarra"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="label-mini">Numéro de Téléphone</label>
                                        <input
                                            type="tel"
                                            className="editorial-input"
                                            placeholder="Ex: +223 00 00 00 00"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                                    <p className="label-mini">Récapitulatif</p>
                                    <p style={{ fontWeight: 700 }}>{selectedService.name} - {selectedService.price.toLocaleString()} F</p>
                                    <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Le {selectedDate.toLocaleDateString('fr-FR')} à {selectedTime}</p>
                                </div>
                            </div>
                            {error && <p style={{ color: 'var(--color-primary)', marginTop: '1rem', fontSize: '0.875rem' }}>{error}</p>}
                        </div>
                    )}
                </div>

                {/* Mockup Bottom Summary Bar */}
                {selectedService && (
                    <div style={{
                        position: 'fixed',
                        bottom: '90px', // Adjusted for bottom nav
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'calc(100% - 2rem)',
                        maxWidth: '500px',
                        backgroundColor: 'var(--color-bg-dark)',
                        color: 'white',
                        borderRadius: '1.25rem',
                        padding: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        zIndex: 100
                    }}>
                        <div>
                            <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '0.1em' }}>Récapitulatif</p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 800, fontSize: '1.125rem' }}>{selectedService.price.toLocaleString()} F</span>
                                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>/ {selectedService.name}</span>
                            </div>
                        </div>

                        {step < 3 ? (
                            <button
                                disabled={(step === 2 && (!selectedDate || !selectedTime))}
                                onClick={() => setStep(step + 1)}
                                className="btn btn-primary"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    opacity: (step === 2 && (!selectedDate || !selectedTime)) ? 0.5 : 1
                                }}
                            >
                                Continuer <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_forward</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleCreateBooking}
                                disabled={loading || !formData.firstName || !formData.phone}
                                className="btn btn-primary"
                                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', opacity: (loading || !formData.firstName || !formData.phone) ? 0.5 : 1 }}
                            >
                                {loading ? 'Envoi...' : 'Confirmer sur WhatsApp'}
                            </button>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}
