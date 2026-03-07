$path = "C:\Users\Admin\.gemini\antigravity\scratch\luciano-fashion-house\src\index.css"
$utf8 = New-Object System.Text.UTF8Encoding $false

$css = @'
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

/* ============ TOKENS ============ */
:root {
  --gold:#F5C842; --gold-dark:#C9A227; --gold-light:#FFE080; --gold-glow:rgba(245,200,66,0.25);
  --violet:#8B5CF6; --violet-light:#A78BFA; --violet-dark:#6D28D9; --violet-glow:rgba(139,92,246,0.25);
  --cyan:#06B6D4; --cyan-light:#67E8F9; --cyan-dark:#0891B2; --cyan-glow:rgba(6,182,212,0.25);
  --rose:#F43F5E; --rose-light:#FB7185; --rose-glow:rgba(244,63,94,0.2);
  --emerald:#10B981; --emerald-light:#34D399;
  --bg-base:#070710; --bg-secondary:#0D0D1A; --bg-card:#111127; --bg-elevated:#16162B;
  --bg-glass:rgba(255,255,255,0.04); --bg-glass-hover:rgba(255,255,255,0.07);
  --text-primary:#F1F0FF; --text-secondary:#A8A6C8; --text-tertiary:#6B6890;
  --border:rgba(255,255,255,0.06); --border-gold:rgba(245,200,66,0.2);
  --border-violet:rgba(139,92,246,0.2); --border-cyan:rgba(6,182,212,0.2);
  --shadow-gold:0 0 40px rgba(245,200,66,0.15),0 0 80px rgba(245,200,66,0.05);
  --shadow-violet:0 0 40px rgba(139,92,246,0.2),0 0 80px rgba(139,92,246,0.08);
  --nav-height:72px; --radius-sm:8px; --radius-md:14px; --radius-lg:20px; --radius-xl:28px; --radius-full:9999px;
}

/* ============ RESET ============ */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg-base);color:var(--text-primary);line-height:1.65;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:var(--bg-secondary);}
::-webkit-scrollbar-thumb{background:var(--violet);border-radius:4px;}

/* ============ TYPOGRAPHY ============ */
h1,h2,h3,h4{font-family:'Playfair Display',Georgia,serif;font-weight:600;line-height:1.2;}
h1{font-size:clamp(1.8rem,4vw,2.4rem);}
h2{font-size:clamp(1.6rem,3.5vw,2.2rem);}
h3{font-size:clamp(1.1rem,2vw,1.4rem);}
p{color:var(--text-secondary);line-height:1.75;}
a{text-decoration:none;color:inherit;transition:color 180ms;}
img{max-width:100%;display:block;}

/* ============ LAYOUT ============ */
.app{min-height:100vh;background:var(--bg-base);}
.container{max-width:1240px;margin:0 auto;padding:0 clamp(16px,4vw,40px);}
.section{padding:100px 0;}
.section-header{text-align:center;margin-bottom:60px;}
.section-header h2{margin-bottom:12px;}
.section-header p{max-width:560px;margin:0 auto;font-size:1.05rem;}
.section-badge{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,var(--gold-glow),var(--violet-glow));border:1px solid var(--border-gold);border-radius:var(--radius-full);padding:6px 18px;font-size:0.78rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;}
.gradient-text{background:linear-gradient(135deg,var(--gold),var(--violet-light),var(--cyan));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}

