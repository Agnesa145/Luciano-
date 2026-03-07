export default function CartDrawer({ isOpen, onClose, cart, setCart }) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const updateQty = (id, size, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id && item.selectedSize === size) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id, size) => {
        setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
    };

    return (
        <>
            <div className={`l-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>SHPORTA JUAJ</h3>
                    <button className="l-close" onClick={onClose}>✕</button>
                </div>

                <div className="cart-body">
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '100px', opacity: 0.5 }}>
                            <p>Shporta juaj është e zbrazët.</p>
                            <button className="btn-hero-outline" onClick={onClose} style={{ marginTop: '20px' }}>Vazhdo Blerjen</button>
                        </div>
                    ) : (
                        cart.map((item, i) => (
                            <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-info">
                                    <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>{item.name}</h4>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Masa: {item.selectedSize} | Ngjyra: {item.selectedColor}</p>
                                    <div className="cart-item-price">{item.price.toLocaleString()}€</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '100px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '5px 10px' }}>
                                            <button onClick={() => updateQty(item.id, item.selectedSize, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, item.selectedSize, 1)}>+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id, item.selectedSize)} style={{ fontSize: '0.7rem', color: '#ff3c4a' }}>Hiqe</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="l-footer" style={{ borderTop: '1px solid var(--border-dim)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <span style={{ letterSpacing: '2px' }}>TOTALI</span>
                            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.4rem' }}>{total.toLocaleString()}€</span>
                        </div>
                        <button className="btn-hero-fill" style={{ width: '100%' }}>Vazhdo te Pagesa</button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .cart-drawer {
                    position: fixed; top: 0; right: 0; bottom: 0; width: 450px;
                    background: #080808; border-left: 1px solid var(--border-dim);
                    z-index: 2000; transform: translateX(100%); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex; flex-direction: column;
                    box-shadow: -30px 0 60px rgba(0,0,0,0.8);
                }
                .cart-drawer.open { transform: translateX(0); }
                .cart-header { padding: 35px; border-bottom: 1px solid var(--border-dim); display:flex; justify-content: space-between; align-items: center; }
                .cart-body { flex: 1; overflow-y: auto; padding: 35px; }
                .cart-item { display: flex; gap: 20px; margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.03); }
                .cart-item img { width: 90px; height: 120px; object-fit: cover; }
                .cart-item-info { flex: 1; position: relative; }
                .cart-item-price { color: var(--primary); font-weight: 700; font-size: 1.1rem; margin-top: 10px; }
            `}</style>
        </>
    );
}
