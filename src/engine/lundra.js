// ============================================================
// LUNDRA — Agjenti Inteligjent i Shtëpisë së Modës LUCIANO
// Versioni 4.0 — Motor i Plotë Bisedor & Kontekstual
// ============================================================

import { PRODUCTS, FAQ_DATABASE, COLLECTIONS, BRAND_KNOWLEDGE } from '../data/products';

// ── Utilitare Normalizimi ──────────────────────────────────────
const normalize = (s = '') =>
    s
        .toLowerCase()
        .replace(/[ëêèé]/g, 'e')
        .replace(/[àáâã]/g, 'a')
        .replace(/[çc̈]/g, 'c')
        .replace(/[üû]/g, 'u')
        .replace(/[îïì]/g, 'i')
        .replace(/[ôòó]/g, 'o')
        .trim();

// Kontrollon nëse mesazhi përmban ndonjë nga fjalët kyçe
const has = (msg, words) => words.some(w => normalize(msg).includes(normalize(w)));

// Kthen kohën e ditës për përshëndetje kontekstuale
const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Mirëmëngjes';
    if (hour >= 12 && hour < 17) return 'Mirëdita';
    if (hour >= 17 && hour < 22) return 'Mirëmbrëma';
    return 'Mirë natën';
};

// Ndërtimi i përgjigjes standarde
const reply = (message, extras = {}) => ({
    role: 'agent',
    message,
    products: (extras.products || []).slice(0, 4),
    suggestions: extras.suggestions || [],
    badge: extras.badge || null,
    timestamp: new Date(),
});

// ── Klasa Kryesore ─────────────────────────────────────────────
class LundraAgent {
    constructor() {
        this.ctx = {
            turnCount: 0,
            lastProducts: [],
            lastCategory: null,
            userProfile: { occasion: null, budget: null },
        };
    }

    // ════════════════════════════════════════════════════════════
    // METODA KRYESORE — Proceson çdo mesazh nga klienti
    // ════════════════════════════════════════════════════════════
    async processMessage(rawInput) {
        const raw = (rawInput || '').trim();
        if (!raw) return reply('Si mund t\'ju ndihmoj?', { suggestions: ['Koleksionet', 'Bestsellers'] });

        const msg = normalize(raw);
        this.ctx.turnCount++;

        // Renditja e prioriteteve — teston një nga një
        return (
            this._greeting(msg, raw) ??
            this._identity(msg) ??
            this._smallTalk(msg) ??
            this._farewell(msg) ??
            this._schedule(msg) ??
            this._location(msg) ??
            this._occasion(msg) ??
            this._budget(msg, raw) ??
            this._category(msg) ??
            this._productSearch(msg, raw) ??
            this._faq(msg) ??
            this._brandInfo(msg) ??
            this._reservation(msg) ??
            this._compliment(msg) ??
            this._negative(msg) ??
            this._continuation(msg) ??
            this._default(msg)
        );
    }

    // ── 1. PËRSHËNDETJE (gjithëpërfshirëse) ─────────────────────
    _greeting(msg, raw) {
        let greetingBase = "";
        let isGreeting = false;

        // Mirroring exactly the user's greeting
        if (has(msg, ['miremengjes', 'mirmengjes', 'miremengjesi'])) {
            greetingBase = raw.includes('Mirëmëngjes') ? 'Mirëmëngjes' : 'Mirëmëngjes';
            isGreeting = true;
        } else if (has(msg, ['miredita', 'mirdita'])) {
            greetingBase = 'Mirëdita';
            isGreeting = true;
        } else if (has(msg, ['mirembrema', 'mirembrema'])) {
            greetingBase = 'Mirëmbrëma';
            isGreeting = true;
        } else if (has(msg, ['pershendetje', 'përshëndetje'])) {
            greetingBase = 'Përshëndetje';
            isGreeting = true;
        } else if (has(msg, ['hello', 'hi', 'hey'])) {
            greetingBase = 'Përshëndetje';
            isGreeting = true;
        }

        if (!isGreeting) return null;
        if (msg.length > 50) return null;

        const text = `${greetingBase} dhe mirë se erdhët në Luciano. 🌹\n\nJam **Lundra**, asistenti juaj për stil dhe koleksione. Si mund t’ju ndihmoj sot?`;

        return reply(text, {
            suggestions: ['Shiko koleksionet', 'Fustan mbrëmjeje', 'Bestsellers', 'Rreth Luciano'],
        });
    }