/* ============ NAVBAR ============ */
.navbar{position:fixed;top:0;left:0;right:0;z-index:1000;height:var(--nav-height);display:flex;align-items:center;background:rgba(7,7,16,0.6);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid transparent;transition:all 320ms;}
.navbar.scrolled{border-bottom-color:var(--border-gold);background:rgba(7,7,16,0.92);box-shadow:0 8px 32px rgba(0,0,0,0.5);}
.navbar .container{width:100%;display:flex;align-items:center;justify-content:space-between;}
.nav-brand{display:flex;align-items:center;gap:12px;cursor:pointer;user-select:none;}
.brand-icon{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--gold-dark),var(--gold));display:grid;place-items:center;font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--bg-base);box-shadow:0 0 20px var(--gold-glow);flex-shrink:0;}
.nav-brand h1{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:600;color:var(--text-primary);letter-spacing:0.03em;}
.nav-links{display:flex;align-items:center;gap:4px;list-style:none;}
.nav-links button{background:none;border:none;color:var(--text-secondary);font-size:0.92rem;font-weight:500;padding:8px 16px;border-radius:var(--radius-sm);cursor:pointer;transition:all 180ms;font-family:'Inter',sans-serif;}
.nav-links button:hover{color:var(--text-primary);background:var(--bg-glass);}
.nav-links button.active{color:var(--gold);background:var(--gold-glow);}
.nav-lundra-btn{display:flex !important;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(6,182,212,0.15),rgba(139,92,246,0.15)) !important;border:1px solid var(--border-cyan) !important;color:var(--cyan-light) !important;padding:8px 20px !important;border-radius:var(--radius-full) !important;font-weight:600 !important;}
.nav-lundra-btn:hover{background:linear-gradient(135deg,rgba(6,182,212,0.28),rgba(139,92,246,0.28)) !important;box-shadow:0 0 30px var(--cyan-glow) !important;color:var(--text-primary) !important;}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:var(--cyan);animation:pulseDot 2s infinite;}
.cart-indicator button{position:relative;background:none;border:none;color:var(--text-secondary);font-size:1.3rem;cursor:pointer;padding:4px 12px;}
.cart-indicator .count{position:absolute;top:-4px;right:2px;background:var(--rose);color:white;font-size:0.65rem;font-weight:700;min-width:18px;height:18px;border-radius:9px;display:grid;place-items:center;}
.mobile-toggle{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;}
.mobile-toggle span{display:block;width:24px;height:2px;background:var(--text-secondary);border-radius:2px;transition:all 180ms;}

/* ============ BUTTONS ============ */
.btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:var(--radius-md);font-size:0.92rem;font-weight:600;font-family:'Inter',sans-serif;letter-spacing:0.02em;border:none;cursor:pointer;transition:all 320ms;text-transform:uppercase;flex-shrink:0;}
.btn-primary{background:linear-gradient(135deg,var(--gold-dark),var(--gold));color:var(--bg-base);box-shadow:0 4px 20px var(--gold-glow);}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px var(--gold-glow);}
.btn-secondary{background:var(--bg-glass);color:var(--text-primary);border:1px solid var(--border);}
.btn-secondary:hover{background:var(--bg-glass-hover);border-color:var(--border-gold);color:var(--gold);transform:translateY(-2px);}
.btn-cyan{background:linear-gradient(135deg,var(--cyan-dark),var(--cyan));color:white;box-shadow:0 4px 20px var(--cyan-glow);}
.btn-cyan:hover{transform:translateY(-2px);box-shadow:0 8px 32px var(--cyan-glow);}
.btn-sm{padding:9px 18px;font-size:0.8rem;border-radius:var(--radius-sm);}
.btn:active{transform:scale(0.98);}

/* ============ HERO ============ */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;}
.hero-bg{position:absolute;inset:0;z-index:0;}
.hero-bg img{width:100%;height:100%;object-fit:cover;object-position:center top;}
.hero-bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 70% 40%,rgba(139,92,246,0.15) 0%,transparent 60%),radial-gradient(ellipse 40% 60% at 20% 80%,rgba(6,182,212,0.10) 0%,transparent 50%);}
.hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(100deg,rgba(7,7,16,0.88) 0%,rgba(7,7,16,0.5) 55%,rgba(7,7,16,0.2) 100%);}
.hero .container{position:relative;z-index:2;}
.hero-content{max-width:680px;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(245,200,66,0.10),rgba(139,92,246,0.10));border:1px solid rgba(245,200,66,0.30);border-radius:var(--radius-full);padding:7px 20px;font-size:0.75rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);margin-bottom:24px;animation:fadeInDown 0.8s both;}
.hero-badge .dot{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:pulseDot 2s infinite;}
.hero-content h2{font-size:clamp(2.4rem,6vw,4.5rem);font-weight:700;color:var(--text-primary);line-height:1.08;margin-bottom:20px;animation:fadeInUp 0.8s 0.1s both;}
.hero-content p{font-size:clamp(1rem,1.5vw,1.15rem);color:var(--text-secondary);margin-bottom:36px;max-width:520px;animation:fadeInUp 0.8s 0.2s both;}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;animation:fadeInUp 0.8s 0.3s both;}
.hero-stats{display:flex;gap:36px;margin-top:52px;padding-top:36px;border-top:1px solid var(--border);animation:fadeInUp 0.8s 0.4s both;flex-wrap:wrap;}
.stat-number{display:block;font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:var(--gold);line-height:1;margin-bottom:4px;}
.stat-label{font-size:0.78rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-tertiary);}

