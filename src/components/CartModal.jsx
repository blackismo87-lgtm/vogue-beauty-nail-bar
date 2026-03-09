import React from 'react';
import { useCart } from './CartContext';

export default function CartModal({ isOpen, onClose }) {
    const { cartItems, removeFromCart, clearCart, cartCount } = useCart();
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        phone: ''
    });

    if (!isOpen) return null;

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <header style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Votre Panier ({cartCount})</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {cartItems.length === 0 ? (
                        <div style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '1rem' }}>shopping_basket</span>
                            <p>Votre panier est vide</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item-row">
                                <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p>{item.quantity} x {item.price.toFixed(2)}€</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' }}
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-total-section">
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Vos Coordonnées</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    type="text"
                                    className="editorial-input"
                                    placeholder="Prénom"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="editorial-input"
                                    placeholder="Nom"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                                <input
                                    type="tel"
                                    className="editorial-input"
                                    placeholder="Téléphone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <span style={{ fontWeight: 600 }}>Total</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{total.toLocaleString()} F</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', opacity: (!formData.firstName || !formData.phone) ? 0.5 : 1 }}
                                disabled={!formData.firstName || !formData.phone}
                                onClick={() => {
                                    const itemsList = cartItems.map(item => `- ${item.name} (x${item.quantity})`).join('\n');
                                    const message = `Bonjour Vogue Beauty, je souhaite commander les articles suivants :
${itemsList}
💰 Total : ${total.toLocaleString()} F
👤 Client : ${formData.firstName} ${formData.lastName}
📞 Tél : ${formData.phone}`;
                                    window.open(`https://wa.me/22369565497?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                            >
                                Commander sur WhatsApp
                            </button>
                            <button
                                onClick={clearCart}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer' }}
                            >
                                Vider le panier
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