    // ── 2. IDENTITETI (kush je, çfarë je) ───────────────────────
    _identity(msg) {
        if (!has(msg, ['kush je', 'cfare je', 'cfare eshte', 'je robot', 'je ai', 'je bot', 'nje bot', 'chatbot', 'artificial', 'ti je', 'ti jeni', 'eshte robot', 'a je'])) return null;

        return reply(
            `Jam **Lundra** — agjenti i inteligjencës artificiale i **Shtëpisë së Modës Luciano**.\n\n✦ **Nuk jam chatbot i zakonshëm.** Jam projektuar si këshilltar personal i modës luksoze:\n\n• 🧠 Kuptoj pyetjet në gjuhë natyrale\n• 👗 Rekomandoj veshje sipas rastit, buxhetit dhe stilit\n• 📦 Informoj për porosi, dërgime dhe garanci\n• 💬 Përgjigjem çdo pyetjeje me përpikmëri profesionale\n• 🎨 Udhëzoj nga koleksioni deri tek blerja finale\n\nÇfarë mund t'ju ndihmoj sot?`,
            { suggestions: ['Gjeni stilin tim', 'Koleksionet e reja', 'Çmimet'] }
        );
    }

    // ── 3. BISEDË E LEHTË ────────────────────────────────────────
    _smallTalk(msg) {
        // Example: "Si je?"
        if (has(msg, ['si jeni', 'si je', 'how are you', 'si po kalon'])) {
            return reply(
                `Faleminderit që pyetët. Jam këtu për t’ju ndihmuar të gjeni stilin perfekt nga koleksionet Luciano. 😊\n\nA po kërkoni diçka për një event të veçantë?`,
                { suggestions: ['Po, një dasmë', 'Një mbrëmje gala', 'Për punë'] }
            );
        }

        // "çfarë po bën / çfarë bën"
        if (has(msg, ['ca po ben', 'cfare po ben', 'cfare ben', 'what are you doing', 'po besh'])) {
            return reply(
                `Jam duke analizuar koleksionet tona të fundit për t'ju ofruar sugjerimet më të rafinuara. ✨\n\nA mund t'ju ndihmoj me diçka specifike?`,
                { suggestions: ['Bestsellers', 'Koleksionet', 'Made to Measure'] }
            );
        }

        return null;
    }

    // ── 4. LAMTUMIRË ─────────────────────────────────────────────
    _farewell(msg) {
        if (!has(msg, ['mirupafshim', 'mireupafshim', 'lamtumire', 'bye', 'goodbye', 'ciao ciao', 'te lumte', 'faleminderit te lumte', 'po shkoj'])) return null;

        return reply(
            `Faleminderit që zgjodhët **Luciano**! 🌹\n\nIshte kënaqësi e vërtetë t'ju shërbej. Nëse keni nevojë për ndihmë tjetër apo dëshironi të eksploroni koleksionet tona, jam gjithmonë këtu.\n\nMirupafshim dhe ditë të mbarë!`,
            { suggestions: ['Kthehu', 'Shiko koleksionet'] }
        );
    }

    // ── 5. ORARI ─────────────────────────────────────────────────
    _schedule(msg) {
        if (!has(msg, ['orar', 'hapet', 'mbyllet', 'kur jeni hapur', 'a jeni hapur', 'oraret', 'opening hours', 'ore hapjes', 'kur punoni'])) return null;

        return reply(
            `**Oraret e Butiqeve Luciano:**\n\n🕙 **E Hënë – E Shtunë:** 10:00 – 20:00\n🕛 **E Diel:** 12:00 – 18:00\n\n📍 Butiqet ndodhen në:\n• 🇮🇹 Firence — Via Tornabuoni 12\n• 🇮🇹 Milano — Via Montenapoleone 8\n• 🇫🇷 Paris — Avenue Montaigne 22\n• 🇬🇧 Londër — New Bond Street 45\n• 🇺🇸 Nju Jork — Fifth Avenue 660\n\nPër rezervime private, kontaktoni: **reservations@luciano-fashion.com**`,
            { suggestions: ['Rezervo takim', 'Kontakto butikun', 'Shiko koleksionet'] }
        );
    }