/* ============ PRODUCT GRID ============ */
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:28px;}
.product-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;transition:all 320ms;cursor:pointer;position:relative;}
.product-card:hover{transform:translateY(-8px);border-color:var(--border-gold);box-shadow:var(--shadow-gold);}
.card-image{position:relative;aspect-ratio:3/4;background:var(--bg-elevated);overflow:hidden;}
.card-image img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s;}
.product-card:hover .card-image img{transform:scale(1.08);}
.card-badges{position:absolute;top:14px;left:14px;z-index:2;display:flex;flex-direction:column;gap:6px;}
.badge-new{background:linear-gradient(135deg,var(--gold-dark),var(--gold));color:var(--bg-base);font-size:0.68rem;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:4px 10px;border-radius:var(--radius-full);}
.card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,16,0.9) 0%,transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;gap:8px;padding:20px;opacity:0;transition:opacity 320ms;}
.product-card:hover .card-overlay{opacity:1;}
.card-body{padding:20px;}
.card-category{font-size:0.72rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--violet-light);margin-bottom:8px;}
.card-title{font-size:1rem;font-weight:600;color:var(--text-primary);margin-bottom:8px;font-family:'Playfair Display',serif;line-height:1.3;}
.card-description{font-size:0.82rem;color:var(--text-tertiary);line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:14px;}
.card-footer{display:flex;align-items:center;justify-content:space-between;}
.card-price{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:600;color:var(--gold);}
.card-rating{font-size:0.78rem;color:var(--gold);display:flex;align-items:center;gap:4px;}
.card-rating span{color:var(--text-tertiary);}

/* ============ CATEGORY FILTER ============ */
.category-filter{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:48px;}
.category-filter button{background:var(--bg-card);border:1px solid var(--border);color:var(--text-secondary);padding:9px 20px;border-radius:var(--radius-full);font-size:0.85rem;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all 180ms;}
.category-filter button:hover{border-color:var(--border-violet);color:var(--violet-light);background:rgba(139,92,246,0.08);}
.category-filter button.active{background:linear-gradient(135deg,var(--violet-dark),var(--violet));border-color:var(--violet);color:white;font-weight:600;box-shadow:0 4px 16px var(--violet-glow);}

/* ============ COLLECTIONS ============ */
.collections-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:28px;}
.collection-card{position:relative;aspect-ratio:4/5;border-radius:var(--radius-xl);overflow:hidden;cursor:pointer;transition:all 320ms;border:1px solid var(--border);}
.collection-card:hover{transform:translateY(-8px) scale(1.01);box-shadow:var(--shadow-violet);border-color:var(--border-violet);}
.collection-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.7s;}
.collection-card:hover img{transform:scale(1.1);}
.collection-card .card-content{position:absolute;bottom:0;left:0;right:0;padding:32px 28px;background:linear-gradient(to top,rgba(7,7,16,0.97) 0%,transparent 100%);}
.collection-card h3{font-size:1.4rem;color:var(--gold);margin-bottom:8px;}
.collection-card p{font-size:0.87rem;color:var(--text-secondary);margin-bottom:16px;}
.explore-link{font-size:0.82rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--cyan);}

