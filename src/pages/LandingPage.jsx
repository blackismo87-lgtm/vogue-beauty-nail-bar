import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import heroImg1 from '../assets/images/hero/hero-1.jpg';
import heroImg2 from '../assets/images/hero/hero-2.jpg';
import heroImg3 from '../assets/images/hero/hero-3.jpg';
import heroImg4 from '../assets/images/hero/hero-4.jpg';
import heroImg5 from '../assets/images/hero/hero-5.jpg';
import manicureImg from '../assets/images/manicure.png';
import pedicureImg from '../assets/images/pedicure.png';
import facialImg from '../assets/images/facial.png';
import massageImg from '../assets/images/massage.png';

const HERO_IMAGES = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

const SERVICES = [
    {
        id: 1,
        title: 'Manucure Orientale',
        description: "Soin traditionnel et pose de vernis.",
        image: manicureImg,
        price: '7.500 F'
    },
    {
        id: 2,
        title: 'Pédicure Zen',
        description: "Beauté des pieds et massage relaxant.",
        image: pedicureImg,
        price: '12.000 F'
    },
    {
        id: 3,
        title: 'Soin Visage Complet',
        description: "Éclat instantané et hydratation profonde.",
        image: facialImg,
        price: '20.000 F'
    },
    {
        id: 4,
        title: 'Massage Relaxant',
        description: "Une évasion sensorielle totale.",
        image: massageImg,
        price: '20.000 F'
    },
];

export default function LandingPage() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Navigation />

            <main className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
                {/* Hero Section with Cross-fade Carousel */}
                <section style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#000' }}>
                    {HERO_IMAGES.map((img, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${img})`,
                                opacity: currentImageIndex === index ? 1 : 0,
                                transition: 'opacity 1.5s ease-in-out',
                                zIndex: currentImageIndex === index ? 1 : 0
                            }}
                        ></div>
                    ))}

                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        zIndex: 10
                    }}>
                        <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Vogue Beauty</h2>
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
                <section style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="label-mini">Prestations</p>
                        <h3 style={{ fontSize: '1.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nos Services Exclusifs</h3>
                    </div>

                    <div className="responsive-grid">
                        {SERVICES.map((service) => (
                            <div key={service.id} className="vogue-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                                    <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.125rem', fontStyle: 'normal', margin: 0 }}>{service.title}</h3>
                                        <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--color-primary)' }}>{service.price}</span>
                                    </div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Location Section */}
                <section style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-white)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="label-mini" style={{ color: 'var(--color-primary-pink)' }}>Nous trouver</p>
                        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Vogue Sotuba</h2>
                    </div>

                    <div className="responsive-grid">
                        <div className="vogue-card" style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary-pink)', marginBottom: '1rem' }}>location_on</span>
                            <h3 style={{ marginBottom: '0.5rem', fontStyle: 'normal' }}>Adresse</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Sotuba ACI, à 200m du<br />Restaurant Venus, Bamako</p>
                        </div>

                        <div className="vogue-card" style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary-pink)', marginBottom: '1rem' }}>schedule</span>
                            <h3 style={{ marginBottom: '0.5rem', fontStyle: 'normal' }}>Horaires</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Lun - Sam : 10h - 20h<br />Dimanche : Fermé</p>
                        </div>

                        <div className="vogue-card" style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary-pink)', marginBottom: '1rem' }}>call</span>
                            <h3 style={{ marginBottom: '0.5rem', fontStyle: 'normal' }}>Contact</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>+223 79 28 28 00<br />@vogue_beauty_bar</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