    // ── 6. LOKACIONI ─────────────────────────────────────────────
    _location(msg) {
        if (!has(msg, ['ku jeni', 'ku ndodheni', 'adrese', 'adresë', 'butik', 'dyqan', 'store', 'location', 'ku eshte', 'ku te gjej', 'ku mund te vij'])) return null;

        return reply(
            `**Butiqet Luciano në Botë:**\n\n🇮🇹 **Firence** *(Atelier Qendror)* — Via Tornabuoni 12\n🇮🇹 **Milano** — Via Montenapoleone 8\n🇫🇷 **Paris** — Avenue Montaigne 22\n🇬🇧 **Londër** — New Bond Street 45\n🇺🇸 **Nju Jork** — Fifth Avenue 660\n\n📞 Tel: +39 055 123 4567\n📧 Email: info@luciano-fashion.com\n\nDëshironi të rezervoni një vizitë private?`,
            { suggestions: ['Rezervo vizitë private', 'Oraret', 'Kontaktoni'] }
        );
    }

    // ── 7. RASTI / EVENTI ────────────────────────────────────────
    _occasion(msg) {
        const events = [
            {
                keys: ['dasme', 'dasm', 'nuse', 'wedding', 'martese', 'nuseri', 'bridal'],
                category: 'evening',
                reply: `Urime për ngjarjen e veçantë! 💍\n\nPër **dasmën** tuaj, Luciano ofron koleksionin ekskluziv **\"Bridal Elegance\"** — kreacione nusërie të punuara me dorë me mëndafsh italian dhe detaje Swarovski.\n\n**Rekomandimi i Lundrës:** Shërbimi \"Made to Measure\" krijon veshjen e ëndrrave sipas masave tuaja eksakte (4–6 javë prodhim).`,
            },
            {
                keys: ['gale', 'gala', 'ceremoni', 'event formal', 'event i rendesishem', 'festë zyrtare', 'natter'],
                category: 'evening',
                reply: `Për një **event gala**, koleksioni **\"Notte Eterna\"** është zgjedhja perfekte! ✨\n\nKreacionet tona gala kombinojnë mëndafsh, organza dhe kristale Swarovski — ju garantohet të jeni ylli i mbrëmjes.`,
            },
            {
                keys: ['mbremje', 'mbrëmje', 'darke', 'dark', 'diner', 'dinner', 'restorant', 'romantike'],
                category: 'evening',
                reply: `Për një **darkë elegante**, koleksioni mbrëmjeje i Luciano ofron zgjedhje të shkëlqyera! 🌙\n\nFustane koktejli dhe gala me detaje të punuara artizanalisht — ideale për çdo mbrëmje speciale.`,
            },
            {
                keys: ['biznes', 'pune', 'meeting', 'takim', 'prezantim', 'konference', 'zyre', 'office'],
                category: 'formal',
                reply: `Stili juaj profesional flet para se ju të hapni gojën.\n\nKoleksioni **\"Uomo Moderno\"** dhe linja formale femërore ofrojnë autoritet dhe elegancë të pakrahasueshme — kostume dhe veshje për njerëzit që bëjnë ndryshim.`,
            },
            {
                keys: ['pushime', 'plazh', 'udhetim', 'vakance', 'resort', 'amalfi', 'riviera', 'verore'],
                category: 'summer',
                reply: `Për **pushimet luksoze**, koleksioni **\"Primavera/Estate 2026\"** është frymëzimi i pastër mesdhetar! ☀️\n\nMëndafsh i lehtë, ngjyra koral dhe ar, stili i Rivierës — çdo veshje është liri me klasë.`,
            },
        ];

        for (const ev of events) {
            if (has(msg, ev.keys)) {
                const prods = PRODUCTS.filter(p => p.category === ev.category).sort((a, b) => b.rating - a.rating);
                this.ctx.lastProducts = prods;
                this.ctx.lastCategory = ev.category;
                return reply(ev.reply, {
                    products: prods.slice(0, 3),
                    suggestions: ['Made to Measure', 'Çmimet', 'Shiko të gjithë katalogun'],
                });
            }
        }
        return null;
    }

