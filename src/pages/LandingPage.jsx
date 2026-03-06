import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function LandingPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navigation />

            {/* Hero Section */}
            <section style={{
                flexGrow: 1,
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '3rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Subtle background element mimicking the Stitch mockup image */}
                <div style={{
                    position: 'absolute',
                    top: 0, right: 0, bottom: 0, left: 0,
                    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.5,
                    zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '2px'
                    }}>Vogue Beauty<br />Nail Bar</h1>
                    <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.1rem',
                        marginBottom: '3rem',
                        opacity: 0.9,
                        fontWeight: 300
                    }}>
                        L'élégance à fleur de peau.<br />Découvrez nos soins sur-mesure.
                    </p>

                    <Link to="/booking" className="btn btn-primary" style={{ width: '100%', maxWidth: '300px' }}>
                        Prendre Rendez-vous
                    </Link>
                </div>
            </section>

            {/* Services Section */}
            <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>Nos Services</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                    {[
                        { title: 'Pédicure & Manucure', desc: 'Soin complet des ongles, vernis classique ou semi-permanent.' },
                        { title: 'Soins du Corps', desc: 'Gommages et enveloppements pour une peau soyeuse.' },
                        { title: 'Massages Relaxants', desc: 'Détente absolue avec huiles essentielles premium.' }
                    ].map((service, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            padding: '2rem',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '12px',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                width: '4px',
                                backgroundColor: 'var(--color-vogue-red)',
                                marginRight: '1.5rem',
                                borderRadius: '4px'
                            }}></div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{service.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/registration" style={{ color: 'var(--color-vogue-red)', fontWeight: 600, textDecoration: 'underline' }}>
                        Créer un compte client
                    </Link>
                </div>
            </section>
        </div>
    );
}
