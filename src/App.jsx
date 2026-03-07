import { useState, useEffect } from 'react';
import { PRODUCTS, COLLECTIONS } from './data/products';
import LundraPanel from './components/LundraPanel';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLundraOpen, setIsLundraOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Filters & State for Shop
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const navTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addToast(`${product.name} u shtua në shportë!`);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        addToast('U hoq nga lista e dëshirave', 'info');
        return prev.filter(p => p.id !== product.id);
      }
      addToast('U shtua në listën e dëshirave');
      return [...prev, product];
    });
  };

  return (
    <div className="app-root">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => navTo('home')}>
            <h1>LUCIANO</h1>
          </div>

          <ul className="nav-links">
            <li><button className={currentPage === 'home' ? 'active' : ''} onClick={() => navTo('home')}>Ballina</button></li>
            <li><button className={currentPage === 'shop' ? 'active' : ''} onClick={() => navTo('shop')}>Dyqani</button></li>
            <li><button className={currentPage === 'collections' ? 'active' : ''} onClick={() => navTo('collections')}>Koleksionet</button></li>
            <li><button className={currentPage === 'about' ? 'active' : ''} onClick={() => navTo('about')}>Historia</button></li>
            <li><button className={currentPage === 'contact' ? 'active' : ''} onClick={() => navTo('contact')}>Kontakti</button></li>
          </ul>

          <div className="nav-actions">
            <button className="nav-icon-btn" aria-label="Kërko" onClick={() => navTo('shop')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button className="nav-icon-btn cart-btn" aria-label="Shporta" onClick={() => setIsCartOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main style={{ minHeight: '80vh', paddingTop: currentPage === 'home' ? '0' : '100px' }}>
        {currentPage === 'home' && <HomePage PRODUCTS={PRODUCTS} onView={setSelectedProduct} navigateTo={navTo} />}
        {currentPage === 'shop' && <ShopPage PRODUCTS={PRODUCTS} onView={setSelectedProduct} onWish={toggleWishlist} wishlist={wishlist} />}
        {currentPage === 'collections' && <CollectionsPage navigateTo={navTo} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>LUCIANO</h3>
              <p>Eleganca italiane që nga viti 1995. Artizanat i pastër për stilin tuaj unik.</p>
            </div>
            <div className="footer-links-group">
              <h4>KLIENTI</h4>
              <ul>
                <li><button>Lundra AI Stylist</button></li>
                <li><button>Dërgesat & Kthimet</button></li>
                <li><button>Udhëzuesi i Masave</button></li>
              </ul>
            </div>
            <div className="footer-links-group">
              <h4>KOMPANIA</h4>
              <ul>
                <li><button onClick={() => navTo('about')}>Historia Jonë</button></li>
                <li><button>Karriera</button></li>
                <li><button onClick={() => navTo('contact')}>Butiqet</button></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 LUCIANO Fashion House. Të gjitha të drejtat të rezervuara.</p>
            <div className="socials">Instagram • Facebook • LinkedIn</div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <LundraPanel isOpen={isLundraOpen} onClose={() => setIsLundraOpen(false)} onProductClick={setSelectedProduct} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWished={wishlist.some(p => p.id === selectedProduct.id)} />}

      <div className="toasts-container">
        {toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} />)}
      </div>

      <div className="lundra-fab" onClick={() => setIsLundraOpen(true)}>
        <div className="fab-inner">
          <span className="fab-label">PYET LUNDRËN</span>
          <div className="fab-avatar">✦</div>
        </div>
        <div className="fab-pulse" />
      </div>
    </div>
  );
}

// ─── PAGE COMPONENTS ─────────────────────────────────────────────