    // ── 8. BUXHETI ───────────────────────────────────────────────
    _budget(msg) {
        if (!has(msg, ['buxhet', 'cmim', 'qmim', 'çmim', 'shume para', 'pak para', 'lire', 'ekonomike', 'i shtrenjte', 'sa kushton', 'affordable', 'luksoz', 'premium'])) return null;

        let prods = [];
        let text = '';

        if (has(msg, ['pak para', 'ekonomike', 'affordable', 'lire', 'i lire', 'jo shume para'])) {
            prods = PRODUCTS.filter(p => p.price < 700).sort((a, b) => a.price - b.price);
            text = `Edhe produktet me çmim më të favorshëm të Luciano janë të qepura me materiale premium! Ja kreacionet elegante nën **700€**:`;
        } else if (has(msg, ['i shtrenjte', 'ekskluziv', 'premium', 'luksoz', 'shume para'])) {
            prods = PRODUCTS.filter(p => p.price >= 2000).sort((a, b) => b.rating - a.rating);
            text = `Koleksioni ynë **Ultra-Luksoz** — kreacione ekskluzive me materiale të rralla dhe artizanat të pakrahasueshëm:`;
        } else {
            prods = PRODUCTS.sort((a, b) => a.price - b.price);
            text = `Gama jonë e çmimeve fillon nga **320€** deri në **4.500€**.\n\n• 🥇 **Ultra-Luksoz** (2.000–4.500€): Smoking, fustane gala\n• 🥈 **Premium** (800–2.000€): Çanta, taka, koktejli\n• 🥉 **Aksesibël** (320–800€): Shall, bluzë, triko\n\nNë cilën kategori çmimesh jeni të interesuar?`;
        }

        this.ctx.lastProducts = prods;
        return reply(text, {
            products: prods.slice(0, 4),
            suggestions: ['Nën 500€', 'Mes 500–2000€', 'Mbi 2000€'],
        });
    }

    // ── 9. KATEGORIA ─────────────────────────────────────────────
    _category(msg) {
        const cats = [
            { keys: ['fustan', 'dress', 'gala fustan', 'kreacion femror', 'mbrëmje'], category: 'evening', label: 'Fustane Elegante' },
            { keys: ['ver', 'vere', 'verore', 'summer', 'plazh'], category: 'summer', label: 'Koleksioni Veror' },
            { keys: ['formal', 'kostum', 'smoking', 'biznes kostum', 'tuxedo'], category: 'formal', label: 'Veshje Formale' },
            { keys: ['casual', 'pallto', 'xhaket', 'triko', 'perditshm'], category: 'casual', label: 'Stili Casual' },
            { keys: ['aksesor', 'cante', 'shall', 'ore luksoz', 'bizhu'], category: 'accessories', label: 'Aksesorë Luksoz' },
            { keys: ['kepuce', 'taka', 'mokasin', 'cizme'], category: 'shoes', label: 'Artizanat Këpucësh' },
        ];

        for (const c of cats) {
            if (has(msg, c.keys)) {
                const prods = PRODUCTS.filter(p => p.category === c.category).sort((a, b) => b.rating - a.rating);
                this.ctx.lastProducts = prods;
                this.ctx.lastCategory = c.category;
                return reply(
                    `**${c.label}** — ${prods.length} kreacione ekskluzive nga koleksioni Luciano, të qepura me dorë me materiale premium:`,
                    {
                        products: prods.slice(0, 4),
                        suggestions: [`Filtro sipas çmimit`, 'Bestsellers', 'Made to Measure'],
                    }
                );
            }
        }
        return null;
    }

    // ── 10. KËRKIM PRODUKTESH ────────────────────────────────────
    _productSearch(msg, raw) {
        // Kërkim i drejtpërdrejtë
        let found = PRODUCTS.filter(p =>
            has(p.name, [msg]) ||
            has(p.description, [msg]) ||
            p.tags.some(t => has(msg, [t]))
        );

        // Kërkim me fjalë individuale
        if (found.length === 0) {
            const words = msg.split(/\s+/).filter(w => normalize(w).length > 3);
            found = PRODUCTS.filter(p =>
                words.some(w => has(p.name, [w]) || has(p.category, [w]) || p.tags.some(t => has(t, [w])))
            );
        }

        if (found.length === 0) return null;

        this.ctx.lastProducts = found;

        if (found.length === 1) {
            const p = found[0];
            return reply(
                `Gjeta pikërisht atë që kërkoni!\n\n**"${p.name}"**\n${p.description}\n\n💰 Çmimi: **${p.price.toLocaleString()}€** | ⭐ Vlerësimi: ${p.rating}/5 (${p.reviews} komente)\n\nKlikoni produktin për të parë madhësitë dhe ngjyrat e disponueshme.`,
                { products: [p], suggestions: ['Produkte të ngjashme', 'Shto në shportë', 'Bëj rezervim'] }
            );
        }

        return reply(
            `Gjeta **${found.length} kreacione** që përputhen me kërkimin tuaj:`,
            { products: found.slice(0, 4), suggestions: ['Filtro sipas çmimit', 'Shiko të gjitha'] }
        );
    }

