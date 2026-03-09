import React from 'react';
import Navigation from '../components/Navigation';

const promotions = [
    {
        id: 1,
        title: "Offre de Bienvenue",
        discount: "-20%",
        description: "Sur votre première manucure complète. Profitez-en dès aujourd'hui !",
        validUntil: "31 Mars 2026"
    },
    {
        id: 2,
        title: "Duo Mains & Pieds",
        discount: "15.000 F",
        description: "Au lieu de 19.500 F. Une pause détente totale pour vos extrémités.",
        validUntil: "Offre permanente"
    },
    {
        id: 3,
        title: "Happy Hours",
        discount: "-10%",
        description: "Tous les mardis et jeudis de 10h à 14h sur tous les soins visages.",
        validUntil: "Saison d'Hiver"
    }
];

const testimonials = [
    {
        id: 1,
        name: "Awa Diarra",
        comment: "Le meilleur bar à ongles de Bamako ! L'accueil est chaleureux et le travail est d'une précision incroyable.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150"
    },
    {
        id: 2,
        name: "Fatoumata Keita",
        comment: "Mes ongles n'ont jamais été aussi beaux. La tenue du gel est parfaite, même après 3 semaines.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=150"
    },
    {
        id: 3,
        name: "Mariam Traoré",
        comment: "Un moment de pure détente. Le massage lors de la pédicure est un vrai plus. Je recommande à 100% !",
        rating: 4,
        avatar: "https://images.unsplash.com/photo-1509270114004-94ec906042db?auto=format&fit=crop&q=80&w=150"
    }
];

export default function PromotionPage() {
    return (
        <div className="page-container">
            <Navigation />

            <main style={{ padding: '2rem 1.5rem' }}>
                {/* Promotions Header */}
                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <p className="label-mini">Offres Spéciales</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontStyle: 'italic' }}>Nos Promotions</h2>
                    <div style={{ width: '60px', hieght: '2px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
                </header>

                {/* Promotions Grid */}
                <div className="responsive-grid" style={{ marginBottom: '5rem' }}>
                    {promotions.map(promo => (
                        <div key={promo.id} className="glass-panel" style={{
                            padding: '2rem',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            border: '1px solid var(--color-primary)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '-30px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                padding: '5px 40px',
                                transform: 'rotate(45deg)',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>OFFRE</div>

                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{promo.title}</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)' }}>{promo.discount}</div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{promo.description}</p>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 'auto', opacity: 0.6 }}>
                                Valable jusqu'au {promo.validUntil}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Section */}
                <section>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="label-mini">Témoignages</p>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Elles nous font confiance</h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="vogue-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    margin: '0 auto 1.5rem',
                                    overflow: 'hidden',
                                    border: '3px solid var(--color-primary)'
                                }}>
                                    <img src={testimonial.avatar} alt={testimonial.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1rem' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined" style={{
                                            fontSize: '18px',
                                            color: i < testimonial.rating ? '#FFD700' : '#ccc'
                                        }}>star</span>
                                    ))}
                                </div>
                                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>"{testimonial.comment}"</p>
                                <h4 style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>{testimonial.name}</h4>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
