/**
 * Deepali Minerals B2B Portal - Presentation & Dynamic Routing Controller
 * Phase 4: B2B Buyer Experience + Industry / Application Discovery
 * Preserves the exact approved Codex mineral visual design system.
 */

(function () {
  'use strict';

  // Deployment-Aware Robots Policy (Preview-Only SEO Control)
  (function applyDeploymentRobotsPolicy() {
    if (typeof window === 'undefined' || !window.location) return;
    var host = (window.location.hostname || '').toLowerCase();
    if (host === 'preview.deepaliminerals.in') {
      var existing = document.querySelector('meta[name="robots"]');
      if (!existing) {
        var meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex,nofollow';
        document.head.appendChild(meta);
      } else {
        existing.setAttribute('content', 'noindex,nofollow');
      }
    }
  })();

  // Enforce Clean Bright White Theme System Tokens
  (function enforceWhiteThemeTokens() {
    if (typeof document === 'undefined') return;
    const rootEl = document.documentElement;
    if (rootEl) {
      rootEl.style.setProperty('--paper', '#FFFFFF');
      rootEl.style.setProperty('--surface', '#FFFFFF');
      rootEl.style.setProperty('--fog', '#F8F9FA');
      rootEl.style.setProperty('--line', '#E5E7EB');
      rootEl.style.setProperty('--ink', '#25241F');
      rootEl.style.setProperty('--slate', '#6F6B61');
      rootEl.style.backgroundColor = '#FFFFFF';
    }
    const applyBody = () => {
      if (document.body) {
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.color = '#25241F';
      }
    };
    applyBody();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyBody);
    }
  })();

  const data = window.DeepaliData;
  const root = document.body ? (document.body.dataset.root || '.') : '.';
  const page = document.body.dataset.page;
  const esc = (value) => String(value || '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  
  const whatsappIconSvg = (w = 16, h = 16) => `
    <svg class="whatsapp-icon" viewBox="0 0 24 24" width="${w}" height="${h}" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.24 16.01C12.83 16.27 13.28 16.42 13.64 16.53C14.23 16.72 14.77 16.69 15.2 16.63C15.68 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 13.98C16.32 13.86 15.12 13.27 14.9 13.19C14.68 13.1 14.52 13.06 14.36 13.3C14.19 13.55 13.73 14.09 13.59 14.25C13.45 14.41 13.31 14.43 13.07 14.31C12.82 14.18 11.78 13.84 10.56 12.75C9.61 11.9 8.97 10.86 8.84 10.64C8.72 10.42 8.83 10.3 8.95 10.18C9.06 10.07 9.2 9.89 9.32 9.75C9.45 9.61 9.49 9.5 9.57 9.34C9.65 9.17 9.61 9.03 9.55 8.91C9.49 8.78 9.03 7.65 8.84 7.2C8.65 6.75 8.46 6.82 8.32 6.81C8.18 6.81 8.02 6.81 7.85 6.81"/>
    </svg>
  `;

  const getWhatsAppUrl = (msg) => {
    const rawNumber = (data && data.company && data.company.whatsappNumber) || '919810516065';
    const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '') || '919810516065';
    const text = msg || 'Hello Deepali Minerals, I would like to discuss my industrial mineral requirement.';
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const productUrl = (product, industryCtx, appCtx, routeCtx) => {
    let url = `${root}/product.html?product=${encodeURIComponent(product.slug || product.id)}`;
    if (industryCtx) url += `&industry=${encodeURIComponent(industryCtx)}`;
    if (appCtx) url += `&app=${encodeURIComponent(appCtx)}`;
    if (routeCtx) url += `&route=${encodeURIComponent(routeCtx)}`;
    return url;
  };
  const productsUrl = `${root}/products/`;
  const industriesUrl = `${root}/industries/`;

  function header() {
    const nav = [
      ['Home', `${root}/`],
      ['Products', productsUrl],
      ['Industries & Applications', industriesUrl],
      ['Technical Resources', `${root}/#resources`],
      ['About Deepali Minerals', `${root}/about.html`],
      ['Contact', `${root}/#contact`]
    ];
    const links = nav.map(([label, href]) => {
      let isActive = false;
      if (page === 'products' && label === 'Products') isActive = true;
      if (page === 'industries' && label === 'Industries & Applications') isActive = true;
      if (page === 'about' && label === 'About Deepali Minerals') isActive = true;
      return `<a href="${href}" class="${isActive ? 'active' : ''}">${label}</a>`;
    }).join('');
    
    const headerEl = document.querySelector('#site-header');
    if (!headerEl) return;

    headerEl.innerHTML = `
      <div class="topline"></div>
      <header class="site-header">
        <div class="shell header-inner">
          <a class="brand dm-interactive-logo" href="${root}/" aria-label="Deepali Minerals home" data-dm-logo="true">
            <img src="${root}/assets/images/brand/logo.png" alt="Deepali Minerals" class="brand-logo" width="200" height="100" referrerpolicy="no-referrer" />
          </a>
          <nav class="nav-links" aria-label="Primary navigation">${links}</nav>
          <div class="header-actions">
            <a class="header-whatsapp" href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sales Desk">
              ${whatsappIconSvg(15, 15)}
              <span>WhatsApp Sales Desk</span>
            </a>
            <a class="button header-cta" href="${root}/#rfq">Quotation</a>
            <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
          </div>
        </div>
        <nav class="shell mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          ${links}
          <a class="mobile-whatsapp" href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer">
            ${whatsappIconSvg(18, 18)}
            <span>WhatsApp Sales Desk</span>
          </a>
          <a class="button" href="${root}/#rfq">Quotation</a>
        </nav>
      </header>
    `;

    const toggle = document.querySelector('.menu-toggle');
    if (toggle) {
      toggle.addEventListener('click', e => {
        const menu = document.querySelector('.mobile-nav');
        const open = menu.classList.toggle('open');
        e.currentTarget.setAttribute('aria-expanded', open);
        e.currentTarget.textContent = open ? 'Close' : 'Menu';
      });
    }
  }

  // Global Reusable DM Interactive Logo Controller
  function initGlobalDMInteractiveLogos() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let popover = document.getElementById('dm-global-logo-popover');
    if (!popover) {
      popover = document.createElement('div');
      popover.id = 'dm-global-logo-popover';
      popover.className = 'dm-global-logo-popover';
      popover.setAttribute('aria-hidden', 'true');
      popover.innerHTML = `
        <video
          class="brand-animated-video"
          muted
          playsinline
          preload="none"
        >
          <source src="${root}/Cinematic_logo_animation_script_1080p_20260928120021.mp4" type="video/mp4" />
        </video>
        <button type="button" class="brand-video-close" aria-label="Close animation" tabindex="-1">×</button>
      `;
      document.body.appendChild(popover);
    }

    const video = popover.querySelector('video');
    const closeBtn = popover.querySelector('.brand-video-close');
    let activeLogo = null;
    let leaveTimer = null;
    let isPlaying = false;
    let isTouch = false;

    function positionPopover(logoEl) {
      const rect = logoEl.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let targetWidth = 480;
      if (vw < 520) {
        targetWidth = Math.min(420, vw - 24);
      } else if (vw < 768) {
        targetWidth = Math.min(440, vw - 32);
      } else {
        targetWidth = Math.min(480, vw - 32);
      }
      const targetHeight = Math.round(targetWidth * (9 / 16));

      // Intelligently position relative to the hovered logo
      // If near viewport bottom (e.g. footer), show above the logo
      // If near top (e.g. header), show below the logo
      const spaceBelow = vh - rect.bottom;
      const spaceAbove = rect.top;
      let top = 0;

      if (spaceBelow >= targetHeight + 12) {
        top = rect.bottom + 8;
      } else if (spaceAbove >= targetHeight + 12) {
        top = rect.top - targetHeight - 8;
      } else {
        top = Math.max(12, Math.min(vh - targetHeight - 12, rect.top + (rect.height - targetHeight) / 2));
      }

      // Horizontal alignment: align with logo left edge, then clamp safely in viewport
      let left = rect.left;
      if (left + targetWidth > vw - 16) {
        left = vw - 16 - targetWidth;
      }
      if (left < 16) {
        left = 16;
      }

      popover.style.top = `${Math.round(top)}px`;
      popover.style.left = `${Math.round(left)}px`;
      popover.style.width = `${Math.round(targetWidth)}px`;
    }

    function showAndPlay(logoEl) {
      clearTimeout(leaveTimer);
      if (activeLogo !== logoEl || !isPlaying) {
        activeLogo = logoEl;
        positionPopover(logoEl);
        popover.classList.add('is-active');
        popover.setAttribute('aria-hidden', 'false');
        isPlaying = true;
        try {
          video.currentTime = 0;
        } catch (_) {}
        const p = video.play();
        if (p !== undefined) p.catch(() => {});
      }
    }

    function hideAndStop() {
      clearTimeout(leaveTimer);
      if (isPlaying) {
        popover.classList.remove('is-active');
        popover.setAttribute('aria-hidden', 'true');
        isPlaying = false;
        activeLogo = null;
        setTimeout(() => {
          if (!isPlaying) {
            try {
              video.pause();
              video.currentTime = 0;
            } catch (_) {}
          }
        }, 300);
      }
    }

    video.addEventListener('ended', () => {
      hideAndStop();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        hideAndStop();
      });
    }

    popover.addEventListener('mouseenter', () => {
      if (isTouch) return;
      clearTimeout(leaveTimer);
    });

    popover.addEventListener('mouseleave', () => {
      if (isTouch) return;
      leaveTimer = setTimeout(() => {
        hideAndStop();
      }, 250);
    });

    function getLogoElement(target) {
      if (!target || !(target instanceof Element)) return null;
      if (target.closest('#dm-global-logo-popover')) return null;
      return target.closest('[data-dm-logo="true"], .dm-interactive-logo, .brand-logo, .brand-logo-footer, img[src*="brand/logo"]');
    }

    // Delegated hover events for all current and future logo instances
    document.addEventListener('mouseover', (e) => {
      if (isTouch) return;
      const logoEl = getLogoElement(e.target);
      if (logoEl) {
        clearTimeout(leaveTimer);
        showAndPlay(logoEl);
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (isTouch) return;
      const logoEl = getLogoElement(e.target);
      if (logoEl && activeLogo === logoEl) {
        leaveTimer = setTimeout(() => {
          hideAndStop();
        }, 250);
      }
    });

    // Touch / Mobile delegation
    document.addEventListener('touchstart', (e) => {
      isTouch = true;
      const logoEl = getLogoElement(e.target);
      if (isPlaying && !popover.contains(e.target) && (!logoEl || logoEl !== activeLogo)) {
        hideAndStop();
      }
    }, { passive: true });

    document.addEventListener('click', (e) => {
      if (!isTouch) return;
      const logoEl = getLogoElement(e.target);
      if (logoEl) {
        if (!isPlaying || activeLogo !== logoEl) {
          e.preventDefault();
          showAndPlay(logoEl);
        }
      }
    });

    window.addEventListener('resize', () => {
      if (isPlaying && activeLogo) {
        positionPopover(activeLogo);
      }
    });

    window.addEventListener('scroll', () => {
      if (isPlaying && activeLogo) {
        positionPopover(activeLogo);
      }
    }, { passive: true });
  }

  // Persistent Back-to-Top Floating Arrow Controller
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top-btn');
    if (!btn || btn.dataset.initialized === 'true') return;
    btn.dataset.initialized = 'true';

    let ticking = false;
    const updateVisibility = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollY >= 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    updateVisibility();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    });
  }

  function footer() {
    const footerEl = document.querySelector('#site-footer');
    if (!footerEl) return;

    const company = data.company || {};

    // Contextual message for floating WhatsApp button
    let floatingMsg = 'Hello Deepali Minerals, I would like to discuss my industrial mineral requirement.';
    if (page === 'product') {
      const params = new URLSearchParams(location.search);
      const slug = params.get('product');
      const p = data.getProductBySlug(slug);
      if (p) {
        floatingMsg = `Hello Deepali Minerals, I would like to discuss my requirement for ${p.name}.`;
      }
    }
    const floatingWhatsAppUrl = getWhatsAppUrl(floatingMsg);
    const whatsappGeneralUrl = getWhatsAppUrl();

    footerEl.innerHTML = `
      <a class="contact-float" href="${root}/#rfq" aria-label="Open quotation">Quotation</a>
      <button type="button" class="back-to-top-btn" aria-label="Back to top" title="Back to top">
        <svg class="back-to-top-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
      <a class="dm-floating-whatsapp" href="${floatingWhatsAppUrl}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sales Desk">
        ${whatsappIconSvg(20, 20)}
        <span class="floating-label">WhatsApp Sales Desk</span>
      </a>
      <footer class="footer" id="contact">
        <div class="shell footer-grid">
          <!-- COLUMN 1: DEEPALI MINERALS -->
          <div class="footer-col footer-col-brand">
            <a class="brand dm-interactive-logo" href="${root}/" aria-label="Deepali Minerals home" data-dm-logo="true">
              <img src="${root}/assets/images/brand/logo.png" alt="Deepali Minerals" class="brand-logo-footer" width="200" height="100" referrerpolicy="no-referrer" />
            </a>
            <p class="footer-tagline">${company.tagline || 'Industrial materials, clearly connected.'}</p>
            <p class="footer-desc">
              Reliable processor, manufacturer, and bulk supplier of non-metallic industrial minerals and functional chemical extenders since 2004. B2B material supply for industrial manufacturing across India and worldwide.
            </p>
            <div class="footer-meta-box">
              <p><strong>CEO:</strong> ${company.ceo || 'Mr. Neeraj Monga (CEO)'}</p>
              <p><strong>GST:</strong> ${company.gstNumber || '07AIMPM0458Q1ZL'}</p>
              <p><strong>Business:</strong> Industrial Minerals • B2B Supply</p>
            </div>
          </div>

          <!-- COLUMN 2: MATERIALS -->
          <div class="footer-col">
            <h3>Materials</h3>
            <div class="footer-links-list">
              <a href="${root}/product.html?product=talc">Talc</a>
              <a href="${root}/product.html?product=soap-stone">Soap Stone</a>
              <a href="${root}/product.html?product=chalk-powder">Chalk Powder</a>
              <a href="${root}/product.html?product=hydrated-lime">Hydrated Lime</a>
              <a href="${root}/product.html?product=china-clay">China Clay</a>
              <a href="${root}/product.html?product=kaoline">Kaoline</a>
              <a href="${root}/product.html?product=marble-powder">Marble Powder</a>
              <a href="${root}/product.html?product=quartz-powder">Quartz Powder</a>
              <a href="${root}/product.html?product=calcium-carbonate">Calcium Carbonate</a>
              <a href="${root}/product.html?product=titanium-dioxide">Titanium Di Oxide</a>
              <a href="${root}/product.html?product=quartz-sand">Quartz Sand</a>
              <a href="${root}/product.html?product=marble-chips">Marble Chips</a>
              <a href="${root}/product.html?product=barytes">Barytes</a>
              <a href="${root}/product.html?product=french-chalk-powder">French Chalk Powder</a>
              <a href="${root}/product.html?product=starch">Starch</a>
              <a href="${productsUrl}" class="footer-accent-link">View All 22 Materials →</a>
            </div>
          </div>

          <!-- COLUMN 3: INDUSTRIES & APPLICATIONS -->
          <div class="footer-col">
            <h3>Industries &amp; Applications</h3>
            <div class="footer-links-list">
              <a href="${productsUrl}?industry=Paints">Paints</a>
              <a href="${productsUrl}?industry=Plastic">Plastics</a>
              <a href="${productsUrl}?industry=Rubber">Rubber</a>
              <a href="${productsUrl}?industry=Master%20Batch">Masterbatch</a>
              <a href="${productsUrl}?industry=PVC">PVC</a>
              <a href="${productsUrl}?industry=Paper">Paper</a>
              <a href="${productsUrl}?industry=Ceramics">Ceramics</a>
              <a href="${productsUrl}?industry=Cosmetics">Cosmetics</a>
              <a href="${productsUrl}?industry=Pharmaceutical">Pharmaceutical</a>
              <a href="${productsUrl}?industry=Soap">Soap &amp; Detergent</a>
              <a href="${productsUrl}?industry=Footwear">Footwear</a>
              <a href="${productsUrl}?industry=Cables">Cables</a>
              <a href="${productsUrl}?industry=Construction">Construction</a>
              <a href="${productsUrl}?industry=FRP">FRP</a>
              <a href="${industriesUrl}" class="footer-accent-link">Explore Industries →</a>
            </div>
          </div>

          <!-- COLUMN 4: BUY / TECHNICAL -->
          <div class="footer-col">
            <h3>Buy / Technical</h3>
            <div class="footer-links-list">
              <a href="${root}/#materials">Find Your Material</a>
              <a href="${root}/#rfq">Quotation</a>
              <a href="${root}/#resources">Technical Resources</a>
              <a href="${productsUrl}">Product Catalogue</a>
              <a href="${root}/about.html">About Deepali Minerals</a>
              <a href="${root}/#contact">Commercial Desk</a>
              <a href="${whatsappGeneralUrl}" target="_blank" rel="noopener noreferrer" class="footer-whatsapp-link">
                ${whatsappIconSvg(14, 14)} WhatsApp Sales Desk
              </a>
            </div>
          </div>

          <!-- COLUMN 5: CONTACT -->
          <div class="footer-col footer-col-contact">
            <h3>Contact</h3>
            <div class="footer-contact-details">
              <p>
                <strong class="footer-lbl">Email:</strong><br />
                <a href="mailto:${company.emailSales || 'info@deepaliminerals.in'}">${company.emailSales || 'info@deepaliminerals.in'}</a>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Phone:</strong><br />
                <a href="tel:+919810516065">9810516065</a>, <a href="tel:+919810715129">9810715129</a>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Office:</strong><br />
                <span>${company.headquarters || 'C2/29C Lawrence Road, Keshav Puram, Delhi-110035'}</span>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Hours:</strong><br />
                <span>${company.businessHours || 'Monday – Saturday: 9:00 AM – 7:30 PM IST'}</span>
              </p>
              <div style="margin-top: .85rem;">
                <a href="${whatsappGeneralUrl}" target="_blank" rel="noopener noreferrer" class="footer-whatsapp-btn">
                  ${whatsappIconSvg(15, 15)}
                  <span>WhatsApp Sales Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="shell footer-bottom">
          <div class="footer-bottom-left">
            <span>© ${new Date().getFullYear()} Deepali Minerals. All rights reserved.</span>
            <span class="footer-sep">•</span>
            <span>Industrial B2B Material Supply &amp; Technical Discovery</span>
          </div>
          <div class="footer-bottom-right">
            <a href="${root}/sitemap.xml" target="_blank" rel="noopener">Sitemap (XML)</a>
            <span class="footer-sep">•</span>
            <a href="${root}/#rfq">Quotation</a>
            <span class="footer-sep">•</span>
            <a href="${whatsappGeneralUrl}" target="_blank" rel="noopener noreferrer">WhatsApp Desk</a>
          </div>
        </div>
      </footer>
    `;

    initBackToTop();
  }

  const productCard = (p, industryCtx, appCtx, routeCtx) => `
    <article class="product-card">
      <div class="product-visual" aria-hidden="true"></div>
      <span class="eyebrow">${esc(p.category)}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.shortDescription)}</p>
      
      ${p.applications && p.applications.length ? `
        <div style="margin-top: .5rem; font-size: .78rem; color: var(--slate); line-height: 1.4;">
          <strong style="color: var(--ink); font-family: var(--mono); font-size: .7rem; text-transform: uppercase;">Key Uses:</strong>
          <span style="display: block; margin-top: .2rem;">${esc(p.applications.slice(0, 2).join(' • '))}</span>
        </div>
      ` : ''}

      <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--line);">
        <a class="text-link" href="${productUrl(p, industryCtx, appCtx, routeCtx)}">View specs <span aria-hidden="true">→</span></a>
        <a class="button alt" style="padding: .4rem .75rem; font-size: .7rem;" href="${productUrl(p, industryCtx, appCtx, routeCtx)}#rfq">Quotation</a>
      </div>
    </article>
  `;

  const applicationCard = (app) => {
    const productsHtml = (app.products || []).map(slug => {
      const p = data.getProductBySlug(slug);
      if (!p) return '';
      return `
        <a href="${productUrl(p, null, app.title)}" class="pill" style="font-size: .75rem; font-weight: 600; padding: .35rem .75rem;">
          ${esc(p.name)} →
        </a>
      `;
    }).filter(Boolean).join('');

    const whatsappMsg = app.id === 'fire-safety'
      ? 'Hello Deepali Minerals, I would like to enquire about mineral materials (Calcium Carbonate, Talc, Hydrated Lime) for Fire Safety applications.'
      : 'Hello Deepali Minerals, I would like to enquire about Magnesium Carbonate for Gym Powder / sports-grip applications.';

    const defaultNotes = app.id === 'fire-safety'
      ? '[Application: Fire Safety] Intended fire-safety application, required material & technical requirements: '
      : '[Application: Gym Powder] Intended application, required grade/specifications & packaging preference: ';

    const ctaHref = app.id === 'gym-powder'
      ? `${root}/product.html?product=magnesium-carbonate&app=${encodeURIComponent(app.title)}#rfq`
      : '#rfq';

    return `
      <article class="industry-card application-card" id="app-${app.id}">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: .5rem; margin-bottom: .4rem;">
            <span class="category-index" style="color: var(--terracotta, #A84E2B); font-weight: 700;">APPLICATION</span>
            <span style="font: 700 .68rem var(--mono); color: var(--slate); text-transform: uppercase; background: var(--fog); padding: .2rem .5rem; border: 1px solid var(--line);">Discovery Card</span>
          </div>
          
          <h3 style="margin-top: .2rem; margin-bottom: .25rem;">${esc(app.title)}</h3>
          <div style="font: 600 .82rem var(--mono); color: var(--terracotta, #A84E2B); margin-bottom: .75rem;">${esc(app.subtitle)}</div>
          
          <p style="color: var(--ink); font-size: .88rem; line-height: 1.5; margin-bottom: 1rem;">
            ${esc(app.cardDescription)}
          </p>

          <div style="margin: .85rem 0 1rem;">
            <span style="font: 600 .7rem var(--mono); color: var(--slate); text-transform: uppercase; display: block; margin-bottom: .45rem;">
              ${app.products.length > 1 ? 'Compatible Materials (Linked Pages):' : 'Compatible Material (Linked Page):'}
            </span>
            <div class="pill-list">
              ${productsHtml}
            </div>
          </div>

          <div style="margin-bottom: 1rem; padding: .75rem; background: var(--fog); border: 1px solid var(--line); font-size: .78rem; line-height: 1.45; color: var(--slate);">
            <strong style="color: var(--ink); display: block; margin-bottom: .2rem;">Technical Qualification:</strong>
            ${esc(app.disclaimer)}
          </div>

          <div style="margin-bottom: 1.25rem;">
            <span style="font: 600 .7rem var(--mono); color: var(--slate); text-transform: uppercase; display: block; margin-bottom: .35rem;">Buyer Enquiry Details Captured:</span>
            <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: .25rem; font-size: .75rem; color: var(--slate);">
              ${app.enquiryFields.map(f => `<li style="display: flex; gap: .35rem; align-items: center;"><span style="color: var(--blue);">•</span> <span>${esc(f)}</span></li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="display: flex; gap: .5rem; flex-wrap: wrap; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--line);">
          <a href="${ctaHref}" class="button" style="flex: 1; min-width: 190px; padding: .65rem .85rem; font-size: .72rem; text-align: center;" onclick="prefillApplicationRfq('${esc(app.title)}', '${app.ctaProduct}', '${esc(defaultNotes)}')">
            ${esc(app.ctaText)}
          </a>
          <a href="https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}" target="_blank" rel="noopener noreferrer" class="button alt" style="padding: .65rem .85rem; font-size: .72rem; display: inline-flex; align-items: center; gap: .35rem;">
            ${whatsappIconSvg(13, 13)}
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </article>
    `;
  };

  const rfq = (selectedProduct, prefillContext) => {
    const currentProd = selectedProduct ? selectedProduct.name : '';
    const ctx = prefillContext || {};
    const defaultApp = ctx.application || (selectedProduct && selectedProduct.applications && selectedProduct.applications[0] ? selectedProduct.applications[0] : '');
    
    let defaultNotes = '';
    if (ctx.industry) defaultNotes += `[Industry / Manufacturing Sector: ${ctx.industry}] `;
    if (ctx.application) defaultNotes += `[Application: ${ctx.application}] `;
    if (ctx.route) defaultNotes += `[Discovery Path: ${ctx.route}] `;
    if (ctx.requirementText) defaultNotes += `[Requirement: "${ctx.requirementText}"] `;
    if (ctx.notes) defaultNotes += `${ctx.notes} `;

    return `
      <aside class="rfq-preview" id="rfq">
        <span class="eyebrow" style="color:var(--aqua)">B2B Procurement Request</span>
        <h2 class="section-title">Quotation</h2>
        <p>Submit your industrial material requirement. Our Lawrence Road commercial desk will review parameters and provide competitive wholesale terms.</p>
        
        <form data-rfq>
          <div class="rfq-grid-layout">
            
            <div class="rfq-full">
              <label>Material / Mineral *</label>
              <select name="product" required>
                <option value="">Select a material</option>
                ${data.products.map(p => `
                  <option value="${esc(p.name)}" ${p.name === currentProd ? 'selected' : ''}>${esc(p.name)} (${esc(p.category)})</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label>Target Application / Manufacturing Process</label>
              <input type="text" name="application" value="${esc(defaultApp)}" placeholder="e.g. Rigid PVC Pipes, Wall Putty, EVA Soles">
            </div>

            <div>
              <label>Estimated Quantity *</label>
              <input type="text" name="quantity" placeholder="e.g. 15 MT / Full Truckload (FTL)" required>
            </div>

            <div>
              <label>Packaging Preference</label>
              <select name="packaging">
                <option value="50 Kg PP Bags">50 Kg PP Woven Bags (Standard Wholesale)</option>
                <option value="25 Kg Paper / HDPE">25 Kg Paper / HDPE Bags</option>
                <option value="1 MT Jumbo Bags">1000 Kg (1 MT) Jumbo Bags</option>
                <option value="Custom / Palletized">Palletized Export Packaging</option>
              </select>
            </div>

            <div>
              <label>Delivery Destination / Depot *</label>
              <input type="text" name="destination" placeholder="City / State / Port" required>
            </div>

            <div>
              <label>Company Name *</label>
              <input type="text" name="company" placeholder="Manufacturing / Trading Entity" required>
            </div>

            <div>
              <label>Contact Person *</label>
              <input type="text" name="contactPerson" placeholder="Full Name" required>
            </div>

            <div>
              <label>Mobile / WhatsApp *</label>
              <input type="tel" name="phone" placeholder="+91-98765-43210" required>
            </div>

            <div>
              <label>Company Email *</label>
              <input type="email" name="email" placeholder="purchase@company.com" required>
            </div>

            <div class="rfq-full">
              <label>Specification Requirement / Grade Details</label>
              <input type="text" name="notes" value="${esc(defaultNotes)}" placeholder="Specify mesh size, whiteness, or technical compound requirements...">
            </div>

          </div>

          <button class="button" type="submit" style="width: 100%; margin-top: 1.25rem;">Submit Quotation to Sales Desk</button>
          
          <div class="rfq-feedback" style="display:none;"></div>
        </form>
      </aside>
    `;
  };

  /* =========================================================================
   * HOMEPAGE
   * ========================================================================= */
  function home() {
    const featured = data.products.slice(0, 6);
    const industries = data.industries.slice(0, 8);

    document.querySelector('#main').innerHTML = `
      <!-- Hero Section -->
      <section class="hero" id="hero">
        <div class="hero-video-wrap" data-hero-video-click="true" title="Click to toggle facility video sound">
          <video
            class="hero-video"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            aria-label="Deepali Minerals industrial manufacturing facility video"
          >
            <source src="${root}/hero%20video%20DM%20watermark%20(1).mp4" type="video/mp4" />
          </video>
          <div class="hero-overlay"></div>
        </div>

        <!-- Floating Audio Control Badge on Hero Video -->
        <div class="hero-floating-sound">
          <div class="hero-sound-card">
            <button
              type="button"
              class="hero-sound-pill"
              data-hero-audio-toggle="true"
              aria-label="Play facility video sound"
              aria-pressed="false"
              title="Click to play facility video sound"
            >
              <span class="hero-sound-pulse-dot" aria-hidden="true"></span>
              <span class="hero-audio-icon" aria-hidden="true">
                <svg class="sound-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              </span>
              <span class="hero-audio-label">Play Video Sound</span>
              <span class="sound-bars" aria-hidden="true">
                <span class="bar bar-1"></span>
                <span class="bar bar-2"></span>
                <span class="bar bar-3"></span>
              </span>
            </button>
            <div class="hero-volume-wrap" title="Adjust volume">
              <input
                type="range"
                class="hero-volume-slider"
                min="0"
                max="1"
                step="0.05"
                value="1"
                aria-label="Facility video volume"
              />
              <span class="hero-volume-label">100%</span>
            </div>
          </div>
        </div>

        <div class="shell hero-inner">
          <div class="hero-copy">
            <span class="eyebrow">Deepali Minerals • Certified Industrial Processing &amp; Dispatch</span>
            <h1 class="display">INDUSTRIAL MINERALS<br>FOR DEMANDING APPLICATIONS</h1>
            <p class="lede">Materials • Supply • Technical Information • B2B Enquiries</p>
            <div class="hero-actions">
              <a class="button" href="${productsUrl}">EXPLORE MATERIALS</a>
              <a class="button alt" href="#rfq">QUOTATION</a>
              <button
                type="button"
                class="button hero-sound-btn"
                data-hero-audio-toggle="true"
                aria-label="Play facility video sound"
                aria-pressed="false"
                title="Click to play facility video sound"
              >
                <span class="hero-audio-icon" aria-hidden="true">
                  <svg class="sound-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                </span>
                <span class="hero-audio-label">Play Video Sound</span>
                <span class="sound-bars" aria-hidden="true">
                  <span class="bar bar-1"></span>
                  <span class="bar bar-2"></span>
                  <span class="bar bar-3"></span>
                </span>
              </button>
            </div>
          </div>
          <div class="hero-aside">
            <span class="eyebrow">Designed for Procurement</span>
            <p>Explore verified minerals, map manufacturing applications, and begin commercial discussions with accurate technical context.</p>
          </div>
        </div>
      </section>

      <!-- Find Your Material Discovery Engine -->
      <div class="shell material-strip" id="materials">
        <div class="discovery-engine-box">
          <div class="discovery-engine-head">
            <h2 class="discovery-title">
              <span class="dm-interactive-logo" data-dm-logo="true" style="display: inline-block; vertical-align: middle; cursor: pointer;">
                <img src="${root}/assets/images/brand/logo.png" alt="Deepali Minerals" style="height: 28px; width: auto; vertical-align: middle; margin-right: .5rem; display: inline-block; object-fit: contain; border-radius: 4px;" referrerpolicy="no-referrer" />
              </span>
              Find Your Material
            </h2>
            <div class="discovery-mode-nav">
              <button type="button" class="discovery-mode-btn active" id="btn-mode-guided">1. Guided Discovery</button>
              <button type="button" class="discovery-mode-btn" id="btn-mode-freetext">2. Describe Requirement</button>
            </div>
          </div>

          <!-- Mode 1: Guided Discovery -->
          <div id="panel-guided" class="discovery-panel">
            <form id="discovery-guided-form" class="discovery-grid-form">
              <div class="discovery-field-group">
                <label for="discovery-question-select">What are you looking for?</label>
                <select id="discovery-question-select">
                  <option value="material">What material do you need?</option>
                  <option value="manufacturing">What are you manufacturing?</option>
                  <option value="industry">Which industry are you in?</option>
                  <option value="application">What application is the material for?</option>
                  <option value="filler">Do you need a filler or extender?</option>
                  <option value="white">Do you need a white mineral?</option>
                  <option value="micronized">Do you need a fine/micronized powder?</option>
                  <option value="particle">Do you need a specific particle size?</option>
                  <option value="plastics">Do you need a material for plastics?</option>
                  <option value="paints">Do you need a material for paints/coatings?</option>
                  <option value="rubber">Do you need a material for rubber?</option>
                  <option value="cosmetics">Do you need a material for cosmetics?</option>
                  <option value="pharma">Do you need a material for pharmaceutical applications?</option>
                  <option value="pvc">Do you need a material for PVC?</option>
                  <option value="ceramics">Do you need a material for ceramics?</option>
                  <option value="construction">Do you need a material for construction?</option>
                  <option value="paper">Do you need a material for paper?</option>
                  <option value="cables">Do you need a material for cables?</option>
                  <option value="custom">I have a specific requirement</option>
                </select>
              </div>

              <div class="discovery-field-group" id="discovery-dynamic-field-group">
                <label id="discovery-dynamic-label" for="discovery-dynamic-select">Select Material</label>
                <div id="discovery-dynamic-input-container">
                  <select id="discovery-dynamic-select">
                    <!-- Populated dynamically -->
                  </select>
                </div>
              </div>

              <div>
                <button type="submit" class="button" style="width: 100%;">Discover Materials</button>
              </div>
            </form>

            <div class="discovery-quick-links">
              <strong>Popular routes:</strong>
              <button type="button" class="discovery-quick-btn" data-set-q="pvc">PVC Manufacturing</button>
              <button type="button" class="discovery-quick-btn" data-set-q="paints">Paints & Coatings</button>
              <button type="button" class="discovery-quick-btn" data-set-q="rubber">Rubber Compounding</button>
              <button type="button" class="discovery-quick-btn" data-set-q="cosmetics">Cosmetic Formulations</button>
              <button type="button" class="discovery-quick-btn" data-set-q="white">White Minerals</button>
            </div>
          </div>

          <!-- Mode 2: Free-Text Requirement Search -->
          <div id="panel-freetext" class="discovery-panel" style="display: none;">
            <form id="discovery-freetext-form">
              <div class="discovery-field-group">
                <label for="discovery-freetext-input">Describe your requirement in natural language</label>
                <div style="display: grid; grid-template-columns: 1fr auto; gap: .75rem;">
                  <input id="discovery-freetext-input" type="text" placeholder="e.g. Need fine white mineral filler for PVC compound, or high brightness powder for wall putty..." autocomplete="off">
                  <button type="submit" class="button">Find Materials</button>
                </div>
              </div>
            </form>

            <div class="discovery-quick-links">
              <strong>Examples:</strong>
              <button type="button" class="discovery-quick-btn" data-freetext-example="White mineral powder for plastic manufacturing">"White mineral powder for plastic manufacturing"</button>
              <button type="button" class="discovery-quick-btn" data-freetext-example="Looking for mineral filler for PVC compound">"Mineral filler for PVC compound"</button>
              <button type="button" class="discovery-quick-btn" data-freetext-example="Need fine powder for paint application">"Need fine powder for paint application"</button>
            </div>
          </div>

          <!-- Discovery Results Container -->
          <div id="discovery-results" class="discovery-results-section" style="display: none;">
            <div class="discovery-results-header">
              <div>
                <span class="discovery-results-badge" id="discovery-results-badge">POTENTIALLY RELEVANT MATERIALS</span>
                <span id="discovery-results-count" style="font: 500 .75rem var(--mono); color: var(--slate); margin-left: .5rem;"></span>
              </div>
              <div class="discovery-active-criteria" id="discovery-active-criteria"></div>
            </div>

            <div class="discovery-grid" id="discovery-results-grid"></div>

            <div style="margin-top: 1.5rem; text-align: right;">
              <a href="${productsUrl}" class="text-link" id="discovery-view-all-link">View all 22 materials in full catalogue →</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <section>
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Explore by Material Category</span>
              <h2 class="section-title">A catalogue built around clearer decisions.</h2>
            </div>
            <a class="text-link" href="${productsUrl}">View all 22 products →</a>
          </div>
          <div class="category-grid">
            ${data.categories.map((c, i) => `
              <article class="category">
                <span class="category-index">0${i + 1}</span>
                <div>
                  <h3>${c.name}</h3>
                  <p>${c.description}</p>
                </div>
                <a href="${productsUrl}?category=${encodeURIComponent(c.name)}" class="text-link">Explore ${c.name} →</a>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Featured Minerals Section -->
      <section class="featured">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Source Catalogue</span>
              <h2 class="section-title">Featured Industrial Materials</h2>
            </div>
            <p class="lede">Product technical data is displayed only where verified. Unverified parameters are available on request.</p>
          </div>
          <div class="product-grid">
            ${featured.map(p => productCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- What Are You Manufacturing? Industry Discovery -->
      <section id="industries">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Application Discovery</span>
              <h2 class="section-title">What are you manufacturing?</h2>
            </div>
            <p class="lede">Discover mineral fillers and additives aligned with your manufacturing sector.</p>
          </div>
          <div class="industry-grid">
            ${industries.map((name, i) => `
              <a href="${productsUrl}?industry=${encodeURIComponent(name)}" class="industry">
                <span>${String(i + 1).padStart(2, '0')}</span>
                <h3>${esc(name)}</h3>
              </a>
            `).join('')}
          </div>
          <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <a href="${industriesUrl}" class="button alt">Explore All 38 Manufacturing Sectors →</a>
            <a href="${productsUrl}" class="text-link">View all catalogue materials →</a>
          </div>

          <!-- Discover by Application (Specialized Formulations) -->
          <div style="margin-top: 3.5rem; padding-top: 2.5rem; border-top: 1px solid var(--line);">
            <div class="section-head">
              <div>
                <span class="eyebrow">Application Discovery</span>
                <h2 class="section-title">Discover by Application</h2>
              </div>
              <p class="lede">Explore mineral materials relevant to specialized industrial applications. Deepali Minerals' application-discovery section helps buyers identify materials and enquire about technical specifications and availability.</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
              ${(data.getApplicationCategories ? data.getApplicationCategories() : []).map(app => applicationCard(app)).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- The Deepali Approach -->
      <section class="why" id="why">
        <div class="shell">
          <span class="eyebrow" style="color:var(--aqua)">The Deepali Approach</span>
          <h2 class="section-title">A more useful industrial sourcing conversation.</h2>
          <div class="why-grid" style="margin-top:2.5rem">
            <article class="why-card">
              <b>01 / Discover</b>
              <h3>Start with the material</h3>
              <p>Find the material category and specific commercial product that matches your formulation requirements.</p>
            </article>
            <article class="why-card">
              <b>02 / Clarify</b>
              <h3>Bring technical context</h3>
              <p>Technical fields are reserved for approved data and discussed directly without synthetic or unverified claims.</p>
            </article>
            <article class="why-card">
              <b>03 / Enquire</b>
              <h3>Move to a Quotation</h3>
              <p>Make a focused business enquiry with application, quantity, and packaging context for rapid sales desk pricing.</p>
            </article>
          </div>
          <div style="margin-top: 2.25rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px;">
            <div>
              <strong style="color: #ffffff; display: block; font-size: 1rem; margin-bottom: .25rem;">About Deepali Minerals (Est. 2004)</strong>
              <span style="color: var(--aqua); font-size: .84rem;">Explore our comprehensive company profile, statutory factsheet, quality testing parameters, and Lawrence Road logistics hub.</span>
            </div>
            <a href="${root}/about.html" class="button" style="background: var(--aqua); color: var(--navy); border-color: var(--aqua);">Explore Full Company Profile →</a>
          </div>
        </div>
      </section>

      <!-- Technical Material Library -->
      <section id="resources">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Technical Material Library</span>
              <h2 class="section-title">Documentation & Quality Control</h2>
            </div>
            <p class="lede">A document framework ready for approved technical material sheets and test certificates.</p>
          </div>
          <div class="resource-grid">
            <article class="resource">
              <span>RESOURCE / 01</span>
              <h3>Technical Data Sheets (TDS)</h3>
              <p>Technical specifications and standard physical parameters. Technical document available on request.</p>
              <a href="#rfq" class="text-link">Request TDS →</a>
            </article>
            <article class="resource">
              <span>RESOURCE / 02</span>
              <h3>Certificate of Analysis (COA)</h3>
              <p>Batch-specific assay and sieve certificates supplied with commercial consignments.</p>
              <a href="#rfq" class="text-link">Request COA Sample →</a>
            </article>
            <article class="resource">
              <span>RESOURCE / 03</span>
              <h3>Product Catalogue</h3>
              <p>Comprehensive 22-product portfolio with packaging and application indices.</p>
              <a href="${productsUrl}" class="text-link">Explore Catalogue →</a>
            </article>
          </div>
        </div>
      </section>

      <!-- Ready CTA -->
      <section class="cta">
        <div class="shell cta-inner">
          <div>
            <span class="eyebrow">Direct Commercial Desk</span>
            <h2 class="section-title">Need to discuss a material requirement?</h2>
            <p>Send an enquiry with your product, application, quantity, and delivery context for direct wholesale pricing.</p>
          </div>
          <a class="button" href="#rfq">Quotation</a>
        </div>
      </section>

      <!-- Qualified RFQ Section -->
      <section>
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow">Qualified Enquiries</span>
            <h2 class="section-title">Bring the requirements that matter.</h2>
            <p class="lede">Product, intended application, grade or specification requirement, quantity, packaging preference, and delivery location are the useful starting points for commercial discussions.</p>
            <div style="margin-top: 2rem;">
              <p style="font-size: .88rem; color: var(--slate); line-height: 1.6;">
                <strong>CEO:</strong> Mr. Neeraj Monga<br>
                <strong>Lawrence Road Depot:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035.<br>
                <strong>Direct Sales Line:</strong> <a href="tel:+919810516065" style="color: var(--blue); font-weight: 700;">9810516065</a>, <a href="tel:+919810715129" style="color: var(--blue); font-weight: 700;">9810715129</a><br>
                <strong>Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: var(--blue);">info@deepaliminerals.in</a><br>
                <strong>GST:</strong> 07AIMPM0458Q1ZL
              </p>
            </div>
          </div>
          ${rfq()}
        </div>
      </section>
    `;

    bindDiscoveryEngine();
    bindRfq();
    bindHeroVideoAudio();
  }

  /* =========================================================================
   * HERO VIDEO AUDIO CONTROLLER
   * ========================================================================= */
  function bindHeroVideoAudio() {
    const video = document.querySelector('.hero-video');
    const toggleBtns = document.querySelectorAll('[data-hero-audio-toggle]');
    const soundCard = document.querySelector('.hero-sound-card');
    const volumeSlider = document.querySelector('.hero-volume-slider');
    const volumeLabel = document.querySelector('.hero-volume-label');
    const videoWrap = document.querySelector('[data-hero-video-click]');
    if (!video || !toggleBtns.length) return;

    const mutedSvg = `
      <svg class="sound-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    `;

    const playingSvg = `
      <svg class="sound-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    `;

    const syncUI = (isMuted) => {
      toggleBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', (!isMuted).toString());
        btn.classList.toggle('is-active', !isMuted);

        const iconEl = btn.querySelector('.hero-audio-icon');
        if (iconEl) {
          iconEl.innerHTML = isMuted ? mutedSvg : playingSvg;
        }

        const labelEl = btn.querySelector('.hero-audio-label');
        if (labelEl) {
          const isPill = btn.classList.contains('hero-sound-pill');
          if (isPill) {
            labelEl.textContent = isMuted ? 'Play Video Sound' : 'Sound On (Mute)';
          } else {
            labelEl.textContent = isMuted ? 'Play Video Sound' : 'Mute Video Sound';
          }
        }

        btn.setAttribute('title', isMuted ? 'Click to play facility video sound' : 'Click to mute facility video sound');
        btn.setAttribute('aria-label', isMuted ? 'Play facility video sound' : 'Mute facility video sound');
      });

      if (soundCard) {
        soundCard.classList.toggle('has-audio-on', !isMuted);
      }

      if (volumeSlider) {
        volumeSlider.value = isMuted ? 0 : (video.volume || 1);
      }
      if (volumeLabel) {
        const pct = isMuted ? 0 : Math.round((video.volume || 1) * 100);
        volumeLabel.textContent = `${pct}%`;
      }
    };

    const toggleAudio = () => {
      if (video.muted) {
        video.muted = false;
        if (!video.volume || video.volume < 0.1) {
          video.volume = 1.0;
        }
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
        syncUI(false);
      } else {
        video.muted = true;
        syncUI(true);
      }
    };

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleAudio();
      });
    });

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        const val = parseFloat(e.target.value);
        video.volume = val;
        if (val > 0) {
          if (video.muted) {
            video.muted = false;
            const playPromise = video.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
          }
          syncUI(false);
        } else {
          video.muted = true;
          syncUI(true);
        }
      });
      volumeSlider.addEventListener('click', (e) => e.stopPropagation());
    }

    if (videoWrap) {
      videoWrap.addEventListener('click', (e) => {
        // Toggle if user clicks video area directly
        if (!e.target.closest('button, a, input, select, textarea, form')) {
          toggleAudio();
        }
      });
    }

    video.addEventListener('volumechange', () => {
      syncUI(video.muted);
    });

    // Initial state sync
    syncUI(video.muted);
  }

  /* =========================================================================
   * BUYER-INTENT MATERIAL DISCOVERY ENGINE CONTROLLER
   * ========================================================================= */
  function bindDiscoveryEngine() {
    const box = document.querySelector('.discovery-engine-box');
    if (!box) return;

    const btnGuided = document.querySelector('#btn-mode-guided');
    const btnFreetext = document.querySelector('#btn-mode-freetext');
    const panelGuided = document.querySelector('#panel-guided');
    const panelFreetext = document.querySelector('#panel-freetext');

    const questionSelect = document.querySelector('#discovery-question-select');
    const dynamicLabel = document.querySelector('#discovery-dynamic-label');
    const dynamicContainer = document.querySelector('#discovery-dynamic-input-container');
    const guidedForm = document.querySelector('#discovery-guided-form');

    const freetextForm = document.querySelector('#discovery-freetext-form');
    const freetextInput = document.querySelector('#discovery-freetext-input');

    const resultsSection = document.querySelector('#discovery-results');
    const resultsGrid = document.querySelector('#discovery-results-grid');
    const resultsCount = document.querySelector('#discovery-results-count');
    const activeCriteriaEl = document.querySelector('#discovery-active-criteria');
    const viewAllLink = document.querySelector('#discovery-view-all-link');

    // Mode Toggle
    function setMode(mode) {
      if (mode === 'freetext') {
        btnFreetext.classList.add('active');
        btnGuided.classList.remove('active');
        panelFreetext.style.display = 'block';
        panelGuided.style.display = 'none';
        if (freetextInput) freetextInput.focus();
      } else {
        btnGuided.classList.add('active');
        btnFreetext.classList.remove('active');
        panelGuided.style.display = 'block';
        panelFreetext.style.display = 'none';
      }
    }

    if (btnGuided) btnGuided.addEventListener('click', () => setMode('guided'));
    if (btnFreetext) btnFreetext.addEventListener('click', () => setMode('freetext'));

    // Dynamic Filter Generator for Guided Discovery
    function updateDynamicFilter() {
      const q = questionSelect ? questionSelect.value : 'material';

      if (q === 'material') {
        dynamicLabel.textContent = 'Select Material';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="">All 22 Catalogue Materials</option>
            ${data.products.map(p => `<option value="${esc(p.slug)}">${esc(p.name)} (${esc(p.category)})</option>`).join('')}
          </select>
        `;
      } else if (q === 'manufacturing' || q === 'industry') {
        dynamicLabel.textContent = 'Select Manufacturing Sector';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="">Select an industrial sector</option>
            ${data.industries.map(ind => `<option value="${esc(ind)}">${esc(ind)}</option>`).join('')}
          </select>
        `;
      } else if (q === 'application') {
        dynamicLabel.textContent = 'Select Specific Application';
        const apps = data.getCommonApplications ? data.getCommonApplications() : [];
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="">Select application area</option>
            ${apps.map(a => `<option value="${esc(a.term)}">${esc(a.label)}</option>`).join('')}
          </select>
        `;
      } else if (q === 'filler') {
        dynamicLabel.textContent = 'Functional Filler & Extender Category';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="filler">All Functional Fillers & Extenders</option>
            <option value="Mineral Powders">Mineral Powder Fillers</option>
            <option value="Functional Chemicals">Functional Additives & Chemicals</option>
          </select>
        `;
      } else if (q === 'white') {
        dynamicLabel.textContent = 'High-Whiteness & Brightness Materials';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="white">All High-Whiteness & Bright Mineral Grades</option>
            <option value="calcium-carbonate">Calcium Carbonate (GCC / PCC)</option>
            <option value="talc">Talc (High Whiteness)</option>
            <option value="marble-powder">Marble Powder (Super White)</option>
            <option value="dolomite-powder">Dolomite Powder (94-97% Whiteness)</option>
            <option value="kaoline">Kaoline (Calcined White)</option>
          </select>
        `;
      } else if (q === 'micronized' || q === 'particle') {
        dynamicLabel.textContent = 'Fine / Micronized Gradations';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="micronized">All Fine & Micronized Powders</option>
            <option value="1250">Superfine (up to 1250 Mesh)</option>
            <option value="500">Fine Industrial (300 to 500 Mesh)</option>
            <option value="200">Standard Milled (200 to 400 Mesh)</option>
          </select>
        `;
      } else if (['plastics', 'paints', 'rubber', 'cosmetics', 'pharma', 'pvc', 'ceramics', 'construction', 'paper', 'cables'].includes(q)) {
        const sectorNames = {
          plastics: 'Plastic',
          paints: 'Paints',
          rubber: 'Rubber',
          cosmetics: 'Cosmetics',
          pharma: 'Pharmaceutical',
          pvc: 'PVC',
          ceramics: 'Ceramics',
          construction: 'Construction',
          paper: 'Paper',
          cables: 'Cables'
        };
        const targetSector = sectorNames[q];
        dynamicLabel.textContent = `Target Compounding for ${targetSector}`;
        const matchingProds = data.getProductsByIndustry(targetSector);
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="${esc(targetSector)}">All ${matchingProds.length} Materials for ${targetSector}</option>
            ${matchingProds.map(p => `<option value="${esc(p.slug)}">${esc(p.name)}</option>`).join('')}
          </select>
        `;
      } else if (q === 'custom') {
        dynamicLabel.textContent = 'Describe Requirement';
        dynamicContainer.innerHTML = `
          <input type="text" id="discovery-dynamic-text" placeholder="Type your formulation or grade requirement..." style="padding:.7rem .85rem; font: 500 .9rem var(--sans); border: 1px solid var(--line); width:100%; background:var(--paper);" />
        `;
      }
    }

    if (questionSelect) {
      questionSelect.addEventListener('change', () => {
        updateDynamicFilter();
      });
      updateDynamicFilter();
    }

    // Quick links for guided questions
    document.querySelectorAll('[data-set-q]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qVal = btn.dataset.setQ;
        if (questionSelect) {
          questionSelect.value = qVal;
          updateDynamicFilter();
          executeGuidedDiscovery();
        }
      });
    });

    // Quick links for free-text examples
    document.querySelectorAll('[data-freetext-example]').forEach(btn => {
      btn.addEventListener('click', () => {
        setMode('freetext');
        if (freetextInput) {
          freetextInput.value = btn.dataset.freetextExample;
          executeFreetextDiscovery();
        }
      });
    });

    // Render Material Results
    function renderDiscoveryResults(productsList, criteriaDesc, routeContext) {
      if (!resultsSection || !resultsGrid) return;
      resultsSection.style.display = 'block';

      if (resultsCount) {
        resultsCount.textContent = `(${productsList.length} ${productsList.length === 1 ? 'material' : 'materials'})`;
      }
      if (activeCriteriaEl) {
        activeCriteriaEl.innerHTML = criteriaDesc ? `Showing matches for: <strong>${esc(criteriaDesc)}</strong>` : '';
      }

      if (!productsList.length) {
        resultsGrid.innerHTML = `
          <div class="empty" style="grid-column: 1 / -1; padding: 2.5rem; background: var(--fog); text-align: center;">
            <p style="font-weight: 700; color: var(--ink); margin-bottom: .5rem;">No exact matching materials found for this requirement.</p>
            <p style="font-size: .88rem; color: var(--slate); margin-bottom: 1rem;">Our Lawrence Road commercial desk sources and processes custom industrial mineral grades on request.</p>
            <a href="#rfq" class="button alt" style="margin-right: .5rem;">Submit Custom Quotation</a>
            <a href="${productsUrl}" class="button">Explore All 22 Materials</a>
          </div>
        `;
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      const indCtx = routeContext && routeContext.industry ? routeContext.industry : '';
      const appCtx = routeContext && routeContext.application ? routeContext.application : '';
      const rCtx = routeContext && routeContext.route ? routeContext.route : 'Find Your Material';

      resultsGrid.innerHTML = productsList.map(p => productCard(p, indCtx, appCtx, rCtx)).join('');
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Execution: Guided
    function executeGuidedDiscovery() {
      const q = questionSelect ? questionSelect.value : 'material';
      const dynamicSelect = document.querySelector('#discovery-dynamic-select');
      const dynamicTextInput = document.querySelector('#discovery-dynamic-text');
      const val = dynamicSelect ? dynamicSelect.value : (dynamicTextInput ? dynamicTextInput.value : '');

      let matched = [];
      let criteriaText = '';
      let routeContext = { route: `Guided Discovery: ${q}` };

      if (q === 'material') {
        if (val) {
          const p = data.getProductBySlug(val);
          matched = p ? [p] : data.products;
          criteriaText = p ? p.name : 'All Catalogue Materials';
        } else {
          matched = data.products;
          criteriaText = 'All 22 Catalogue Materials';
        }
      } else if (q === 'manufacturing' || q === 'industry') {
        if (val) {
          matched = data.getProductsByIndustry(val);
          criteriaText = `${val} Manufacturing Sector`;
          routeContext.industry = val;
        } else {
          matched = data.products;
          criteriaText = 'All Manufacturing Sectors';
        }
      } else if (q === 'application') {
        if (val) {
          matched = data.searchProducts(val);
          criteriaText = `Application: ${val}`;
          routeContext.application = val;
        } else {
          matched = data.products;
          criteriaText = 'All Applications';
        }
      } else if (q === 'filler') {
        if (val === 'Mineral Powders') {
          matched = data.getProductsByCategory('Mineral Powders');
          criteriaText = 'Mineral Powder Fillers';
        } else if (val === 'Functional Chemicals') {
          matched = data.getProductsByCategory('Functional Chemicals');
          criteriaText = 'Functional Additives & Chemicals';
        } else {
          matched = data.searchByRequirement('filler extender');
          criteriaText = 'Functional Fillers & Extenders';
        }
      } else if (q === 'white') {
        if (val && val !== 'white') {
          const p = data.getProductBySlug(val);
          matched = p ? [p] : data.searchByRequirement('white brightness');
          criteriaText = p ? `${p.name} (High Whiteness)` : 'White Minerals';
        } else {
          matched = data.searchByRequirement('white brightness marble carbonate talc dolomite kaoline');
          criteriaText = 'White & High-Brightness Minerals';
        }
      } else if (q === 'micronized' || q === 'particle') {
        if (val === '1250') {
          matched = data.products.filter(p => (p.specifications.mesh || '').includes('1250'));
          criteriaText = 'Superfine Powders (up to 1250 Mesh)';
        } else if (val === '500') {
          matched = data.products.filter(p => (p.specifications.mesh || '').includes('500'));
          criteriaText = 'Fine Industrial Powders (300 to 500 Mesh)';
        } else if (val === '200') {
          matched = data.products.filter(p => (p.specifications.mesh || '').includes('200') || (p.specifications.mesh || '').includes('400'));
          criteriaText = 'Standard Milled Grades (200 to 400 Mesh)';
        } else {
          matched = data.searchByRequirement('fine micron mesh micronized');
          criteriaText = 'Fine & Micronized Powders';
        }
      } else if (['plastics', 'paints', 'rubber', 'cosmetics', 'pharma', 'pvc', 'ceramics', 'construction', 'paper', 'cables'].includes(q)) {
        const sectorNames = {
          plastics: 'Plastic',
          paints: 'Paints',
          rubber: 'Rubber',
          cosmetics: 'Cosmetics',
          pharma: 'Pharmaceutical',
          pvc: 'PVC',
          ceramics: 'Ceramics',
          construction: 'Construction',
          paper: 'Paper',
          cables: 'Cables'
        };
        const targetSector = sectorNames[q];
        routeContext.industry = targetSector;
        if (val && val !== targetSector) {
          const p = data.getProductBySlug(val);
          matched = p ? [p] : data.getProductsByIndustry(targetSector);
          criteriaText = p ? `${p.name} for ${targetSector}` : `Materials for ${targetSector}`;
        } else {
          matched = data.getProductsByIndustry(targetSector);
          criteriaText = `Materials for ${targetSector}`;
        }
      } else if (q === 'custom') {
        if (val && val.trim()) {
          matched = data.searchByRequirement(val);
          criteriaText = `"${val}"`;
          routeContext.route = `Custom Requirement: "${val}"`;
        } else {
          matched = data.products;
          criteriaText = 'All Materials';
        }
      }

      renderDiscoveryResults(matched, criteriaText, routeContext);
    }

    // Execution: Free-Text
    function executeFreetextDiscovery() {
      const qText = freetextInput ? freetextInput.value.trim() : '';
      if (!qText) {
        renderDiscoveryResults(data.products, 'All Materials', { route: 'Free-text Search' });
        return;
      }

      const matched = data.searchByRequirement(qText);
      renderDiscoveryResults(matched, `"${qText}"`, { route: 'Describe Requirement', requirementText: qText });
    }

    if (guidedForm) {
      guidedForm.addEventListener('submit', e => {
        e.preventDefault();
        executeGuidedDiscovery();
      });
    }

    if (freetextForm) {
      freetextForm.addEventListener('submit', e => {
        e.preventDefault();
        executeFreetextDiscovery();
      });
    }
  }

  /* =========================================================================
   * INDUSTRIES & APPLICATIONS LANDING PAGE (`/industries/`)
   * ========================================================================= */
  function industries() {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;

    document.title = `Industries & Manufacturing Applications | Deepali Minerals`;

    const summary = data.getIndustrySummary ? data.getIndustrySummary() : [];
    const commonApps = data.getCommonApplications ? data.getCommonApplications() : [];
    const uncatalogued = data.getUncataloguedMaterials ? data.getUncataloguedMaterials() : [];

    mainEl.innerHTML = `
      <section class="page-hero">
        <div class="shell">
          <span class="eyebrow">Master Industry Taxonomy • ${summary.length} Manufacturing Sectors</span>
          <h1 class="display">What are you manufacturing?</h1>
          <p class="lede">Comprehensive centralized taxonomy digitized directly from technical source sheets. Discover verified industrial mineral fillers, extenders, pigments, and functional additives mapped to your specific compound formulation and processing requirements.</p>
        </div>
      </section>

      <!-- Application Quick Jump Strip -->
      <section style="background: var(--fog); padding: 2.5rem 0; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <span class="eyebrow" style="margin-bottom: .5rem;">Popular Manufacturing Applications (Quick Filter)</span>
          <div class="pill-list">
            ${commonApps.map(app => `
              <a href="${productsUrl}?search=${encodeURIComponent(app.term)}" class="pill" style="padding: .45rem .85rem; font-weight: 700;">
                ${esc(app.label)}
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Discover by Application Section -->
      <section class="applications-section" id="applications" style="padding: 3.5rem 0; background: var(--paper); border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Application Discovery</span>
              <h2 class="section-title">Discover by Application</h2>
            </div>
            <p class="lede">Explore mineral materials relevant to specialized industrial formulations and manufacturing applications. Deepali Minerals' application-discovery section helps buyers identify materials and enquire about technical specifications and availability.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem; margin-top: 1.75rem;">
            ${(data.getApplicationCategories ? data.getApplicationCategories() : []).map(app => applicationCard(app)).join('')}
          </div>
        </div>
      </section>

          <!-- Master Manufacturing Directory -->
      <section class="catalogue" id="sector-directory">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 1.5rem;">
            <div>
              <span class="eyebrow">Manufacturing Directory</span>
              <h2 class="section-title">${summary.length} Industrial Sectors & Applications</h2>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
              <a class="text-link" href="${productsUrl}">View all 22 products in catalogue →</a>
            </div>
          </div>

          <!-- Quick Directory Search & Filter -->
          <div style="margin-bottom: 2rem; padding: 1.25rem; background: var(--fog); border: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div style="flex: 1; min-width: 260px;">
              <label for="sector-quick-search" style="display: block; font: 700 .72rem var(--mono); text-transform: uppercase; color: var(--slate); margin-bottom: .35rem;">Search Manufacturing Sectors:</label>
              <input id="sector-quick-search" type="search" placeholder="Filter by sector name, application, or material (e.g. Putty, Polymers, Paints, Talc, Calcium Carbonate)..." style="width: 100%; padding: .65rem .85rem; border: 1px solid var(--line); font: 500 .85rem var(--sans); background: var(--paper);" />
            </div>
            <div style="font: 500 .75rem var(--mono); color: var(--slate);">
              Showing <span id="visible-sector-count" style="font-weight: 700; color: var(--ink);">${summary.length}</span> of ${summary.length} sectors
            </div>
          </div>

          <div id="sector-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
            ${summary.map((item, idx) => {
              const prof = item.profile;
              return `
              <article class="industry-card sector-item" data-sector-name="${esc(item.name.toLowerCase())}" data-sector-badge="${esc((item.badge || '').toLowerCase())}" data-materials="${esc(item.products.map(p => p.name.toLowerCase()).join(' '))}" style="display: flex; flex-direction: column; height: 100%; border: 1px solid var(--line); padding: 1.5rem; background: var(--paper);">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; gap: .5rem; margin-bottom: .5rem; flex-wrap: wrap;">
                    <span class="category-index">SECTOR / ${String(idx + 1).padStart(2, '0')}</span>
                    <div style="display: flex; gap: .35rem; align-items: center; flex-wrap: wrap;">
                      ${item.badge ? `<span style="font: 700 .66rem var(--mono); color: var(--terracotta, #A84E2B); background: var(--fog); padding: .15rem .45rem; border: 1px solid var(--line);">${esc(item.badge)}</span>` : ''}
                      ${prof && prof.status ? `<span style="font: 700 .66rem var(--mono); color: ${prof.statusColor || 'var(--blue)'}; text-transform: uppercase; background: var(--fog); padding: .15rem .45rem; border: 1px solid var(--line);">${esc(prof.status)}</span>` : ''}
                    </div>
                  </div>

                  <h3 style="margin: 0 0 .35rem; font-size: 1.25rem;">${esc(item.name)}</h3>

                  ${prof && prof.subtitle ? `
                    <div style="font: 600 .78rem var(--mono); color: var(--terracotta, #A84E2B); margin-bottom: .6rem;">${esc(prof.subtitle)}</div>
                  ` : ''}

                  <p style="font-size: .84rem; line-height: 1.45; color: var(--ink); margin-bottom: .6rem;">
                    ${prof ? esc(prof.description) : (
                      item.count > 0 
                        ? `<strong>${item.count} material${item.count > 1 ? 's' : ''}</strong> available for formulation in this sector.`
                        : `Custom mineral grades available upon technical consultation.`
                    )}
                  </p>

                  ${prof && prof.safetyNotice ? `
                    <div class="data-note" style="margin: .6rem 0 .75rem; font-size: .74rem; line-height: 1.4; padding: .6rem .75rem; background: var(--fog); border: 1px solid var(--line); border-left: 3px solid ${prof.statusColor || 'var(--terracotta, #A84E2B)'};">
                      <strong>Qualification Notice:</strong> ${esc(prof.safetyNotice)}
                    </div>
                  ` : ''}

                  ${prof && prof.applicationDetails && prof.applicationDetails.length ? `
                    <div style="margin: .6rem 0 .75rem; font-size: .76rem; color: var(--slate);">
                      <strong style="display: block; font: 600 .7rem var(--mono); color: var(--ink); margin-bottom: .3rem; text-transform: uppercase;">Key Manufacturing Details:</strong>
                      <ul style="list-style: disc; margin: 0 0 0 1.1rem; padding: 0; line-height: 1.4;">
                        ${prof.applicationDetails.map(d => `<li style="margin-bottom: .2rem;">${esc(d)}</li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}

                  ${item.uncataloguedMaterials && item.uncataloguedMaterials.length ? `
                    <div class="data-note" style="margin: .6rem 0 .75rem; font-size: .73rem; line-height: 1.4; padding: .6rem .75rem; background: #FFFBEB; border: 1px solid #FDE68A; border-left: 3px solid #D97706; color: #92400E;">
                      <strong>Specialty Sourced Material:</strong> ${item.uncataloguedMaterials.map(m => `<span><strong>${esc(m.name)}</strong> (${esc(m.status)})</span>`).join(', ')} — Technical specifications and custom formulation supply confirmed on direct enquiry.
                    </div>
                  ` : ''}
                  
                  ${item.products.length ? `
                    <div style="margin: .75rem 0 1.25rem;">
                      <span style="font: 500 .7rem var(--mono); color: var(--slate); text-transform: uppercase; display: block; margin-bottom: .35rem;">
                        ${prof ? 'Potentially Relevant Catalogue Materials:' : 'Compatible Materials:'}
                      </span>
                      <div class="pill-list">
                        ${item.products.map(p => {
                          const isCattleFeed = item.name === 'Cattle Feed' || item.name === 'Cattle Feed Industry';
                          const label = isCattleFeed ? `${p.name} (Feed-grade confirmation required)` : p.name;
                          return `
                            <a href="${productUrl(p, item.name)}" class="pill" style="font-size: .7rem;" title="${isCattleFeed ? 'Feed-grade availability and suitability must be confirmed' : ''}">
                              ${esc(label)}
                            </a>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>

                <div style="display: flex; gap: .5rem; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--line); flex-wrap: wrap;">
                  <a href="${productsUrl}?industry=${encodeURIComponent(item.name)}" class="button" style="flex: 1; min-width: 120px; padding: .6rem .75rem; font-size: .72rem; text-align: center;">
                    Filter Materials →
                  </a>
                  <a href="#rfq" class="button alt" style="padding: .6rem .8rem; font-size: .72rem; text-align: center;" onclick="prefillIndustryRfq('${esc(item.name)}', '${esc((prof && prof.defaultNotes) || '')}')">
                    ${esc((prof && prof.ctaText) || 'Quotation')}
                  </a>
                  <a href="https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Deepali Minerals, I would like to enquire about mineral materials for ${item.name}.`)}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn" style="padding: .5rem .7rem; font-size: .72rem; display: inline-flex; align-items: center; gap: .35rem;" title="Enquire via WhatsApp">
                    ${whatsappIconSvg(13, 13)}
                    <span>WhatsApp</span>
                  </a>
                </div>
              </article>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- Specialty & Custom Formulation Raw Materials Technical Registry -->
      <section style="background: var(--fog); padding: 4.5rem 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Technical Formulation Registry</span>
              <h2 class="section-title">Specialty Minerals &amp; Custom Sourced Raw Materials</h2>
            </div>
            <p class="lede">In addition to our standard catalogue, Deepali Minerals sources, qualifies, and supplies specialty mineral grades and custom formulation additives for specialized industrial applications. Commercial availability, particle size distribution, and technical specifications are confirmed upon direct business enquiry.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem; margin-top: 1.75rem;">
            ${uncatalogued.map(item => `
              <article style="background: var(--paper); border: 1px solid var(--line); padding: 1.5rem; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; gap: .5rem; margin-bottom: .5rem; flex-wrap: wrap;">
                  <span style="font: 700 .7rem var(--mono); color: #B45309; background: #FEF3C7; padding: .2rem .5rem; border: 1px solid #FDE68A;">${esc(item.category)}</span>
                  <span style="font: 600 .68rem var(--mono); color: var(--slate);">${esc(item.catalogueStatus)}</span>
                </div>
                <h3 style="margin: 0 0 .25rem; font-size: 1.25rem;">${esc(item.name)}</h3>
                <div style="font: 600 .75rem var(--mono); color: var(--slate); margin-bottom: .6rem;">${esc(item.chemicalName)}</div>
                <p style="font-size: .84rem; line-height: 1.45; color: var(--ink); margin-bottom: .75rem;">${esc(item.description)}</p>

                <div style="margin-top: auto; padding-top: .75rem; border-top: 1px solid var(--line);">
                  <strong style="display: block; font: 600 .7rem var(--mono); color: var(--ink); margin-bottom: .35rem; text-transform: uppercase;">Target Manufacturing Applications:</strong>
                  <ul style="list-style: disc; margin: 0 0 0 1.1rem; padding: 0; font-size: .76rem; color: var(--slate); line-height: 1.4;">
                    ${item.sheetOccurrences.map(occ => `<li><strong>${esc(occ.industry)}:</strong> ${esc(occ.role)}</li>`).join('')}
                  </ul>
                </div>

                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--line); display: flex; gap: .5rem; flex-wrap: wrap;">
                  <a href="#rfq" class="button alt" style="flex: 1; min-width: 140px; padding: .55rem .75rem; font-size: .72rem; text-align: center;" onclick="prefillIndustryRfq('Technical Enquiry: ${esc(item.name)}', '[Candidate Raw Material Enquiry: ${esc(item.name)}] Intended application: ; Grade requirement: ; Quantity: ')">
                    Enquire for Specifications
                  </a>
                  <a href="https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Deepali Minerals, I would like to enquire about technical availability and specifications for ${item.name} (${item.chemicalName}).`)}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn" style="padding: .5rem .7rem; font-size: .72rem; display: inline-flex; align-items: center; gap: .35rem;" title="Enquire via WhatsApp">
                    ${whatsappIconSvg(13, 13)}
                    <span>WhatsApp</span>
                  </a>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Direct Procurement RFQ -->
      <section>
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow">Custom Compounding Consultation</span>
            <h2 class="section-title">Can't find your exact industry specification?</h2>
            <p class="lede">Our technical commercial desk handles custom particle gradations, surface treatments, and specialized packaging for high-throughput manufacturing lines.</p>
            <div style="margin-top: 2rem; font-size: .88rem; color: var(--slate); line-height: 1.6;">
              <p><strong>CEO:</strong> Mr. Neeraj Monga</p>
              <p><strong>Direct Commercial Desk:</strong> <a href="tel:+919810516065" style="color: var(--blue); font-weight: 700;">9810516065</a>, <a href="tel:+919810715129" style="color: var(--blue); font-weight: 700;">9810715129</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: var(--blue);">info@deepaliminerals.in</a></p>
              <p><strong>Wholesale Dispatch:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035.</p>
              <p><strong>GST:</strong> 07AIMPM0458Q1ZL</p>
            </div>
          </div>
          ${rfq(null, { industry: 'Industrial Manufacturing' })}
        </div>
      </section>
    `;

    // Bind real-time directory search filter
    const searchInput = document.querySelector('#sector-quick-search');
    const cards = document.querySelectorAll('.sector-item');
    const countEl = document.querySelector('#visible-sector-count');

    if (searchInput && cards.length) {
      searchInput.addEventListener('input', e => {
        const val = e.target.value.toLowerCase().trim();
        let visible = 0;
        cards.forEach(card => {
          const sName = card.dataset.sectorName || '';
          const sBadge = card.dataset.sectorBadge || '';
          const sMats = card.dataset.materials || '';
          const match = !val || sName.includes(val) || sBadge.includes(val) || sMats.includes(val);
          card.style.display = match ? 'flex' : 'none';
          if (match) visible++;
        });
        if (countEl) countEl.textContent = visible;
      });
    }

    bindRfq();
  }

  // Global helper for RFQ button click on industry cards
  window.prefillIndustryRfq = function (indName, customNotes) {
    const rfqSec = document.querySelector('#rfq');
    if (!rfqSec) {
      window.location.href = `${root}/#rfq`;
      return;
    }
    const appInput = rfqSec.querySelector('input[name="application"]');
    if (appInput) {
      appInput.value = indName;
    }
    const notesInput = rfqSec.querySelector('input[name="notes"]');
    if (notesInput) {
      notesInput.value = customNotes || `[Manufacturing Sector: ${indName}] `;
      notesInput.focus();
    }
    rfqSec.scrollIntoView({ behavior: 'smooth' });
  };

  // Global helper for Application Card Quotation / RFQ button click
  window.prefillApplicationRfq = function (appName, defaultProductSlug, defaultNotes) {
    const rfqSec = document.querySelector('#rfq');
    if (!rfqSec) {
      const targetUrl = defaultProductSlug
        ? `${root}/product.html?product=${encodeURIComponent(defaultProductSlug)}&app=${encodeURIComponent(appName)}#rfq`
        : `${root}/#rfq`;
      window.location.href = targetUrl;
      return;
    }
    const appInput = rfqSec.querySelector('input[name="application"]');
    if (appInput) appInput.value = appName;

    if (defaultProductSlug) {
      const prodSelect = rfqSec.querySelector('select[name="product"]');
      if (prodSelect) {
        const prodObj = data.getProductBySlug(defaultProductSlug);
        const searchName = prodObj ? prodObj.name.toLowerCase() : defaultProductSlug.toLowerCase();
        for (let i = 0; i < prodSelect.options.length; i++) {
          if (prodSelect.options[i].value.toLowerCase().includes(searchName)) {
            prodSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    const notesInput = rfqSec.querySelector('input[name="notes"]');
    if (notesInput) {
      notesInput.value = defaultNotes || `[Application: ${appName}] `;
      notesInput.focus();
    }
    rfqSec.scrollIntoView({ behavior: 'smooth' });
  };

  /* =========================================================================
   * PRODUCTS CATALOGUE INDEX (`/products/`)
   * ========================================================================= */
  function products() {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;

    const commonApps = data.getCommonApplications ? data.getCommonApplications() : [];

    mainEl.innerHTML = `
      <section class="page-hero">
        <div class="shell">
          <span class="eyebrow">Product Catalogue • Industrial Minerals & Chemicals</span>
          <h1 class="display">Materials, organized for the next conversation.</h1>
          <p class="lede">Complete 22-product source catalogue. Filter by category, manufacturing industry, or application term to discover the right grade.</p>
        </div>
      </section>

      <section class="catalogue">
        <div class="shell">
          
          <!-- Search Bar -->
          <div class="catalogue-top">
            <span class="result-count"><b id="product-count">${data.products.length}</b> PRODUCTS IN COMPLETE CATALOGUE</span>
            <input id="catalogue-search" type="search" placeholder="Search by name, category, or industry (e.g. Talc, PVC, Putty, Rubber)..." aria-label="Search materials">
          </div>

          <!-- Category Filter Bar -->
          <div class="filter-bar" id="category-filter-bar">
            <button type="button" class="filter-btn active" data-cat="all">All Materials (22)</button>
            <button type="button" class="filter-btn" data-cat="Industrial Minerals">Industrial Minerals (22)</button>
            <button type="button" class="filter-btn" data-cat="Mineral Powders">Mineral Powders (12)</button>
            <button type="button" class="filter-btn" data-cat="Functional Chemicals">Functional Chemicals (7)</button>
            <button type="button" class="filter-btn" data-cat="Grains & Aggregates">Grains & Aggregates (3)</button>
          </div>

          <!-- Application Quick Filter Strip -->
          <div style="margin: 1rem 0; padding: 1rem; background: var(--paper); border: 1px solid var(--line);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; margin-bottom: .5rem;">
              <span class="eyebrow" style="margin-bottom: 0;">Discover by Application Term</span>
            </div>
            <div class="pill-list" id="application-quick-pills">
              ${commonApps.map(app => `
                <button type="button" class="pill" data-app="${esc(app.term)}">${esc(app.label)}</button>
              `).join('')}
            </div>
          </div>

          <!-- "What Are You Manufacturing?" Industry Quick Selector -->
          <div style="margin: 1rem 0 2rem; padding: 1.25rem; background: var(--fog); border: 1px solid var(--line);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; margin-bottom: .75rem;">
              <span class="eyebrow" style="margin-bottom: 0;">What Are You Manufacturing? (Filter by Sector)</span>
              <button type="button" id="clear-filters-btn" style="font: 500 .7rem var(--mono); color: var(--blue); cursor: pointer; text-decoration: underline; background: none; border: 0;">Clear All Filters</button>
            </div>
            <div class="pill-list" id="industry-pills">
              ${data.industries.map(ind => `
                <button type="button" class="pill" data-industry="${esc(ind)}">${esc(ind)}</button>
              `).join('')}
            </div>
          </div>

          <!-- Active Filter Notice -->
          <div id="filter-status" style="display: none; font: 500 .78rem var(--mono); color: var(--blue); margin-bottom: 1rem;"></div>

          <!-- Product Grid -->
          <div class="product-grid" id="catalogue-grid">
            ${data.products.map(p => productCard(p)).join('')}
          </div>

        </div>
      </section>
    `;

    initCatalogueFiltering();
  }

  /* =========================================================================
   * PRODUCT DETAIL PAGE (`product.html?product=<slug>`)
   * ========================================================================= */
  function product() {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;

    const params = new URLSearchParams(location.search);
    const slug = params.get('product');
    const industryCtx = params.get('industry') || '';
    const appCtx = params.get('app') || '';
    const routeCtx = params.get('route') || '';
    const reqText = params.get('req') || '';

    const p = data.getProductBySlug(slug) || data.products[0];

    // SEO Dynamic Update
    document.title = `${p.name} | Deepali Minerals`;
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute('content', `${p.name} technical specifications, manufacturing applications, packaging standards, and wholesale B2B pricing from Deepali Minerals.`);
    }
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `https://deepaliminerals.in/product.html?product=${p.slug}`);

    const specs = p.specifications || {};
    const specRows = [];
    if (p.composition || specs.composition) {
      specRows.push(['Primary Composition', p.composition || specs.composition]);
    }
    specRows.push(['Grade', specs.grade || 'Available on request']);
    specRows.push(['Purity', specs.purity || 'Available on request']);
    specRows.push(['Mesh Size', specs.mesh || 'Available on request']);
    specRows.push(['Micron Size', specs.micron || 'Available on request']);
    specRows.push(['Particle Size', specs.particleSize || 'Available on request']);
    specRows.push(['Whiteness', specs.whiteness || 'Available on request']);
    specRows.push(['Moisture Content', specs.moisture || 'Available on request']);
    specRows.push(['Bulk Density', specs.bulkDensity || 'Available on request']);

    if (specs.ph) {
      specRows.push(['pH Value', specs.ph]);
    }
    if (specs.oilAbsorption) {
      specRows.push(['Oil Absorption', specs.oilAbsorption]);
    }
    if (specs.asbestosStatus) {
      specRows.push(['Asbestos Status', specs.asbestosStatus]);
    }

    const relatedProds = data.getRelatedProducts(p.slug, 3);

    mainEl.innerHTML = `
      <!-- Breadcrumbs & Product Hero -->
      <section>
        <div class="shell">
          <div class="breadcrumbs">
            <a href="${root}/">Home</a> / <a href="${productsUrl}">Products</a> ${industryCtx ? `/ <a href="${productsUrl}?industry=${encodeURIComponent(industryCtx)}">${esc(industryCtx)}</a>` : ''} ${appCtx ? `/ <span style="color:var(--slate);">${esc(appCtx)}</span>` : ''} / ${esc(p.name)}
          </div>
          <div class="detail-intro">
            <div>
              <span class="detail-meta">${esc(p.category)}</span>
              <h1 class="display" style="margin-top:.6rem">${esc(p.name)}</h1>
              <p class="lede">${esc(p.description)}</p>
              
              <!-- Primary Buyer Actions -->
              <div class="detail-actions">
                <a class="button" href="#rfq">Quotation</a>
                <a class="button alt" href="https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Deepali Minerals, I would like to request commercial pricing and specifications for ${p.name}${industryCtx ? ' for ' + industryCtx + ' application' : (reqText ? ' for requirement: ' + reqText : '')}.`)}" target="_blank" rel="noopener noreferrer">
                  WhatsApp Enquiry
                </a>
              </div>
            </div>
            <div class="product-large-visual" role="img" aria-label="Abstract mineral specimen graphic for ${esc(p.name)}"></div>
          </div>
        </div>
      </section>

      <!-- Key Applications & Industries Served (Where Can It Be Used?) -->
      <section style="background: var(--fog); padding: 4.5rem 0;">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow">Manufacturing Uses</span>
            <h2 class="section-title">Where is ${esc(p.name)} applied?</h2>
            <p class="lede" style="margin-top: .5rem;">Verified applications and compound functions supported by this material grade.</p>
            
            <ul style="list-style: none; padding: 0; margin-top: 1.5rem; display: flex; flex-direction: column; gap: .75rem;">
              ${(p.applications && p.applications.length ? p.applications : ['Applications data to be updated after technical verification.']).map(app => `
                <li style="display: flex; gap: .5rem; font-size: .92rem; color: var(--ink);">
                  <span style="color: var(--blue); font-weight: 800;">✓</span>
                  <span>${esc(app)}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div>
            <span class="eyebrow">Compatible Sectors</span>
            <h2 class="section-title">Industries Served</h2>
            <p class="lede" style="margin-top: .5rem;">Manufacturing sectors utilizing ${esc(p.name)} in standard compounding.</p>
            
            <div class="pill-list" style="margin-top: 1.5rem;">
              ${(p.industries && p.industries.length ? p.industries : ['Sectors pending verification']).map(ind => `
                <a href="${productsUrl}?industry=${encodeURIComponent(ind)}" class="pill ${ind.toLowerCase() === industryCtx.toLowerCase() ? 'active' : ''}">${esc(ind)}</a>
              `).join('')}
            </div>

            <div style="margin-top: 2rem; padding: 1.25rem; background: var(--paper); border: 1px solid var(--line);">
              <h3 style="font: 700 1.1rem var(--serif); margin: 0 0 .5rem;">Packaging Standards</h3>
              <ul style="list-style: none; padding: 0; margin: 0; font-size: .88rem; color: var(--slate); display: flex; flex-direction: column; gap: .35rem;">
                ${(p.packaging && p.packaging.length ? p.packaging : ['Packaging specifications available on request.']).map(pkg => `
                  <li>📦 ${esc(pkg)}</li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Specifications & Controlled Notice (What Information is Available?) -->
      <section class="featured">
        <div class="shell detail-grid">
          
          <div class="spec-box">
            <span class="eyebrow">Product Information</span>
            <h2>Technical Details</h2>
            <div class="table-wrap">
              <table class="spec-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th style="text-align: right;">Value / Specification</th>
                  </tr>
                </thead>
                <tbody>
                  ${specRows.map(([k, v]) => `
                    <tr>
                      <td>${k}</td>
                      <td>
                        ${v === 'Available on request' || v === 'Technical data available on request.'
                          ? `<span class="spec-val-unverified">${v}</span>`
                          : `<strong>${esc(v)}</strong>`
                        }
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div class="data-note">
              <strong>Controlled Information Notice</strong><br>
              Technical specifications, certified test assays, and document links are published only when verified from source laboratory testing. For formulation-specific parameters, please submit an RFQ or contact our commercial desk.
            </div>

            <div style="margin-top: 1.5rem; background: var(--paper); border: 1px solid var(--line); padding: 1.5rem;">
              <span class="eyebrow">Technical Material Library</span>
              <h3 style="font: 700 1.25rem var(--serif); margin: 0 0 .5rem;">Technical Documentation</h3>
              <p style="font-size: .85rem; color: var(--slate); margin: 0 0 1rem;">Official data sheets and certificates available upon business enquiry.</p>
              
              <ul class="doc-list">
                <li class="doc-item">
                  <span class="doc-name">Technical Data Sheet (TDS)</span>
                  <span class="doc-status">Available on request</span>
                </li>
                <li class="doc-item">
                  <span class="doc-name">Certificate of Analysis (COA)</span>
                  <span class="doc-status">Supplied with batch</span>
                </li>
                <li class="doc-item">
                  <span class="doc-name">Product Specification Sheet</span>
                  <span class="doc-status">Available on request</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <!-- Related Materials Section -->
      <section>
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Alternative Materials</span>
              <h2 class="section-title">Related Mineral Products</h2>
            </div>
            <a class="text-link" href="${productsUrl}">View all catalogue materials →</a>
          </div>
          <div class="product-grid">
            ${relatedProds.map(p => productCard(p, industryCtx)).join('')}
          </div>
        </div>
      </section>

      <!-- Next Step: RFQ Section (How to Get a Quote) -->
      <section>
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow">Next Step</span>
            <h2 class="section-title">Turn this material into a qualified enquiry.</h2>
            <p class="lede">Include your target application, specification or mesh requirement, estimated tonnage, packaging preference, and delivery location.</p>
            <div style="margin-top: 2rem; font-size: .88rem; color: var(--slate); line-height: 1.6;">
              <p><strong>CEO:</strong> Mr. Neeraj Monga</p>
              <p><strong>Wholesale Dispatch:</strong> From C2/29C Lawrence Road, Keshav Puram, Delhi-110035.</p>
              <p><strong>Direct Sales Desk:</strong> <a href="tel:+919810516065" style="color: var(--blue); font-weight: 700;">9810516065</a>, <a href="tel:+919810715129" style="color: var(--blue); font-weight: 700;">9810715129</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: var(--blue);">info@deepaliminerals.in</a></p>
              <p><strong>GST:</strong> 07AIMPM0458Q1ZL</p>
              <p><strong>Response Time:</strong> Commercial enquiries are reviewed same-day during business hours.</p>
            </div>
          </div>
          ${rfq(p, { industry: industryCtx, application: appCtx, route: routeCtx, requirementText: reqText })}
        </div>
      </section>
    `;

    bindRfq();
  }

  /* =========================================================================
   * CATALOGUE FILTERING CONTROLLER
   * ========================================================================= */
  function initCatalogueFiltering() {
    let activeCategory = 'all';
    let activeIndustry = 'all';
    let currentSearch = '';

    const searchInput = document.querySelector('#catalogue-search');
    const categoryBar = document.querySelector('#category-filter-bar');
    const industryPills = document.querySelector('#industry-pills');
    const appQuickPills = document.querySelector('#application-quick-pills');
    const clearBtn = document.querySelector('#clear-filters-btn');
    const statusEl = document.querySelector('#filter-status');

    function applyFilters() {
      let filtered = data.products;

      // 1. Search filter (cross-product, category, application, industry)
      if (currentSearch && currentSearch.trim() !== '') {
        const q = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(p => {
          return p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.applications.some(app => app.toLowerCase().includes(q)) ||
            p.industries.some(ind => ind.toLowerCase().includes(q));
        });
      }

      // 2. Category filter
      if (activeCategory && activeCategory !== 'all') {
        const catNorm = activeCategory.toLowerCase().trim().replace(/-/g, ' ');
        if (catNorm === 'industrial minerals' || catNorm === 'industrial materials' || catNorm === 'all materials' || catNorm === 'all industrial minerals' || catNorm === 'all') {
          // All 22 products of Deepali Minerals are industrial minerals
          filtered = filtered.filter(p => p.isIndustrialMineral !== false);
        } else if (catNorm === 'mineral powders') {
          filtered = filtered.filter(p => p.category === 'Mineral Powders' || (p.categories && p.categories.includes('Mineral Powders')));
        } else if (catNorm === 'functional chemicals') {
          filtered = filtered.filter(p => p.category === 'Functional Chemicals' || (p.categories && p.categories.includes('Functional Chemicals')));
        } else if (catNorm === 'grains & aggregates' || catNorm === 'grains aggregates' || catNorm === 'granules & aggregates' || catNorm === 'grains') {
          filtered = filtered.filter(p => p.category === 'Industrial Materials' || (p.categories && p.categories.includes('Grains & Aggregates')) || ['silica', 'quartz-sand', 'marble-chips'].includes(p.slug));
        } else {
          filtered = filtered.filter(p => 
            (p.category && p.category.toLowerCase() === catNorm) || 
            (p.categories && p.categories.some(c => c.toLowerCase() === catNorm))
          );
        }
      }

      // 3. Industry filter
      if (activeIndustry && activeIndustry !== 'all') {
        const targetInd = activeIndustry.toLowerCase().trim();
        filtered = filtered.filter(p => p.industries.some(ind => ind.toLowerCase() === targetInd));
      }

      // Render results
      const grid = document.querySelector('#catalogue-grid');
      const countEl = document.querySelector('#product-count');
      if (countEl) countEl.textContent = filtered.length;

      if (grid) {
        grid.innerHTML = filtered.length
          ? filtered.map(p => productCard(p, activeIndustry !== 'all' ? activeIndustry : '')).join('')
          : `<div class="empty">No catalogue materials match your filter criteria. <button type="button" class="button alt" style="margin-top: 1rem;" id="reset-filter-btn">Reset Filters</button></div>`;

        const resetBtn = document.querySelector('#reset-filter-btn');
        if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
      }

      // Update status notice
      if (statusEl && statusEl.style) {
        if (activeIndustry !== 'all' || activeCategory !== 'all' || currentSearch) {
          statusEl.style.display = 'block';
          const parts = [];
          if (activeCategory !== 'all') parts.push(`Category: ${activeCategory}`);
          if (activeIndustry !== 'all') parts.push(`Manufacturing Sector: ${activeIndustry}`);
          if (currentSearch) parts.push(`Search: "${currentSearch}"`);

          let extraInfo = '';
          if (activeIndustry !== 'all' && data.getTaxonomyByName) {
            const tax = data.getTaxonomyByName(activeIndustry);
            if (tax) {
              const indIdx = parts.findIndex(p => p.startsWith('Manufacturing Sector:'));
              if (indIdx !== -1) {
                parts[indIdx] = `Sector: ${tax.name}`;
              }
              if (tax.safetyNotice) {
                extraInfo += `<div style="margin-top: .4rem; padding: .6rem .8rem; background: #FEF3C7; border: 1px solid #F59E0B; color: #92400E; font-size: .8rem; font-family: var(--sans); line-height: 1.4;"><strong>Technical Qualification Notice:</strong> ${esc(tax.safetyNotice)}</div>`;
              }
              if (tax.uncataloguedMaterials && tax.uncataloguedMaterials.length > 0) {
                extraInfo += `<div style="margin-top: .4rem; padding: .6rem .8rem; background: #EFF6FF; border: 1px solid #3B82F6; color: #1E40AF; font-size: .8rem; font-family: var(--sans); line-height: 1.4;"><strong>Specialty Sourced Material:</strong> ${tax.uncataloguedMaterials.map(m => `<em>${esc(m.name)}</em>`).join(', ')} — Custom formulation grades available upon technical inquiry.</div>`;
              }
            }
          }

          statusEl.innerHTML = `<div style="font-weight: 600;">Active Filters: ${parts.join(' | ')}</div>${extraInfo}`;
        } else {
          statusEl.style.display = 'none';
          statusEl.innerHTML = '';
        }
      }
    }

    function resetAllFilters() {
      activeCategory = 'all';
      activeIndustry = 'all';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      if (categoryBar) {
        categoryBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.cat === 'all'));
      }
      if (industryPills) {
        industryPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
      }
      if (appQuickPills) {
        appQuickPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
      }
      applyFilters();
    }

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        currentSearch = e.target.value;
        applyFilters();
      });
    }

    if (categoryBar) {
      categoryBar.addEventListener('click', e => {
        if (!e.target.classList.contains('filter-btn')) return;
        categoryBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.dataset.cat;
        applyFilters();
      });
    }

    if (industryPills) {
      industryPills.addEventListener('click', e => {
        if (!e.target.classList.contains('pill')) return;
        const targetInd = e.target.dataset.industry;
        if (activeIndustry === targetInd) {
          activeIndustry = 'all';
          e.target.classList.remove('active');
        } else {
          industryPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          activeIndustry = targetInd;
        }
        applyFilters();
      });
    }

    if (appQuickPills) {
      appQuickPills.addEventListener('click', e => {
        if (!e.target.classList.contains('pill')) return;
        const appTerm = e.target.dataset.app;
        if (currentSearch === appTerm) {
          currentSearch = '';
          e.target.classList.remove('active');
          if (searchInput) searchInput.value = '';
        } else {
          appQuickPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          currentSearch = appTerm;
          if (searchInput) searchInput.value = appTerm;
        }
        applyFilters();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', resetAllFilters);
    }

    // Check URL parameters on mount
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const appParam = params.get('app');
    const catParam = params.get('category');
    const indParam = params.get('industry');

    const effectiveSearch = searchParam || appParam;
    if (effectiveSearch) {
      currentSearch = effectiveSearch;
      if (searchInput) searchInput.value = effectiveSearch;
      if (appQuickPills) {
        appQuickPills.querySelectorAll('.pill').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.app && btn.dataset.app.toLowerCase() === effectiveSearch.toLowerCase());
        });
      }
    }
    if (catParam) {
      activeCategory = catParam;
      if (categoryBar) {
        categoryBar.querySelectorAll('.filter-btn').forEach(btn => {
          const btnCat = btn.dataset.cat.toLowerCase().replace(/-/g, ' ');
          const cleanParam = catParam.toLowerCase().replace(/-/g, ' ');
          const isMatch = btnCat === cleanParam || 
            ((btnCat === 'industrial minerals' || btnCat === 'industrial materials') && (cleanParam === 'industrial minerals' || cleanParam === 'industrial materials'));
          btn.classList.toggle('active', isMatch);
        });
      }
    }
    if (indParam) {
      activeIndustry = indParam;
      if (industryPills) {
        industryPills.querySelectorAll('.pill').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.industry.toLowerCase() === indParam.toLowerCase());
        });
      }
    }

    if (searchParam || appParam || catParam || indParam) {
      applyFilters();
    }
  }

  /* =========================================================================
   * EVENT BINDINGS (SEARCH & RFQ)
   * ========================================================================= */
  function bindSearch() {
    const form = document.querySelector('[data-search]');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input');
        const val = input ? input.value : '';
        location.href = `${productsUrl}?search=${encodeURIComponent(val)}`;
      });
    }
  }

  function bindRfq() {
    document.querySelectorAll('[data-rfq]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        
        const fd = new FormData(form);
        const productVal = fd.get('product') || 'Mineral Product';
        const appVal = fd.get('application') || '';
        const quantityVal = fd.get('quantity') || 'Commercial Volume';
        const packagingVal = fd.get('packaging') || 'Standard';
        const destVal = fd.get('destination') || 'Pending';
        const companyVal = fd.get('company') || '';
        const contactVal = fd.get('contactPerson') || '';
        const phoneVal = fd.get('phone') || '';
        const emailVal = fd.get('email') || '';
        const notesVal = fd.get('notes') || '';

        const refId = `DM-RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const whatsappText = `*Deepali Minerals Quotation Submission*
Ref: ${refId}
Product: ${productVal}
Application: ${appVal || 'Industrial Compounding'}
Quantity: ${quantityVal} (${packagingVal})
Destination: ${destVal}
Buyer: ${contactVal} (${companyVal})
Phone: ${phoneVal}
Email: ${emailVal}
${notesVal ? 'Notes: ' + notesVal : ''}`;

        const fb = form.querySelector('.rfq-feedback');
        if (fb) {
          fb.style.display = 'block';
          fb.innerHTML = `
            <div class="rfq-success-card">
              <h3>Quotation Logged Successfully</h3>
              <p>Reference: <strong style="font-family: var(--mono); color: var(--aqua);">${refId}</strong></p>
              <p>Your requirement for <strong>${esc(productVal)}</strong> has been recorded for review by our Lawrence Road commercial desk. We will respond with pricing and dispatch terms shortly.</p>
              <div>
                <a href="https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
                  Send directly via WhatsApp →
                </a>
              </div>
            </div>
          `;
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) submitBtn.style.display = 'none';
        }
      });
    });
  }

  /* =========================================================================
   * ABOUT PAGE CONTROLLER
   * ========================================================================= */
  function about() {
    // Initialize sticky subnav scrollspy
    const subnavLinks = document.querySelectorAll('.about-subnav-link');
    const sections = Array.from(subnavLinks).map(link => {
      const targetId = link.getAttribute('href').replace('#', '');
      return document.getElementById(targetId);
    }).filter(Boolean);

    if (subnavLinks.length && sections.length) {
      const onScroll = () => {
        const scrollPos = window.scrollY + 140;
        let currentSectionId = '';
        sections.forEach(sec => {
          if (sec.offsetTop <= scrollPos) {
            currentSectionId = sec.id;
          }
        });
        subnavLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          link.classList.toggle('is-active', href === currentSectionId);
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    bindRfq();
    bindSearch();
    initBackToTop();
  }

  // App initialization
  header();
  footer();
  if (page === 'home') home();
  if (page === 'industries') industries();
  if (page === 'products') products();
  if (page === 'product') product();
  if (page === 'about') about();
  initGlobalDMInteractiveLogos();

})();
