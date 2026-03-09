import React from 'react';
import Navigation from '../components/Navigation';

const products = [
    {
        id: 1,
        name: "Huile de Cuticule Premium",
        price: 15.50,
        image: "https://images.unsplash.com/photo-1607908422203-5183495d0360?auto=format&fit=crop&q=80&w=400",
        description: "Nourrit et hydrate vos cuticules pour des mains parfaites."
    },
    {
        id: 2,
        name: "Vernis Gel Éclat Solaire",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1634712282287-14ee571d4467?auto=format&fit=crop&q=80&w=400",
        description: "Une brillance intense qui dure jusqu'à 3 semaines."
    },
    {
        id: 3,
        name: "Kit de Soin Complet Mains",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400",
        description: "Tout ce dont vous avez besoin pour un soin professionnel à domicile."
    },
    {
        id: 4,
        name: "Crème Hydratante Karité",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400",
        description: "Enrichie au beurre de karité bio pour une douceur infinie."
    }
];

export default function ShopPage() {
    return (
        <div className="page-container">
            <Navigation />

            <main style={{ padding: '2rem 1rem' }}>
                <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Notre Boutique</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Découvrez nos produits de soin exclusifs</p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {products.map(product => (
                        <div key={product.id} className="glass-panel" style={{
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>

                            <div style={{
                                width: '100%',
                                aspectRatio: '1/1',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                backgroundColor: 'rgba(255,255,255,0.05)'
                            }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{product.name}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                    {product.description}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                        {product.price.toFixed(2)}€
                                    </span>
                                    <button className="button-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
