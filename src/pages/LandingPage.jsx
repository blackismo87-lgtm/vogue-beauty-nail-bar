import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const SERVICES = [
    {
        id: 1,
        title: 'Manucure Vogue',
        description: "Soin complet des mains et pose de vernis.",
        icon: 'spa',
        price: '45€'
    },
    {
        id: 2,
        title: 'Pédicure Royale',
        description: "Beauté des pieds et massage relaxant.",
        icon: 'content_cut',
        price: '55€'
    },
    {
        id: 3,
        title: 'Soin Visage',
        description: "Éclat instantané et hydratation profonde.",
        icon: 'face',
        price: '75€'
    },
    {
        id: 4,
        title: 'Massage Zen',
        description: "Une évasion sensorielle totale.",
        icon: 'physical_therapy',
        price: '90€'
    },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
            <Navigation />

            <main className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
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
                <section style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="label-mini">Prestations</p>
                        <h3 style={{ fontSize: '1.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nos Services Exclusifs</h3>
                    </div>

                    <div className="responsive-grid">
                        {SERVICES.map((service) => (
                            <div key={service.id} className="vogue-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary)' }}>{service.icon}</span>
                                    <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>{service.price}</span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem', fontStyle: 'normal' }}>{service.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Location Section */}
                <section style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-white)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="label-mini" style={{ color: 'var(--color-primary-pink)' }}>Nous trouver</p>
                        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Vogue Montaigne</h2>
                    </div>

                    <div className="responsive-grid">
                        <div className="vogue-card" style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary-pink)', marginBottom: '1rem' }}>location_on</span>
                            <h3 style={{ marginBottom: '0.5rem', fontStyle: 'normal' }}>Adresse</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>12 Avenue Montaigne<br />75008 Paris, France</p>
                        </div>

                        <div className="vogue-card" style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary-pink)', marginBottom: '1rem' }}>schedule</span>
                            <h3 style={{ marginBottom: '0.5rem', fontStyle: 'normal' }}>Horaires</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Lun - Sam : 10h - 20h<br />Dimanche : Fermé</p>
                        </div>

                        <div className="vogue-card" style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary-pink)', marginBottom: '1rem' }}>call</span>
                            <h3 style={{ marginBottom: '0.5rem', fontStyle: 'normal' }}>Contact</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>+33 1 23 45 67 89<br />contact@vogue-beauty.fr</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