/* ============ MODAL ============ */
.modal-backdrop{position:fixed;inset:0;z-index:2000;background:rgba(7,7,16,0.85);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.2s;}
.modal-content{background:var(--bg-card);border:1px solid var(--border-gold);border-radius:var(--radius-xl);max-width:900px;width:100%;max-height:90vh;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;box-shadow:0 24px 64px rgba(0,0,0,0.6),var(--shadow-gold);animation:slideUp 0.35s;}
.modal-image-side{position:relative;aspect-ratio:3/4;overflow:hidden;border-radius:var(--radius-xl) 0 0 var(--radius-xl);}
.modal-image-side img{width:100%;height:100%;object-fit:cover;}
.modal-close-btn{position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:rgba(7,7,16,0.8);border:1px solid var(--border);color:var(--text-secondary);font-size:1rem;cursor:pointer;display:grid;place-items:center;transition:all 180ms;}
.modal-close-btn:hover{background:var(--rose);color:white;border-color:transparent;}
.modal-info-side{padding:40px 36px;display:flex;flex-direction:column;}
.modal-category{font-size:0.72rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--violet-light);margin-bottom:10px;}
.modal-name{font-family:'Playfair Display',serif;font-size:1.7rem;font-weight:700;color:var(--text-primary);margin-bottom:16px;line-height:1.2;}
.modal-description{font-size:0.92rem;color:var(--text-secondary);margin-bottom:28px;line-height:1.75;}
.modal-price{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:var(--gold);margin-bottom:28px;}
.modal-label{font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-tertiary);margin-bottom:10px;}
.modal-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;}
.modal-chip{padding:7px 16px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.82rem;color:var(--text-secondary);cursor:pointer;transition:all 180ms;font-family:'Inter',sans-serif;}
.modal-chip:hover,.modal-chip.selected{background:rgba(245,200,66,0.1);border-color:var(--gold);color:var(--gold);}
.modal-material{display:flex;align-items:center;gap:10px;padding:14px 18px;background:var(--bg-elevated);border:1px solid var(--border-violet);border-radius:var(--radius-md);margin-bottom:28px;}
.modal-material span:first-child{font-size:1.3rem;}
.modal-material p{font-size:0.87rem;color:var(--text-secondary);margin:0;}
.modal-material strong{color:var(--violet-light);}
.modal-rating{display:flex;align-items:center;gap:8px;margin-bottom:28px;}
.modal-stars{color:var(--gold);font-size:1.1rem;}
.modal-rating p{font-size:0.85rem;color:var(--text-tertiary);margin:0;}
.modal-actions{display:flex;flex-direction:column;gap:12px;margin-top:auto;}

/* ============ FAB ============ */
.lundra-fab{position:fixed;bottom:32px;right:32px;z-index:900;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--violet-dark),var(--cyan-dark));border:2px solid rgba(255,255,255,0.15);cursor:pointer;box-shadow:0 8px 32px rgba(139,92,246,0.4),0 0 60px rgba(6,182,212,0.15);padding:0;overflow:visible;transition:all 320ms;display:grid;place-items:center;}
.lundra-fab:hover{transform:scale(1.12) translateY(-4px);box-shadow:0 16px 48px rgba(139,92,246,0.5),0 0 80px rgba(6,182,212,0.2);}
.lundra-fab img{width:44px;height:44px;border-radius:50%;object-fit:cover;}
.fab-pulse{position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--cyan);animation:fabPulse 2.5s infinite;pointer-events:none;}

