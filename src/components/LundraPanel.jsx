import { useState, useRef, useEffect } from 'react';
import lundra from '../engine/lundra';

export default function LundraPanel({ isOpen, onClose, onProductClick }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);
    const inputRef = useRef(null);

    const [thinkingStep, setThinkingStep] = useState(0);
    const steps = [
        "Duke analizuar nuancat e kërkesës...",
        "Duke shqyrtuar katalogun Luciano...",
        "Duke filtruar sipas kritereve tuaja...",
        "Duke përgatitur rekomandimin personal..."
    ];

    const [showSystemInfo, setShowSystemInfo] = useState(false);

    useEffect(() => {
        let interval;
        if (loading) {
            setThinkingStep(0);
            interval = setInterval(() => {
                setThinkingStep(prev => (prev + 1) % steps.length);
            }, 600);
        }
        return () => clearInterval(interval);
    }, [loading]);

    // Initial greeting & focus
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            handleSend('Përshëndetje', true);
        }
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Auto-scroll
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleSend = async (text, silent = false) => {
        const txt = (text || input).trim();
        if (!txt || loading) return;

        if (!silent) {
            setMessages(prev => [...prev, { role: 'user', content: txt, timestamp: new Date() }]);
            setInput('');
        }

        setLoading(true);

        // Add a slight delay for that "AI thinking/analysing" feel
        const delay = silent ? 0 : 2500; // Longer delay to show thinking steps

        try {
            const response = text
                ? await lundra.triggerTopic(text)
                : await lundra.processMessage(txt);

            await new Promise(r => setTimeout(r, delay));
            setMessages(prev => [...prev, response]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'agent',
                message: 'Ndjesë, modeli ka një ngarkesë të lartë. Provoni një kërkesë tjetër.',
                timestamp: new Date()
            }]);
        }
        setLoading(false);
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            <div className={`l-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
            <div className={`l-panel ${isOpen ? 'open' : ''}`}>

                {/* Header */}
                <div className="l-header glass-card">
                    <div className="l-agent-info">
                        <div className="l-avatar">
                            <div className="avatar-pulse"></div>
                            <span>L</span>
                        </div>
                        <div>
                            <h3>LUNDRA</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span className="l-subtitle">AI LUXURY STYLIST</span>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50' }}></div>
                            </div>
                        </div>
                    </div>
                    <button className="l-nav-btn" onClick={onClose} style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>✕</button>
                </div>

                {/* Chat Body */}
                <div className="l-body">
                    {messages.length === 0 && !loading && (
                        <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5 }}>
                            <p className="serif" style={{ fontSize: '1.4rem' }}>Mirësevini në Luciano Digital Atelier</p>
                            <p style={{ fontSize: '0.8rem', letterSpacing: '2px', marginTop: '10px' }}>PYETNI LUNDRËN PËR TË FILLUAR</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`l-msg-row ${msg.role}`}>
                            <div className="l-bubble">
                                {msg.badge && <div className="l-msg-badge">{msg.badge}</div>}
                                <div className="l-text" style={{ whiteSpace: 'pre-wrap' }}>
                                    {msg.message || msg.content}
                                </div>

                                {msg.products && msg.products.length > 0 && (
                                    <div className="l-product-list">
                                        <p style={{ fontSize: '0.7rem', letterSpacing: '1px', color: 'var(--accent-primary)', marginBottom: '10px' }}>REKOMANDIMET E LUNDRËS:</p>
                                        {msg.products.map(p => (
                                            <div key={p.id} className="l-product-item" onClick={() => onProductClick(p)}>
                                                <img src={p.image} alt={p.name} />
                                                <div className="l-p-details">
                                                    <span className="l-p-name">{p.name}</span>
                                                    <span className="l-p-price">{p.price.toLocaleString()}€</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {msg.suggestions && msg.suggestions.length > 0 && (
                                    <div className="l-suggestions" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {msg.suggestions.map((s, idx) => (
                                            <button key={idx} onClick={() => handleSend(s)} className="l-sug-btn" style={{
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                padding: '8px 15px',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                color: 'var(--text-muted)'
                                            }}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="l-msg-row agent">
                            <div className="l-bubble" style={{ background: 'transparent', border: 'none' }}>
                                <div className="loading">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                                <p style={{ fontSize: '0.7rem', marginTop: '15px', letterSpacing: '2px', color: 'var(--accent-primary)', transition: 'all 0.3s' }}>
                                    {steps[thinkingStep]}
                                </p>
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>

                {/* Footer */}
                <div className="l-footer">
                    <div className="l-input-area">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Shkruani një kërkesë ose përshëndetje..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                        />
                        <button className="l-send" onClick={() => handleSend()}>➤</button>
                    </div>
                    <p style={{ fontSize: '0.6rem', textAlign: 'center', marginTop: '15px', opacity: 0.3, letterSpacing: '1px' }}>
                        LUNDRA AI — MBËSHTETUR NGA LUCIANO DATA ENGINE
                    </p>
                </div>
            </div>
        </>
    );
}