    // ── 11. FAQ ──────────────────────────────────────────────────
    _faq(msg) {
        for (const faq of FAQ_DATABASE) {
            if (faq.keywords.some(kw => has(msg, [kw]))) {
                return reply(faq.answer, {
                    suggestions: ['Porosi e re', 'Kontaktoni ekspertin', 'Shiko produktet'],
                });
            }
        }
        return null;
    }

    // ── 12. INFORMACION BRANDI ───────────────────────────────────
    _brandInfo(msg) {
        if (has(msg, ['histori', 'themelua', 'kur u krijua', 'kush e krijoi', 'founder', 'kur lindi'])) {
            return reply(
                `**Historia e Luciano** ✦\n\n${BRAND_KNOWLEDGE.history}\n\nKryedizajneri aktual: **${BRAND_KNOWLEDGE.currentDesigner}**\n${BRAND_KNOWLEDGE.designerBio}\n\n🏆 Çmimet: ${BRAND_KNOWLEDGE.awards}`,
                { suggestions: ['Filozofia', 'Koleksionet', 'Butiqet'] }
            );
        }

        if (has(msg, ['filozofi', 'vlera', 'pse luciano', 'mision', 'besimi', 'cilesi'])) {
            return reply(
                `**Filozofia Luciano** ✦\n\n*"${BRAND_KNOWLEDGE.philosophy}"*\n\nNë Luciano, çdo veshje ndiqet nga artizani deri tek ju. Kemi zero kompromis ndaj cilësisë — nëse nuk është perfekt, nuk del nga atelieri ynë.\n\n🌿 Certifikuar nga **Responsible Wool Standard** dhe **B-Corp**`,
                { suggestions: ['Historia', 'Koleksionet', 'Butiqet'] }
            );
        }

        if (has(msg, ['koleksion', 'collection', 'notte', 'primavera', 'uomo', 'sezon', 'c\'keni', 'cfare keni'])) {
            const colList = COLLECTIONS.map((c, i) =>
                `**${i + 1}. ${c.name}** *(${c.season})* — ${c.subtitle}`
            ).join('\n');

            const featured = COLLECTIONS.flatMap(c => PRODUCTS.filter(p => c.productIds.includes(p.id))).slice(0, 4);
            this.ctx.lastProducts = featured;

            return reply(
                `Koleksionet aktuale të **Luciano 2026**:\n\n${colList}\n\nÇilin koleksion dëshironi të eksploroni?`,
                {
                    products: featured,
                    suggestions: COLLECTIONS.map(c => c.name),
                }
            );
        }

        if (has(msg, ['rreth luciano', 'about', 'brand', 'shtepia', 'cfare eshte luciano'])) {
            return reply(
                `**Shtëpia e Modës Luciano** ✦\n\n📅 Themeluar: **${BRAND_KNOWLEDGE.founded}**\n🏠 Origjina: **${BRAND_KNOWLEDGE.origin}**\n✂️ Themeluesit: **${BRAND_KNOWLEDGE.founder}**\n🎨 Dizajneri Kryesor: **${BRAND_KNOWLEDGE.currentDesigner}**\n🌍 Butiqet: ${BRAND_KNOWLEDGE.stores}\n\n*"${BRAND_KNOWLEDGE.philosophy}"*`,
                { suggestions: ['Historia', 'Filozofia', 'Koleksionet', 'Butiqet'] }
            );
        }

        return null;
    }

