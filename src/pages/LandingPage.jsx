import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const SERVICES = [
    {
        id: 1,
        title: 'Pédicure & Manucure',
        description: "L'art de l'onglerie française",
        icon: 'fluid_med'
    },
    {
        id: 2,
        title: 'Soins du Corps',
        description: "Révélez votre éclat naturel",
        icon: 'spa'
    },
    {
        id: 3,
        title: 'Massages Relaxants',
        description: "Une évasion sensorielle totale",
        icon: 'self_care'
    },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
            <Navigation />

            <main className="animate-fade-in">
                {/* Hero Section */}
                <section style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCg3Wi7fgmHkxW490aUWkzZZLpbJFtmPHUawGb3t3W_CCSnL38EaRDGJqWBt95KVPWE-TK9308ihw97XOqdCRAbyjpq_gl_DU83yGK3-Hk4Ahtjq9jxLsfA8xzxRyr1sqoh7t93MRfBv0T_5cGzmHt1sCwqfRU15cwJBEqjimQwyyWAvMrC_valccZIPbgvWP4CXuSI8Ckcf4wqHV-f85uu2Xut-v8bLVP2J3YZ94aGdLvCsLm13GrRgxqMabgXBkOXXA_Pg3_vasI')`
                    }}></div>

                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '0.5rem' }}>Vogue Beauty</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', marginBottom: '2rem' }}>
                            Nail Bar & Spa
                        </p>
                        <button
                            onClick={() => navigate('/booking')}
                            className="btn btn-primary"
                            style={{ width: '100%', maxWidth: '300px' }}
                        >
                            Prendre Rendez-vous
                        </button>
                    </div>
                </section>

                {/* Services Section */}
                <section style={{ padding: '3rem 1.5rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontStyle: 'normal' }}>Nos Services Exclusifs</h3>
                        <div style={{ height: '4px', width: '48px', backgroundColor: 'var(--color-primary)', margin: '0.5rem auto 0' }}></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {SERVICES.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => navigate('/booking')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid var(--border-color)',
                                    paddingBottom: '1.5rem'
                                }}
                            >
                                <div>
                                    <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '-0.01em', fontStyle: 'normal' }}>
                                        {service.title}
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{service.description}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '1.875rem' }}>
                                        {service.icon}
                                    </span>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--text-muted)' }}>
                                        chevron_right
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Location Section */}
                <section style={{ padding: '2rem 1.5rem', backgroundColor: 'rgba(236, 19, 19, 0.03)' }}>
                    <div style={{ borderRadius: '1rem', overflow: 'hidden', height: '12rem', marginBottom: '1rem', position: 'relative' }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBua9HdFZuIO3lscSSdx8pIA69Ug9wKIkcgUoQVk-9qpyEtywu-j7hqskhHINg0FMOm-J_Mi3hzdrhlDGe8wYNDVu3StuZxs6Rm8-6wS4Lii8AMiJtwR-tlPpvxC5kpFxfJVEWjHQeXAW9n28U9_C8PlSfKmu3I4J5aLy383QQHIDIR9QsWcOQPnTzNphttlY7goEl2tIBFC9OhZabLZOcXXu1mOYPJvmEE3Fg2gonmiMghzBt00F-uWOBVEor0XiqWXa7cquYfg2A')`
                        }}></div>
                    </div>

                    <p style={{ fontWeight: 800, marginBottom: '0.25rem' }}>Vogue Beauty Paris</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>12 Avenue Montaigne, 75008 Paris</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn" style={{ flex: 1, border: '1px solid var(--border-color)', color: 'var(--color-primary)', padding: '0.5rem' }}>Itinéraire</button>
                        <button className="btn" style={{ flex: 1, border: '1px solid var(--border-color)', color: 'var(--color-primary)', padding: '0.5rem' }}>Appeler</button>
                    </div>
                </section>
            </main>
        </>
    );
}