function HomePage({ PRODUCTS, onView, navigateTo }) {
  const featured = PRODUCTS.filter(p => p.isBestseller).slice(0, 3);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="home-content">
      {/* Dynamic Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="/assets/hero_gown.png"
            alt="Luciano Haute Couture"
            className="hero-bg-img"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
            <span className="hero-eyebrow">HAUTE COUTURE SHQIPTARE & ITALIANE</span>
            <h2 className="hero-title">
              Eleganca <em>pa Kompromis</em>
            </h2>
            <div className="hero-actions">
              <button className="btn-hero-fill" onClick={() => navigateTo('shop')}>BLEJ TANI</button>
              <button className="btn-hero-outline" onClick={() => navigateTo('collections')}>EKSPLORO</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><h3>1995</h3><p>VITI I THEMELIMIT</p></div>
            <div className="stat-item"><h3>+15k</h3><p>KLIENTË GLOBALË</p></div>
            <div className="stat-item"><h3>5</h3><p>BUTIQE BOTËRORE</p></div>
            <div className="stat-item"><h3>100%</h3><p>ARTIZANAT ITALIAN</p></div>
          </div>
        </div>
      </section>

      {/* Featured Collection Highlight */}
      <section className="section" style={{ background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="highlight-row">
            <div className="highlight-img-wrap">
              <img src="/assets/summer.png" alt="Summer Collection" />
            </div>
            <div className="highlight-info">
              <span className="section-eyebrow">✦ KOLEKSIONI I RI</span>
              <h3 className="section-title">Primavera 2026</h3>
              <p>
                Frymëzim nga kopshtet e Firences dhe riviera e Amalfit. Ngjyra të gjalla,
                materiale të lehta dhe elegancë që nuk njeh kohë. Çdo veshje është një
                mjeshtëri më vete e punuar me mëndafsh të pastër.
              </p>
              <button className="btn-hero-outline" onClick={() => navigateTo('shop')}>SHIKO KOLEKSIONIN</button>
            </div>
          </div>
        </div>
      </section>

      {/* Season Selection */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">✦ TRENDET E FUNDIT</span>
            <h2 className="section-title">Zgjedhjet e Sezonit</h2>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} onClick={() => onView(p)} />)}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section" style={{ background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="highlight-row reverse">
            <div className="highlight-img-wrap">
              <img src="/assets/men.png" alt="Men's Collection" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <img src="/assets/fabric_detail.png" alt="Fabric Detail Lucian" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <img src="/assets/tailoring_detail.png" alt="Sewing Detail Luciano" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="highlight-info">
              <span className="section-eyebrow">✦ ARTIZANATI</span>
              <h3 className="section-title">Mjeshtëria Luciano</h3>
              <p>
                Në Luciano, nuk prodhojmë veshje, ne krijojmë histori. Çdo rruazë,
                çdo qepje dhe çdo material zgjidhet me dorë nga Alessandro Luciano.
                Artizanët tanë italianë ruajnë traditën 30 vjeçare të shtëpisë,
                duke krijuar veshje që tejkalojnë kohën.
              </p>
              <button className="btn-hero-outline" onClick={() => navigateTo('about')}>HISTORIA JONË</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShopPage({ PRODUCTS, onView, onWish, wishlist }) {
  const [activeCat, setActiveCat] = useState('all');
  const filtered = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);

  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      <div className="section-header">
        <span className="section-eyebrow">✦ CATALOGUE</span>
        <h2 className="section-title">Eksploro Dyqanin</h2>
      </div>

      <div className="nav-links" style={{ justifyContent: 'center', marginBottom: '60px', overflowX: 'auto', paddingBottom: '10px' }}>
        {['all', 'evening', 'summer', 'formal', 'casual', 'accessories', 'shoes'].map(cat => (
          <button
            key={cat}
            className={activeCat === cat ? 'active' : ''}
            onClick={() => setActiveCat(cat)}
            style={{ fontSize: '0.7rem' }}
          >
            {cat === 'all' ? 'Të Gjitha' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onClick={() => onView(p)}
            onWish={() => onWish(p)}
            isWished={wishlist.some(w => w.id === p.id)}
          />
        ))}
      </div>
    </div>
  );
}

