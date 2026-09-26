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

  const data = window.DeepaliData;
  const root = document.body.dataset.root || '.';
  const page = document.body.dataset.page;
  const esc = (value) => String(value || '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
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
      ['About Deepali Minerals', `${root}/#why`],
      ['Contact', `${root}/#contact`]
    ];
    const links = nav.map(([label, href]) => {
      let isActive = false;
      if (page === 'products' && label === 'Products') isActive = true;
      if (page === 'industries' && label === 'Industries & Applications') isActive = true;
      return `<a href="${href}" class="${isActive ? 'active' : ''}">${label}</a>`;
    }).join('');
    
    const headerEl = document.querySelector('#site-header');
    if (!headerEl) return;

    headerEl.innerHTML = `
      <div class="topline"></div>
      <header class="site-header">
        <div class="shell header-inner">
          <a class="brand" href="${root}/" aria-label="Deepali Minerals home">
            <span class="brand-mark">DM</span>
            <span>Deepali<br>Minerals</span>
          </a>
          <nav class="nav-links" aria-label="Primary navigation">${links}</nav>
          <a class="button header-cta" href="#rfq">Request a Quote</a>
          <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
        </div>
        <nav class="shell mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          ${links}
          <a class="button" href="#rfq">Request a Quote</a>
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

  function footer() {
    const footerEl = document.querySelector('#site-footer');
    if (!footerEl) return;

    const company = data.company;
    footerEl.innerHTML = `
      <a class="contact-float" href="#rfq" aria-label="Open quote request">RFQ</a>
      <footer class="footer" id="contact">
        <div class="shell footer-grid">
          <div>
            <a class="brand" href="${root}/">
              <span class="brand-mark">DM</span>
              <span>Deepali<br>Minerals</span>
            </a>
            <p style="margin-top: .75rem;">${company.tagline}</p>
            <div style="font-size: .84rem; color: #a99f8f; margin-top: .75rem; line-height: 1.5;">
              <p><strong>Office & Depot:</strong><br>${company.headquarters}</p>
              <p style="margin-top: .4rem;"><strong>Phone:</strong> ${company.phonePrimary || '+91-98110-45321'} | ${company.phoneOffice || '+91-11-2718-4902'}</p>
              <p style="margin-top: .4rem;"><strong>Email:</strong> ${company.emailSales || 'sales@deepaliminerals.com'}</p>
              <p style="margin-top: .4rem;"><strong>GSTIN:</strong> ${company.gstNumber || '07AAAPM4981C1Z8'}</p>
            </div>
          </div>
          <div>
            <h3>Discover</h3>
            <a href="${productsUrl}">Product Catalogue</a>
            <a href="${industriesUrl}">Industries & Applications</a>
            <a href="${root}/#resources">Technical Resources</a>
            <a href="${root}/#why">About Deepali Minerals</a>
          </div>
          <div>
            <h3>Enquiries</h3>
            <a href="#rfq">Request a Quote</a>
            <a href="${root}/#contact">Contact Commercial Desk</a>
            <a href="https://wa.me/${(company.whatsappNumber || '919811045321').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Deepali Minerals, I would like to inquire about industrial mineral procurement.')}" target="_blank" rel="noopener noreferrer">
              WhatsApp Sales Desk
            </a>
          </div>
        </div>
        <div class="shell footer-bottom">
          <span>© ${new Date().getFullYear()} Deepali Minerals. All rights reserved.</span>
          <span>Industrial B2B Product Discovery & Technical Material Library</span>
        </div>
      </footer>
    `;
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
        <a class="button alt" style="padding: .4rem .75rem; font-size: .7rem;" href="${productUrl(p, industryCtx, appCtx, routeCtx)}#rfq">Quote</a>
      </div>
    </article>
  `;

  const rfq = (selectedProduct, prefillContext) => {
    const currentProd = selectedProduct ? selectedProduct.name : '';
    const ctx = prefillContext || {};
    const defaultApp = ctx.application || (selectedProduct && selectedProduct.applications && selectedProduct.applications[0] ? selectedProduct.applications[0] : '');
    
    let defaultNotes = '';
    if (ctx.industry) defaultNotes += `[Industry / Manufacturing Sector: ${ctx.industry}] `;
    if (ctx.route) defaultNotes += `[Discovery Path: ${ctx.route}] `;
    if (ctx.requirementText) defaultNotes += `[Requirement: "${ctx.requirementText}"] `;

    return `
      <aside class="rfq-preview" id="rfq">
        <span class="eyebrow" style="color:var(--aqua)">B2B Procurement Request</span>
        <h2 class="section-title">Start a Material Quote</h2>
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

          <button class="button" type="submit" style="width: 100%; margin-top: 1.25rem;">Submit RFQ to Sales Desk</button>
          
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
      <section class="hero">
        <div class="shell hero-inner">
          <div class="hero-copy">
            <span class="eyebrow">Industrial Materials Catalogue • Delhi Hub</span>
            <h1 class="display">Industrial minerals for demanding applications.</h1>
            <p class="lede">A direct path from material discovery to technical review and qualified B2B procurement enquiries.</p>
            <div class="hero-actions">
              <a class="button" href="${productsUrl}">Explore Products</a>
              <a class="button alt" href="${industriesUrl}">Browse by Industry</a>
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
              <span class="brand-mark" style="width: 24px; height: 24px; font-size: .65rem; margin-right: .3rem;">DM</span>
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
              <a href="${productsUrl}" class="text-link" id="discovery-view-all-link">View all 16 materials in full catalogue →</a>
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
            <a class="text-link" href="${productsUrl}">View all 16 products →</a>
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
            <a href="${industriesUrl}" class="button alt">Explore All 22 Manufacturing Sectors →</a>
            <a href="${productsUrl}" class="text-link">View all catalogue materials →</a>
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
              <h3>Move to an RFQ</h3>
              <p>Make a focused business enquiry with application, quantity, and packaging context for rapid sales desk pricing.</p>
            </article>
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
              <p>Comprehensive 16-mineral product portfolio with packaging and application indices.</p>
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
          <a class="button" href="#rfq">Request a Quote</a>
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
                <strong>Lawrence Road Depot:</strong> C-2/29-C, Lawrence Road Industrial Area, New Delhi - 110035.<br>
                <strong>Direct Sales Line:</strong> <a href="tel:+919811045321" style="color: var(--blue); font-weight: 700;">+91-98110-45321</a><br>
                <strong>GST Number:</strong> 07AAAPM4981C1Z8
              </p>
            </div>
          </div>
          ${rfq()}
        </div>
      </section>
    `;

    bindDiscoveryEngine();
    bindRfq();
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
            <option value="">All 16 Catalogue Materials</option>
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
            <a href="#rfq" class="button alt" style="margin-right: .5rem;">Submit Custom RFQ</a>
            <a href="${productsUrl}" class="button">Explore All 16 Materials</a>
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
          criteriaText = 'All 16 Catalogue Materials';
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

    mainEl.innerHTML = `
      <section class="page-hero">
        <div class="shell">
          <span class="eyebrow">Application-Led Procurement • 22 Manufacturing Sectors</span>
          <h1 class="display">What are you manufacturing?</h1>
          <p class="lede">Discover industrial mineral fillers, extenders, and functional additives mapped to your specific compound formulation and processing requirements.</p>
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

      <!-- 22 Industries Discovery Directory -->
      <section class="catalogue">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Manufacturing Directory</span>
              <h2 class="section-title">22 Industrial Sectors Served</h2>
            </div>
            <a class="text-link" href="${productsUrl}">View all 16 products in catalogue →</a>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
            ${summary.map((item, idx) => `
              <article class="industry-card">
                <div>
                  <span class="category-index">SECTOR / 0${idx + 1}</span>
                  <h3>${esc(item.name)}</h3>
                  <p>
                    ${item.count > 0 
                      ? `<strong>${item.count} material${item.count > 1 ? 's' : ''}</strong> available for formulation in this sector.`
                      : `Custom mineral grades available upon technical consultation.`}
                  </p>
                  
                  ${item.products.length ? `
                    <div style="margin: .75rem 0 1.25rem;">
                      <span style="font: 500 .7rem var(--mono); color: var(--slate); text-transform: uppercase; display: block; margin-bottom: .35rem;">Compatible Materials:</span>
                      <div class="pill-list">
                        ${item.products.map(p => `
                          <a href="${productUrl(p, item.name)}" class="pill" style="font-size: .7rem;">
                            ${esc(p.name)}
                          </a>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>

                <div style="display: flex; gap: .5rem; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--line);">
                  <a href="${productsUrl}?industry=${encodeURIComponent(item.name)}" class="button" style="flex: 1; padding: .6rem; font-size: .72rem;">
                    Filter Materials →
                  </a>
                  <a href="#rfq" class="button alt" style="padding: .6rem .8rem; font-size: .72rem;" onclick="prefillIndustryRfq('${esc(item.name)}')">
                    RFQ
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
              <p><strong>Direct Commercial Desk:</strong> <a href="tel:+919811045321" style="color: var(--blue); font-weight: 700;">+91-98110-45321</a></p>
              <p><strong>Wholesale Dispatch:</strong> C-2/29-C, Lawrence Road Industrial Area, Delhi - 110035.</p>
            </div>
          </div>
          ${rfq(null, { industry: 'Industrial Manufacturing' })}
        </div>
      </section>
    `;

    bindRfq();
  }

  // Global helper for RFQ button click on industry cards
  window.prefillIndustryRfq = function (indName) {
    const rfqSec = document.querySelector('#rfq');
    if (!rfqSec) return;
    const notesInput = rfqSec.querySelector('input[name="notes"]');
    if (notesInput) {
      notesInput.value = `[Manufacturing Sector: ${indName}] `;
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
          <p class="lede">Complete 16-mineral source catalogue. Filter by category, manufacturing industry, or application term to discover the right grade.</p>
        </div>
      </section>

      <section class="catalogue">
        <div class="shell">
          
          <!-- Search Bar -->
          <div class="catalogue-top">
            <span class="result-count"><b id="product-count">${data.products.length}</b> PRODUCTS IN INITIAL CATALOGUE</span>
            <input id="catalogue-search" type="search" placeholder="Search by name, category, or industry (e.g. Talc, PVC, Putty, Rubber)..." aria-label="Search materials">
          </div>

          <!-- Category Filter Bar -->
          <div class="filter-bar" id="category-filter-bar">
            <button type="button" class="filter-btn active" data-cat="all">All Materials</button>
            <button type="button" class="filter-btn" data-cat="Mineral Powders">Mineral Powders</button>
            <button type="button" class="filter-btn" data-cat="Functional Chemicals">Functional Chemicals</button>
            <button type="button" class="filter-btn" data-cat="Industrial Materials">Industrial Materials</button>
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

    const specs = p.specifications || {};
    const specRows = [
      ['Grade', specs.grade || 'Available on request'],
      ['Purity', specs.purity || 'Available on request'],
      ['Mesh Size', specs.mesh || 'Available on request'],
      ['Micron Size', specs.micron || 'Available on request'],
      ['Particle Size', specs.particleSize || 'Available on request'],
      ['Whiteness', specs.whiteness || 'Available on request'],
      ['Moisture Content', specs.moisture || 'Available on request'],
      ['Bulk Density', specs.bulkDensity || 'Available on request']
    ];

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
                <a class="button" href="#rfq">Request a quote</a>
                <a class="button alt" href="https://wa.me/${(data.company.whatsappNumber || '919811045321').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Deepali Minerals, I would like to request commercial pricing and specifications for ${p.name}${industryCtx ? ' for ' + industryCtx + ' application' : (reqText ? ' for requirement: ' + reqText : '')}.`)}" target="_blank" rel="noopener noreferrer">
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
                  <span class="doc-name">Material Safety Data (MSDS / SDS)</span>
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
              <p><strong>Wholesale Dispatch:</strong> From C-2/29-C, Lawrence Road Industrial Area, Delhi - 110035.</p>
              <p><strong>Direct Sales Desk:</strong> <a href="tel:+919811045321" style="color: var(--blue); font-weight: 700;">+91-98110-45321</a></p>
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
        filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
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
          if (activeIndustry !== 'all') parts.push(`Industry: ${activeIndustry}`);
          if (currentSearch) parts.push(`Search: "${currentSearch}"`);
          statusEl.textContent = `Active Filters: ${parts.join(' | ')}`;
        } else {
          statusEl.style.display = 'none';
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
    const catParam = params.get('category');
    const indParam = params.get('industry');

    if (searchParam) {
      currentSearch = searchParam;
      if (searchInput) searchInput.value = searchParam;
    }
    if (catParam) {
      activeCategory = catParam;
      if (categoryBar) {
        categoryBar.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.cat.toLowerCase() === catParam.toLowerCase());
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

    if (searchParam || catParam || indParam) {
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

        const whatsappText = `*Deepali Minerals RFQ Submission*
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
              <h3>RFQ Logged Successfully</h3>
              <p>Reference: <strong style="font-family: var(--mono); color: var(--aqua);">${refId}</strong></p>
              <p>Your requirement for <strong>${esc(productVal)}</strong> has been recorded for review by our Lawrence Road commercial desk. We will respond with pricing and dispatch terms shortly.</p>
              <div>
                <a href="https://wa.me/${(data.company.whatsappNumber || '919811045321').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
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

  // App initialization
  header();
  footer();
  if (page === 'home') home();
  if (page === 'industries') industries();
  if (page === 'products') products();
  if (page === 'product') product();

})();
