/**
 * D'Vaaw Components — Single source of truth
 * Change this file → updates EVERY page instantly.
 * 
 * Usage: Add this to the <head> of every page:
 *   <link rel="stylesheet" href="dvaaw-components.css">
 * And before </body>:
 *   <script src="dvaaw-components.js"></script>
 */

(function () {

    /* ─────────────────────────────────────────
       1. INJECT NAV
    ───────────────────────────────────────── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    function navLink(href, label) {
        const active = currentPage === href ? ' style="color:#d4af37;"' : '';
        return `<a href="${href}"${active}>${label}</a>`;
    }

    const navHTML = `
    <nav id="main-nav">
        <div class="nav-links">
            ${navLink('category-her.html',    'For Her')}
            ${navLink('category-him.html',    'For Him')}
            ${navLink('category-unisex.html', 'Unisex')}
            ${navLink('category-borneo.html', 'Borneo Edition')}
        </div>
        <div class="logo"><a href="index.html" style="color:inherit;">D'Vaaw</a></div>
        <div class="nav-icons">
            ${navLink('about.html', 'About Us')}
            <a href="cart.html" class="cart-icon-wrap">
                Cart<span class="cart-badge" id="cart-badge"></span>
            </a>
        </div>
        <div class="hamburger" id="hamburger">
            <span></span><span></span><span></span>
        </div>
    </nav>

    <div class="mobile-menu" id="mobile-menu">
        <button class="mobile-menu-close" id="mobile-close" aria-label="Close menu">&#x2715;</button>
        <div class="mobile-menu-logo">D'Vaaw</div>
        <div class="mobile-menu-divider"></div>
        ${navLink('category-her.html',    'For Her')}
        ${navLink('category-him.html',    'For Him')}
        ${navLink('category-unisex.html', 'Unisex')}
        ${navLink('category-borneo.html', 'Borneo Edition')}
        ${navLink('about.html',           'About Us')}
        <a href="cart.html">Cart</a>
    </div>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    /* ─────────────────────────────────────────
       2. INJECT FOOTER
    ───────────────────────────────────────── */
    const footerHTML = `
    <footer id="main-footer">
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
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('beforeend', footerHTML);

    /* ─────────────────────────────────────────
       3. INJECT COOKIE BANNER
    ───────────────────────────────────────── */
    const cookieHTML = `
    <div class="cookie-banner" id="cookie-banner">
        <p>We use localStorage to save your shopping cart. No tracking cookies. <a href="privacy.html">Privacy Policy</a></p>
        <div class="cookie-btns">
            <button class="cookie-accept" id="cookie-accept">Got it</button>
            <button class="cookie-decline" id="cookie-decline">Dismiss</button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', cookieHTML);

    /* ─────────────────────────────────────────
       4. CART BADGE COUNTER
    ───────────────────────────────────────── */
    function updateCartBadge() {
        const cart  = JSON.parse(localStorage.getItem('dvaaw_cart')) || [];
        const total = cart.reduce((s, i) => s + i.qty, 0);
        document.querySelectorAll('.cart-badge').forEach(b => {
            b.textContent = total;
            b.classList.toggle('show', total > 0);
        });
    }
    updateCartBadge();

    // Re-run when cart changes in another tab
    window.addEventListener('storage', e => { if (e.key === 'dvaaw_cart') updateCartBadge(); });

    /* ─────────────────────────────────────────
       5. NAV SCROLL SHRINK
    ───────────────────────────────────────── */
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ─────────────────────────────────────────
       6. MOBILE MENU LOGIC
    ───────────────────────────────────────── */
    const hb = document.getElementById('hamburger');
    const mm = document.getElementById('mobile-menu');
    const mc = document.getElementById('mobile-close');

    function closeMenu() {
        hb.classList.remove('open');
        mm.classList.remove('open');
        document.body.style.overflow = '';
    }

    hb.addEventListener('click', () => {
        hb.classList.toggle('open');
        mm.classList.toggle('open');
        document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
    });

    mm.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    if (mc) mc.addEventListener('click', closeMenu);

    /* ─────────────────────────────────────────
       7. COOKIE CONSENT LOGIC
    ───────────────────────────────────────── */
    function dismissCookie() {
        const b = document.getElementById('cookie-banner');
        if (b) b.classList.remove('show');
    }

    if (!localStorage.getItem('dvaaw_cookie_consent')) {
        setTimeout(() => {
            const b = document.getElementById('cookie-banner');
            if (b) b.classList.add('show');
        }, 1500);
    }

    document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('dvaaw_cookie_consent', 'accepted');
        dismissCookie();
    });

    document.getElementById('cookie-decline')?.addEventListener('click', () => {
        localStorage.setItem('dvaaw_cookie_consent', 'declined');
        dismissCookie();
    });

    /* ─────────────────────────────────────────
       8. SCROLL REVEAL
    ───────────────────────────────────────── */
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 90);
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
            .forEach(el => revealObs.observe(el));

})();