function CollectionsPage({ navigateTo }) {
  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      <div className="section-header">
        <span className="section-eyebrow">✦ EXCLUSIVE</span>
        <h2 className="section-title">Koleksionet tona</h2>
      </div>
      <div style={{ display: 'grid', gap: '120px', marginTop: '60px' }}>
        {COLLECTIONS.map((c, i) => (
          <div key={c.id} className={`highlight-row ${i % 2 === 1 ? 'reverse' : ''}`}>
            <div className="highlight-img-wrap">
              <img src={c.image} alt={c.name} />
            </div>
            <div className="highlight-info">
              <span className="section-eyebrow">✦ {c.season}</span>
              <h3 className="section-title" style={{ fontSize: '3rem' }}>{c.name}</h3>
              <p>{c.description}</p>
              <button className="btn-hero-outline" style={{ border: 'none', borderBottom: '1px solid white', padding: '10px 0' }} onClick={() => navigateTo('shop')}>EKSLPORO PRODUKTET</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="about-page">
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="highlight-row">
            <div className="highlight-img-wrap">
              <img src="/assets/atelier_interior.png" alt="Luciano Atelier Interior" />
            </div>
            <div className="highlight-info">
              <span className="section-eyebrow">✦ TRADITA</span>
              <h2 className="section-title">Historia Jonë</h2>
              <p>
                Themeluar në vitin 1995 në zemër të Firences, Luciano filloi si një ëndërr e dy vëllezërve
                për të sjellë elegancën e pastër italiane në çdo detaj të veshjes. Sot, 30 vite më vonë,
                ne mbetemi besnikë ndaj artizanatit të vërtetë, duke përdorur teknikat më të vjetra
                të qepjes për të krijuar modën e së ardhmes.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px' }}>
                <img src="/assets/fabric_detail.png" alt="Luciano Detail" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                <img src="/assets/tailoring_detail.png" alt="Luciano Fabric" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-card)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-eyebrow">✦ FILOZOFIA</span>
          <h2 className="section-title" style={{ marginBottom: '40px' }}>Eleganca pa Kompromis</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            Në Luciano, ne besojmë se moda nuk është thjesht veshje, por një formë e artit që shpreh personalitetin.
            Çdo material që përdorim është i certifikuar dhe çdo artizan që punon me ne ndan të njëjtin pasion
            për përsosmërinë.
          </p>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="contact-page">
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="highlight-row reverse">
            <div className="highlight-img-wrap">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" alt="Boutique" />
            </div>
            <div className="highlight-info">
              <span className="section-eyebrow">✦ KONTAKTI</span>
              <h2 className="section-title">Na Vizitoni</h2>
              <p>
                Përjeto eksperiencën Luciano në një nga butiqet tona ekskluzive.
                Ekipi ynë i stilistëve është gati t'ju mirëpresë për një konsultim personal.
              </p>

              <div className="contact-details" style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '20px' }}>
                  <h4 style={{ letterSpacing: '2px', marginBottom: '5px' }}>TELEFONI</h4>
                  <p style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>+39 055 123 4567</p>
                </div>
                <div style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '20px' }}>
                  <h4 style={{ letterSpacing: '2px', marginBottom: '5px' }}>EMAIL</h4>
                  <p style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>concierge@luciano-fashion.com</p>
                </div>
                <div style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '20px' }}>
                  <h4 style={{ letterSpacing: '2px', marginBottom: '5px' }}>ZYRAT QENDRORE</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Via Tornabuoni 12, Firenze, Italia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item" style={{ cursor: 'pointer' }}><h4>FIRENZE</h4><p>Via Tornabuoni 12</p></div>
            <div className="stat-item" style={{ cursor: 'pointer' }}><h4>MILANO</h4><p>Via Montenapoleone 8</p></div>
            <div className="stat-item" style={{ cursor: 'pointer' }}><h4>PARIS</h4><p>Avenue Montaigne 22</p></div>
            <div className="stat-item" style={{ cursor: 'pointer' }}><h4>NEW YORK</h4><p>Fifth Avenue 660</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, onClick, onWish, isWished }) {
  return (
    <div className="p-card" onClick={onClick}>
      <div className="p-img-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="p-info">
        <h4 className="p-name">{product.name}</h4>
        <div className="p-meta">
          <span className="p-price">{product.price.toLocaleString()}€</span>
          <button className="nav-icon-btn" onClick={(e) => { e.stopPropagation(); onWish(); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isWished ? "var(--accent-vibrant-red)" : "none"} stroke={isWished ? "var(--accent-vibrant-red)" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