/* ============ LUNDRA PANEL ============ */
.l-overlay{position:fixed;inset:0;z-index:1100;background:rgba(7,7,16,0.6);backdrop-filter:blur(6px);opacity:0;pointer-events:none;transition:opacity 320ms;}
.l-overlay--open{opacity:1;pointer-events:all;}
.l-panel{position:fixed;top:0;right:0;bottom:0;z-index:1200;width:min(520px,100vw);display:flex;flex-direction:column;background:linear-gradient(180deg,#0E0E20 0%,#08080F 100%);border-left:1px solid var(--border-violet);box-shadow:-20px 0 80px rgba(139,92,246,0.15);transform:translateX(100%);transition:transform 0.45s cubic-bezier(0.16,1,0.3,1);overflow:hidden;}
.l-panel--open{transform:translateX(0);}
.l-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid var(--border);background:linear-gradient(135deg,rgba(139,92,246,0.06),rgba(6,182,212,0.04));flex-shrink:0;}
.l-header__brand{display:flex;align-items:center;gap:14px;}
.l-avatar-wrap{position:relative;width:48px;height:48px;}
.l-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid var(--violet);box-shadow:0 0 20px var(--violet-glow);}
.l-status-dot{position:absolute;bottom:2px;right:2px;width:12px;height:12px;border-radius:50%;background:var(--emerald);border:2px solid var(--bg-secondary);box-shadow:0 0 8px rgba(16,185,129,0.6);animation:pulseDot 2s infinite;}
.l-header__name{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:600;color:var(--text-primary);}
.l-star{color:var(--gold);}
.l-header__sub{font-size:0.75rem;color:var(--cyan-light);font-weight:500;letter-spacing:0.04em;margin-top:2px;}
.l-header__actions{display:flex;gap:8px;}
.l-icon-btn,.l-close-btn{width:36px;height:36px;border-radius:var(--radius-sm);background:var(--bg-glass);border:1px solid var(--border);color:var(--text-secondary);font-size:1rem;cursor:pointer;transition:all 180ms;display:grid;place-items:center;}
.l-icon-btn:hover{background:var(--bg-glass-hover);border-color:var(--border-violet);}
.l-close-btn:hover{background:var(--rose-glow);border-color:var(--rose);color:var(--rose-light);}
.l-settings{padding:16px 24px;border-bottom:1px solid var(--border);background:rgba(245,200,66,0.03);flex-shrink:0;}
.l-settings p{font-size:0.82rem;margin-bottom:10px;}
.l-settings-row{display:flex;gap:8px;}
.l-settings-row input{flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:8px 14px;color:var(--text-primary);font-size:0.85rem;font-family:'Inter',sans-serif;outline:none;}
.l-settings-row input:focus{border-color:var(--gold);}
.l-settings-row button{padding:8px 16px;background:linear-gradient(135deg,var(--gold-dark),var(--gold));color:var(--bg-base);border:none;border-radius:var(--radius-sm);font-weight:700;font-size:0.85rem;cursor:pointer;font-family:'Inter',sans-serif;}
.settings-active{display:block;margin-top:8px;font-size:0.78rem;color:var(--gold);font-weight:600;}
.l-chat{flex:1;overflow-y:auto;padding:24px 20px;display:flex;flex-direction:column;gap:20px;scroll-behavior:smooth;}
.l-msg{display:flex;gap:12px;animation:fadeInUp 0.3s;}
.l-msg--user{flex-direction:row-reverse;}
.l-msg-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid var(--violet);flex-shrink:0;margin-top:2px;}
.l-msg-content{flex:1;display:flex;flex-direction:column;gap:8px;min-width:0;}
.l-msg--user .l-msg-content{align-items:flex-end;}
.l-bubble{max-width:100%;border-radius:var(--radius-lg);padding:14px 18px;font-size:0.9rem;line-height:1.7;position:relative;}
.l-bubble--agent{background:linear-gradient(135deg,rgba(255,255,255,0.05),rgba(139,92,246,0.05));border:1px solid var(--border-violet);border-top-left-radius:4px;color:var(--text-primary);}
.l-bubble--user{background:linear-gradient(135deg,var(--violet-dark),var(--cyan-dark));border:none;border-top-right-radius:4px;color:white;box-shadow:0 4px 20px var(--violet-glow);}
.l-bubble p{color:inherit;margin-bottom:6px;font-size:0.9rem;}
.l-bubble p:last-child{margin-bottom:0;}
.l-bubble strong{color:var(--gold);font-weight:600;}
.l-bubble--user strong{color:var(--gold-light);}
.l-bubble em{color:var(--violet-light);font-style:italic;}
.l-bubble h3{color:var(--cyan-light);font-size:1rem;margin-bottom:8px;}
.l-bubble ul{padding-left:18px;color:var(--text-secondary);margin:6px 0;}
.l-bubble li{margin-bottom:4px;font-size:0.87rem;}
.l-bubble hr{border-color:var(--border);margin:10px 0;}
.l-bubble table{border-collapse:collapse;font-size:0.82rem;width:100%;margin:10px 0;}
.l-bubble th{background:rgba(139,92,246,0.15);color:var(--violet-light);padding:8px 10px;text-align:left;font-weight:600;font-size:0.78rem;}
.l-bubble td{padding:7px 10px;border-bottom:1px solid var(--border);color:var(--text-secondary);}
.l-bubble tr:last-child td{border-bottom:none;}
.ai-badge{display:inline-block;font-size:0.68rem;font-weight:700;padding:3px 8px;background:linear-gradient(135deg,var(--gold-glow),var(--violet-glow));border:1px solid var(--border-gold);border-radius:var(--radius-full);color:var(--gold);margin-top:8px;}
.pipeline{background:rgba(245,200,66,0.03);border:1px solid rgba(245,200,66,0.12);border-radius:var(--radius-md);padding:12px 16px;margin-bottom:4px;}
.pipeline-label{font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;opacity:0.8;}
.pipeline-steps{display:flex;flex-direction:column;gap:6px;}
.pipeline-step{display:flex;align-items:flex-start;gap:10px;}
.step-check{width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),var(--cyan-dark));color:white;font-size:0.65rem;font-weight:700;display:grid;place-items:center;flex-shrink:0;margin-top:1px;}
.step-details{display:flex;flex-direction:column;gap:1px;}
.step-name{font-size:0.78rem;font-weight:600;color:var(--text-primary);}
.step-result{font-size:0.72rem;color:var(--text-tertiary);}
.analysis-strip{background:rgba(6,182,212,0.04);border:1px solid rgba(6,182,212,0.12);border-radius:var(--radius-md);padding:10px 14px;display:flex;flex-direction:column;gap:6px;}
.strip-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;}
.strip-label{font-size:0.72rem;color:var(--text-tertiary);font-weight:600;flex-shrink:0;}
.intent-badge{background:rgba(139,92,246,0.15);border:1px solid var(--border-violet);border-radius:var(--radius-full);padding:2px 10px;font-size:0.68rem;font-weight:600;color:var(--violet-light);}
.reasoning-text{font-size:0.78rem;color:var(--text-secondary);font-style:italic;}
.params-row span{font-size:0.68rem;color:var(--text-tertiary);background:var(--bg-elevated);border-radius:var(--radius-full);padding:2px 8px;font-weight:600;}
.l-products{margin-top:4px;}
.l-products-label{font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
.l-products-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}
.l-product-card{background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden;cursor:pointer;transition:all 180ms;}
.l-product-card:hover{border-color:var(--border-gold);transform:translateY(-3px);box-shadow:0 8px 24px rgba(245,200,66,0.1);}
.l-product-img{position:relative;aspect-ratio:3/4;overflow:hidden;}
.l-product-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s;}
.l-product-card:hover .l-product-img img{transform:scale(1.08);}
.l-product-badge{position:absolute;top:8px;left:8px;background:linear-gradient(135deg,var(--gold-dark),var(--gold));color:var(--bg-base);font-size:0.6rem;font-weight:800;letter-spacing:0.12em;padding:3px 7px;border-radius:var(--radius-full);}
.l-product-info{padding:10px 12px;display:flex;flex-direction:column;gap:3px;}
.l-product-name{font-size:0.78rem;font-weight:600;color:var(--text-primary);font-family:'Playfair Display',serif;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.l-product-price{font-size:0.88rem;font-weight:700;color:var(--gold);font-family:'Playfair Display',serif;}
.l-product-rating{font-size:0.68rem;color:var(--gold);}
.l-thinking{display:flex;align-items:center;gap:12px;padding:14px 18px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-lg);border-top-left-radius:4px;}
.l-thinking-text{font-size:0.85rem;color:var(--text-tertiary);font-style:italic;}
.l-dots{display:flex;gap:4px;}
.l-dots span{width:6px;height:6px;border-radius:50%;background:var(--violet-light);animation:dotBounce 1.2s infinite;}
.l-dots span:nth-child(2){animation-delay:0.2s;}
.l-dots span:nth-child(3){animation-delay:0.4s;}
.l-timestamp{font-size:0.68rem;color:var(--text-tertiary);padding:0 4px;}
.l-msg--user .l-timestamp{text-align:right;}
.l-footer{border-top:1px solid var(--border);padding:16px 20px;background:rgba(7,7,16,0.8);flex-shrink:0;display:flex;flex-direction:column;gap:12px;}
.l-chips{display:flex;flex-wrap:wrap;gap:7px;}
.l-chip{background:var(--bg-glass);border:1px solid var(--border);border-radius:var(--radius-full);padding:7px 14px;font-size:0.78rem;font-weight:500;color:var(--text-secondary);cursor:pointer;font-family:'Inter',sans-serif;transition:all 180ms;white-space:nowrap;}
.l-chip:hover{background:rgba(139,92,246,0.12);border-color:var(--border-violet);color:var(--violet-light);}
.l-input-row{display:flex;gap:10px;}
.l-input{flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:50px;padding:12px 22px;color:var(--text-primary);font-size:0.9rem;font-family:'Inter',sans-serif;outline:none;transition:all 180ms;min-width:0;}
.l-input:focus{border-color:var(--violet);box-shadow:0 0 0 3px rgba(139,92,246,0.12);}
.l-input::placeholder{color:var(--text-tertiary);}
.l-send{width:48px;height:48px;border-radius:50%;background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-tertiary);font-size:1.2rem;cursor:pointer;display:grid;place-items:center;flex-shrink:0;transition:all 180ms;}
.l-send--active{background:linear-gradient(135deg,var(--violet-dark),var(--cyan-dark));border-color:transparent;color:white;box-shadow:0 4px 16px var(--violet-glow);}
.l-send--active:hover{transform:scale(1.1);}
.l-footer-status{display:flex;justify-content:space-between;font-size:0.68rem;color:var(--text-tertiary);letter-spacing:0.03em;}

