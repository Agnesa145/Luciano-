import { useState, useEffect } from 'react';

export default function ProductModal({ product, onClose, onAddToCart, onToggleWishlist, isWished }) {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Reset selections when product changes
        setSelectedSize(product.sizes?.[0] || '');
        setSelectedColor(product.colors?.[0] || '');
    }, [product]);

    const getModifiedPrice = (basePrice, size) => {
        const s = size?.toUpperCase();
        if (s === 'XS') return basePrice * 0.95;
        if (s === 'L') return basePrice * 1.1;
        if (s === 'XL') return basePrice * 1.20;
        if (s === 'XXL') return basePrice * 1.35;
        return basePrice;
    };

    const currentPrice = getModifiedPrice(product.price, selectedSize);

    const handleCart = () => {
        onAddToCart({
            ...product,
            price: currentPrice, // Dërgojmë çmimin e modifikuar
            selectedSize,
            selectedColor
        });
        onClose();
    };

    const catLabels = {
        evening: '🌙 Mbrëmje',
        summer: '☀️ Verë',
        formal: '🎩 Formale',
        casual: '🧥 Casual',
        accessories: '💎 Aksesorë',
        shoes: '👠 Këpucë'
    };

    return (
        <div className={`modal-backdrop ${isVisible ? 'visible' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {/* Image Side */}
                <div className="modal-image-side">
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&q=80'; }}
                    />
                    <button className="modal-close-icon" onClick={onClose}>✕</button>
                    <div className="modal-badges">
                        {product.isNew && <span className="m-badge m-badge-gold">✦ I Ri</span>}
                        {product.isBestseller && <span className="m-badge m-badge-white">☆ Bestseller</span>}
                    </div>
                </div>

                {/* Info Side */}
                <div className="modal-info-side">
                    <div className="m-cat-tag">{catLabels[product.category] || product.category}</div>
                    <h2 className="m-title">{product.name}</h2>
                    <div className="m-price-row">
                        <div className="m-price-group">
                            <span className="m-price">{Math.round(currentPrice).toLocaleString()}€</span>
                            {selectedSize && selectedSize !== 'S' && selectedSize !== 'M' && (
                                <small className="m-price-notice">Çmimi për masën {selectedSize}</small>
                            )}
                        </div>
                        <div className="m-rating">
                            {'★'.repeat(Math.floor(product.rating))}
                            <small>({product.reviews} komente)</small>
                        </div>
                    </div>

                    <p className="m-desc">{product.description}</p>


                    {/* Sizes */}
                    {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'Uni' && (
                        <div className="m-option-group">
                            <label>📏 Madhësia</label>
                            <div className="m-chips">
                                {product.sizes.map(s => (
                                    <button
                                        key={s}
                                        className={`m-chip ${selectedSize === s ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(s)}
                                    >{s}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="m-option-group">
                            <label>🎨 Ngjyra</label>
                            <div className="m-chips">
                                {product.colors.map(c => (
                                    <button
                                        key={c}
                                        className={`m-chip ${selectedColor === c ? 'active' : ''}`}
                                        onClick={() => setSelectedColor(c)}
                                    >{c}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="m-details">
                        <div className="m-detail-item">
                            <span className="m-detail-label">Materiali:</span>
                            <span className="m-detail-val">{product.material}</span>
                        </div>
                        <div className="m-detail-item">
                            <span className="m-detail-label">Koleksioni:</span>
                            <span className="m-detail-val">{product.collection ? product.collection.replace('-', ' ').toUpperCase() : 'Essential'}</span>
                        </div>
                        <div className="m-detail-item">
                            <span className="m-detail-label">Disponueshmëria:</span>
                            <span className="m-detail-val" style={{ color: '#27ae60' }}>Në magazinë</span>
                        </div>
                    </div>

                    <div className="m-actions">
                        <button className="btn-modal-cart" onClick={handleCart}>
                            🛒 Shto në Shportë
                        </button>
                        <button
                            className={`btn-modal-wish ${isWished ? 'active' : ''}`}
                            onClick={() => onToggleWishlist(product)}
                        >
                            {isWished ? '❤️ Në Wishlist' : '🤍 Shto në Wishlist'}
                        </button>
                    </div>

                    <div className="m-footer-info">
                        <span>📦 Dërgim Falas mbi 500€</span>
                        <span>🔄 30 Ditë Kthim</span>
                        <span>🛡️ 2 Vite Garanci</span>
                    </div>
                </div>
            </div>


        </div>
    );
}