    // ── 13. REZERVIMI ────────────────────────────────────────────
    _reservation(msg) {
        if (!has(msg, ['rezervo', 'rezervim', 'takim', 'prove', 'appointment', 'book', 'vizite private', 'takim privat'])) return null;

        return reply(
            `**Rezervimi i Takimit Privat Luciano** ✦\n\nKemi tre mënyra për rezervim:\n\n**1. 📞 Telefon:**\n• Firence: +39 055 123 4567\n• Milano: +39 02 345 6789\n\n**2. 📧 Email:**\n• reservations@luciano-fashion.com\n\n**3. 💬 WhatsApp:**\n• +39 333 123 4567\n\n⏰ *E Hënë–E Shtunë, 10:00–20:00*\n\nGjatë vizitës private do të keni konsultim personal, akses ekskluziv në showroom dhe shampanjë Luciano 🥂`,
            { suggestions: ['Oraret', 'Butiqet', 'Koleksionet'] }
        );
    }

    // ── 14. KOMPLIMENT ───────────────────────────────────────────
    _compliment(msg) {
        if (!has(msg, ['faleminderit', 'shkelqyeshme', 'fantastike', 'perfect', 'e mrekullueshme', 'bravo', 'excellent', 'bukur', 'thank you', 'thanks', 'shume mire', 'mirepo', 'cmoj'])) return null;

        const responses = [
            `Faleminderit sinqerisht! 🌹 Është kënaqësia ime t'ju shoqëroj në udhëtimin tuaj të stilit. A ka diçka tjetër me të cilën mund t'ju ndihmoj?`,
            `Shumë mirë prej jush! Jam e lumtur që qe e dobishme. Si mund t'ju shërbej tjetër?`,
            `Faleminderit! Shtëpia Luciano vlerëson çdo klient. Si mund t'ju ndihmoj tjetër?`,
        ];
        const i = this.ctx.turnCount % responses.length;
        return reply(responses[i], { suggestions: ['Vazhdo blerjen', 'Shiko të reja', 'Koleksionet'] });
    }

    // ── 15. NEGATIV / ANKESË ─────────────────────────────────────
    _negative(msg) {
        if (!has(msg, ['nuk funksionon', 'problem', 'gabim', 'ankese', 'pakënaqur', 'keq', 'nuk pelqen', 'eshte keq', 'nuk eshte mire'])) return null;

        return reply(
            `Më vjen shumë keq! 🙏 Ndjehem e obliguar t'ju ndihmoj ta zgjidhim menjëherë.\n\nJu lutem më tregoni konkretisht çfarë nuk funksionoi dhe do të gjejmë zgjidhjen bashkë.\n\nMundësisht, ekipi ynë i mbështetjes:\n📧 support@luciano-fashion.com\n📞 +39 055 123 4567\n\nNë Luciano, çdo klient meriton trajtim të shkëlqyer.`,
            { suggestions: ['Politika kthimit', 'Kontaktoni ekipin'] }
        );
    }

    // ── 16. VAZHDIM ───────────────────────────────────────────────
    _continuation(msg) {
        if (has(msg, ['po', 'ok', 'vazhdo', 'me intereson', 'po me intereson', 'trego me shumë', 'me trego'])) {
            if (this.ctx.lastProducts.length > 0) {
                return reply(
                    `Shkëlqyer! Ja edhe disa kreacione nga koleksioni ynë:`,
                    { products: this.ctx.lastProducts.slice(0, 4), suggestions: ['Filtro sipas çmimit', 'Trego më shumë'] }
                );
            }
        }

        if (has(msg, ['jo', 'tjeter', 'tjetër', 'nje tjeter', 'diqka tjeter'])) {
            const alt = PRODUCTS.filter(p => !this.ctx.lastProducts.map(x => x.id).includes(p.id)).slice(0, 4);
            if (alt.length > 0) {
                return reply(
                    `Sigurisht! Ja alternativa të tjera nga koleksioni ynë:`,
                    { products: alt, suggestions: ['Filtro sipas kategorisë', 'Bestsellers'] }
                );
            }
        }

        return null;
    }