/* ============ TOAST ============ */
.toast-container{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;}
.toast{background:var(--bg-card);border:1px solid var(--border-gold);border-radius:var(--radius-md);padding:14px 24px;font-size:0.87rem;color:var(--text-primary);font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.5);animation:toastIn 0.3s;white-space:nowrap;pointer-events:all;font-family:'Inter',sans-serif;}
.toast-success{border-color:var(--emerald-light,#34D399);}
.toast-info{border-color:var(--border-cyan);}
.toast-error{border-color:var(--rose);}

/* ============ FOOTER ============ */
.footer{background:var(--bg-secondary);border-top:1px solid var(--border-gold);padding:60px 0 32px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px;}
.footer-brand h3{font-family:'Playfair Display',serif;font-size:1.6rem;color:var(--gold);margin-bottom:14px;}
.footer-brand p{font-size:0.87rem;color:var(--text-tertiary);line-height:1.75;}
.footer h4{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:600;color:var(--text-primary);margin-bottom:20px;}
.footer ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
.footer ul a{font-size:0.85rem;color:var(--text-tertiary);transition:color 180ms;}
.footer ul a:hover{color:var(--gold);}
.footer-bottom{border-top:1px solid var(--border);padding-top:24px;display:flex;align-items:center;justify-content:space-between;}
.footer-bottom p{font-size:0.82rem;color:var(--text-tertiary);}
.footer-social{display:flex;gap:16px;}
.footer-social a{font-size:1.2rem;opacity:0.6;transition:opacity 180ms;}
.footer-social a:hover{opacity:1;}

/* ============ ANIMATIONS ============ */
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeInDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(40px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes toastIn{from{opacity:0;transform:translateY(16px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.8;transform:scale(1.2)}}
@keyframes fabPulse{0%{opacity:0.8;transform:scale(1)}100%{opacity:0;transform:scale(1.6)}}
@keyframes dotBounce{0%,80%,100%{transform:translateY(0);opacity:0.5}40%{transform:translateY(-6px);opacity:1}}

/* ============ RESPONSIVE ============ */
@media(max-width:900px){
  .modal-content{grid-template-columns:1fr;}
  .modal-image-side{aspect-ratio:16/9;border-radius:var(--radius-xl) var(--radius-xl) 0 0;}
  .footer-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:768px){
  .nav-links{position:fixed;top:var(--nav-height);left:0;right:0;background:rgba(7,7,16,0.98);border-bottom:1px solid var(--border);flex-direction:column;padding:20px;gap:8px;transform:translateY(-110%);transition:transform 320ms;pointer-events:none;}
  .nav-links.mobile-open{transform:translateY(0);pointer-events:all;}
  .nav-links button{width:100%;text-align:center;padding:12px;}
  .mobile-toggle{display:flex;}
  .products-grid{grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;}
  .l-products-grid{grid-template-columns:1fr 1fr;}
  .hero-actions{gap:10px;}
  .footer-grid{grid-template-columns:1fr 1fr;gap:32px;}
  .footer-bottom{flex-direction:column;gap:16px;}
}
@media(max-width:480px){
  .section{padding:70px 0;}
  .hero-stats{flex-wrap:wrap;gap:20px;}
  .collections-grid{grid-template-columns:1fr;}
  .footer-grid{grid-template-columns:1fr;}
  .l-products-grid{grid-template-columns:1fr;}
  .lundra-fab{width:56px;height:56px;bottom:20px;right:20px;}
  .l-panel{width:100vw;}
}
'@

[System.IO.File]::WriteAllText($path, $css, $utf8)
Write-Host "SUCCESS: CSS written $($css.Length) bytes (UTF-8)"
