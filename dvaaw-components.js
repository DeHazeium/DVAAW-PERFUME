/**
 * D'Vaaw Components — Single source of truth
 * Injects: Nav, Footer, Cookie Banner
 * Handles: Cart badge, scroll shrink, mobile menu, cookie consent, scroll reveal
 *
 * Add to EVERY page:
 *   <head>  →  <link rel="stylesheet" href="dvaaw-components.css">
 *   </body> →  <script src="dvaaw-components.js"></script>
 */
(function () {

    /* ─────────────────────────────────
       AUTO-DETECT ACTIVE PAGE
    ───────────────────────────────── */
    const page = window.location.pathname.split('/').pop() || 'index.html';
    function isActive(href) { return page === href; }
    function navA(href, label, extraStyle) {
        const active = isActive(href) ? ' style="color:#d4af37;"' : (extraStyle ? ` style="${extraStyle}"` : '');
        return `<a href="${href}"${active}>${label}</a>`;
    }

    /* ─────────────────────────────────
       1. INJECT NAV
    ───────────────────────────────── */
    const nav = document.createElement('div');
    nav.innerHTML = `
<nav id="main-nav">
    <div class="nav-links">
        ${navA('category-her.html',    'For Her')}
        ${navA('category-him.html',    'For Him')}
        ${navA('category-unisex.html', 'Unisex')}
        ${navA('category-borneo.html', 'Borneo Edition')}
    </div>
    <div class="logo"><a href="index.html">D'VAAW</a></div>
    <div class="nav-icons">
        ${navA('about.html', 'About Us')}
        <a href="cart.html" class="cart-icon-wrap">Cart<span class="cart-badge" id="cart-badge"></span></a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
    </button>
</nav>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <button class="mobile-menu-close" id="mobile-close" aria-label="Close menu">&#x2715;</button>
    <div class="mobile-menu-logo">D'VAAW</div>
    <div class="mobile-menu-divider"></div>
    ${navA('category-her.html',    'For Her')}
    ${navA('category-him.html',    'For Him')}
    ${navA('category-unisex.html', 'Unisex')}
    ${navA('category-borneo.html', 'Borneo Edition')}
    ${navA('about.html',           'About Us')}
    <a href="cart.html">Cart</a>
</div>`;
    document.body.insertBefore(nav.firstElementChild, document.body.firstChild);
    // insert mobile menu right after nav
    const mainNav = document.getElementById('main-nav');
    mainNav.after(nav.firstElementChild);

    /* ─────────────────────────────────
       2. INJECT FOOTER
    ───────────────────────────────── */
    const footer = document.createElement('footer');
    footer.id = 'main-footer';
    footer.innerHTML = `
    <div class="footer-columns">
        <div class="footer-col">
            <h4>Shop</h4>
            <ul>
                <li><a href="shop-all.html">All Products</a></li>
                <li><a href="category-her.html">For Her</a></li>
                <li><a href="category-him.html">For Him</a></li>
                <li><a href="category-unisex.html">Unisex</a></li>
                <li><a href="category-borneo.html">Borneo Edition</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Information</h4>
            <ul>
                <li><a href="about.html">Our Story</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="shipping.html">Shipping &amp; Returns</a></li>
                <li><a href="privacy.html">Privacy Policy</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Connect</h4>
            <ul>
                <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
                <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
                <li><a href="https://tiktok.com" target="_blank">TikTok</a></li>
                <li><a href="https://wa.me/601118866239" target="_blank">WhatsApp Us</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 D'Vaaw Perfume. All rights reserved.</p>
        <div class="footer-socials">
            <a href="https://instagram.com" target="_blank">Instagram</a>
            <a href="https://facebook.com" target="_blank">Facebook</a>
            <a href="https://tiktok.com" target="_blank">TikTok</a>
        </div>
    </div>`;
    document.body.appendChild(footer);

    /* ─────────────────────────────────
       3. INJECT COOKIE BANNER
    ───────────────────────────────── */
    const cookie = document.createElement('div');
    cookie.className = 'cookie-banner';
    cookie.id = 'cookie-banner';
    cookie.innerHTML = `
    <p>We use localStorage to save your shopping cart. No tracking cookies. <a href="privacy.html">Privacy Policy</a></p>
    <div class="cookie-btns">
        <button class="cookie-accept" id="cookie-accept">Got it</button>
        <button class="cookie-decline" id="cookie-decline">Dismiss</button>
    </div>`;
    document.body.appendChild(cookie);


    /* ─────────────────────────────────
       4. INJECT TOAST NOTIFICATION
    ───────────────────────────────── */
    const toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.className = 'toast-notification';
    toast.innerHTML = '<span class="toast-icon">✓</span><span>Item Added To Cart</span>';
    document.body.appendChild(toast);

    // Expose globally so triggerAddToCart on any page can use it
    window.showToast = function(msg) {
        const t = document.getElementById('custom-toast');
        if (!t) return;
        t.querySelector('span:last-child').textContent = msg || 'Item Added To Cart';
        t.classList.remove('show');
        // Force reflow so animation re-triggers even if toast is already visible
        void t.offsetWidth;
        t.classList.add('show');
        clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
    };

    /* ─────────────────────────────────
       5. CART BADGE
    ───────────────────────────────── */
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('dvaaw_cart')) || [];
        const total = cart.reduce((s, i) => s + (i.qty || 0), 0);
        document.querySelectorAll('.cart-badge').forEach(b => {
            b.textContent = total;
            b.classList.toggle('show', total > 0);
        });
    }
    updateCartBadge();
    window.addEventListener('storage', e => { if (e.key === 'dvaaw_cart') updateCartBadge(); });

    /* ─────────────────────────────────
       6. NAV SCROLL SHRINK
    ───────────────────────────────── */
    window.addEventListener('scroll', () => {
        const n = document.getElementById('main-nav');
        if (n) n.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ─────────────────────────────────
       7. MOBILE MENU
    ───────────────────────────────── */
    const hb = document.getElementById('hamburger');
    const mm = document.getElementById('mobile-menu');
    const mc = document.getElementById('mobile-close');

    function openMenu()  { hb.classList.add('open'); mm.classList.add('open'); mm.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { hb.classList.remove('open'); mm.classList.remove('open'); mm.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

    if (hb) hb.addEventListener('click', () => mm.classList.contains('open') ? closeMenu() : openMenu());
    if (mc) mc.addEventListener('click', closeMenu);
    if (mm) mm.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    /* ─────────────────────────────────
       8. COOKIE CONSENT
    ───────────────────────────────── */
    function hideCookie() {
        const b = document.getElementById('cookie-banner');
        if (b) b.classList.remove('show');
    }
    if (!localStorage.getItem('dvaaw_cookie_consent')) {
        setTimeout(() => {
            const b = document.getElementById('cookie-banner');
            if (b) b.classList.add('show');
        }, 1600);
    }
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('dvaaw_cookie_consent', 'accepted'); hideCookie();
    });
    document.getElementById('cookie-decline')?.addEventListener('click', () => {
        localStorage.setItem('dvaaw_cookie_consent', 'declined'); hideCookie();
    });

    /* ─────────────────────────────────
       9. SCROLL REVEAL
    ───────────────────────────────── */
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
            .forEach(el => obs.observe(el));

})();