    // ── 17. DEFAULT INTELIGJENT ──────────────────────────────────
    _default(msg) {
        // Produkt i gjetur rastësisht bazuar në fjalë kyçe të mbetura
        const quick = PRODUCTS.find(p =>
            p.tags.some(t => normalize(t).length > 3 && normalize(msg).includes(normalize(t)))
        );

        if (quick) {
            this.ctx.lastProducts = [quick];
            return reply(
                `Mendoj se po kërkoni **"${quick.name}"** — ja produkti:\n\n_${quick.description}_`,
                { products: [quick], suggestions: ['Shiko detajet', 'Produkte të ngjashme', 'Shto në shportë'] }
            );
        }

        // Default për mesazhe që nuk kuptohen (gabime, gibberish, tekst i pakuptimtë)
        const newProds = PRODUCTS.filter(p => p.isNew).sort(() => Math.random() - 0.5);
        this.ctx.lastProducts = newProds;

        return reply(
            `Më falni, por nuk e kuptova këtë kërkesë. Mund të jeni pak më e qartë? 🧐\n\nSi asistentja juaj, mund t'ju ndihmoj me informacion për **koleksionet**, **fustanet gala**, **çmimet**, ose të kërkoj diçka specifike për ju.`,
            {
                products: newProds.slice(0, 3),
                suggestions: ['Shiko koleksionet', 'Bestsellers', 'Fustan mbrëmjeje', 'Rreth Luciano'],
            }
        );
    }


    // ── Trigger manual nga butonat e sugjerimeve ─────────────────
    async triggerTopic(topic) {
        const map = {
            'Shiko koleksionet': () => this._brandInfo('koleksion'),
            'Koleksionet': () => this._brandInfo('koleksion'),
            'Fustan mbrëmjeje': () => this._category('fustan'),
            'Bestsellers': () => {
                const p = PRODUCTS.filter(x => x.isBestseller).sort((a, b) => b.reviews - a.reviews);
                this.ctx.lastProducts = p;
                return reply('**Bestsellers Luciano** — kreacionet më të dashuara nga klientët tanë globalë:', { products: p.slice(0, 4), suggestions: ['Shiko të gjitha', 'Të rejat', 'Filtro'] });
            },
            'Rreth Luciano': () => this._brandInfo('rreth luciano'),
            'Produktet e reja': () => {
                const p = PRODUCTS.filter(x => x.isNew);
                this.ctx.lastProducts = p;
                return reply('Kreacionet **më të reja** nga Luciano:', { products: p.slice(0, 4), suggestions: ['Bestsellers', 'Koleksionet'] });
            },
            'Çmimet': () => this._budget('cmim'),
            'Nën 500€': () => {
                const p = PRODUCTS.filter(x => x.price < 500).sort((a, b) => a.price - b.price);
                this.ctx.lastProducts = p;
                return reply('Kreacionet Luciano **nën 500€** — elegancë e dostupueshme:', { products: p.slice(0, 4), suggestions: ['Shiko të gjitha', 'Bestsellers'] });
            },
            'Mes 500–2000€': () => {
                const p = PRODUCTS.filter(x => x.price >= 500 && x.price <= 2000).sort((a, b) => b.rating - a.rating);
                this.ctx.lastProducts = p;
                return reply('Kreacionet Luciano **mes 500–2000€** — ekuilibri perfekt mes cilësisë dhe çmimit:', { products: p.slice(0, 4) });
            },
            'Mbi 2000€': () => {
                const p = PRODUCTS.filter(x => x.price > 2000).sort((a, b) => b.rating - a.rating);
                this.ctx.lastProducts = p;
                return reply('Koleksioni **Ultra-Luksoz** mbi 2000€ — artizanat i pakrahasueshëm:', { products: p.slice(0, 4) });
            },
            'Made to Measure': () => reply(`Shërbimi **"Made to Measure"** i Luciano:\n\n✂️ Çdo veshje krijohet sipas masave tuaja eksakte\n⏱️ Koha e prodhimit: 4–6 javë\n💰 Çmimi: +40% mbi çmimin standard\n🎨 Personalizim i plotë: ngjyrë, material, detaje, monogram\n\nPër të nisur procesin, rezervoni takim me stilistin tonë.`, { suggestions: ['Rezervo takim', 'Butiqet'] }),
            'Rezervo takim': () => this._reservation('rezervo'),
            'Oraret': () => this._schedule('orar'),
            'Butiqet': () => this._location('butik'),
            'Politika kthimit': () => this._faq('kthim'),
            'Koleksioni Veror': () => this._category('vere'),
        };

        const handler = map[topic];
        if (handler) {
            const result = handler();
            return result ?? this.processMessage(topic);
        }
        return this.processMessage(topic);
    }
}

// Instanca singleton — e vetme në aplikacion
const lundra = new LundraAgent();
export default lundra;