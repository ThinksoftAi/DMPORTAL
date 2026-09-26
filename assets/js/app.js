(function () {
  const data = window.DeepaliData;
  const root = document.body.dataset.root || '.';
  const page = document.body.dataset.page;
  const esc = (value) => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const productUrl = (product) => `${root}/product.html?product=${encodeURIComponent(product.slug)}`;
  const productsUrl = `${root}/products/`;

  function header() {
    const nav = [
      ['Home', `${root}/`],
      ['Products', productsUrl],
      ['Industries & Applications', `${root}/#industries`],
      ['Technical Resources', `${root}/#resources`],
      ['About Deepali Minerals', `${root}/#why`],
      ['Contact', `${root}/#contact`]
    ];
    const links = nav.map(([label, href]) => `<a href="${href}" class="${page === 'products' && label === 'Products' ? 'active' : ''}">${label}</a>`).join('');
    document.querySelector('#site-header').innerHTML = `<div class="topline"></div><header class="site-header"><div class="shell header-inner"><a class="brand" href="${root}/" aria-label="Deepali Minerals home"><span class="brand-mark">DM</span><span>Deepali<br>Minerals</span></a><nav class="nav-links" aria-label="Primary navigation">${links}</nav><a class="button header-cta" href="${root}/#rfq">Request a Quote</a><button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav">Menu</button></div><nav class="shell mobile-nav" id="mobile-nav" aria-label="Mobile navigation">${links}<a class="button" href="${root}/#rfq">Request a Quote</a></nav></header>`;
    document.querySelector('.menu-toggle').addEventListener('click', e => {
      const menu = document.querySelector('.mobile-nav');
      const open = menu.classList.toggle('open');
      e.currentTarget.setAttribute('aria-expanded', open);
      e.currentTarget.textContent = open ? 'Close' : 'Menu';
    });
  }

  function footer() {
    document.querySelector('#site-footer').innerHTML = `<a class="contact-float" href="${root}/#rfq" aria-label="Open quote request">RFQ</a><footer class="footer" id="contact"><div class="shell footer-grid"><div><a class="brand" href="${root}/"><span class="brand-mark">DM</span><span>Deepali<br>Minerals</span></a><p>${data.company.tagline}</p><p>Business contact details will be published once verified.</p></div><div><h3>Discover</h3><a href="${productsUrl}">Product Catalogue</a><a href="${root}/#industries">Industries & Applications</a><a href="${root}/#resources">Technical Resources</a></div><div><h3>Enquiries</h3><a href="${root}/#rfq">Request a Quote</a><a href="${root}/#contact">Contact Deepali Minerals</a><a href="${root}/#rfq">WhatsApp enquiry — details pending</a></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Deepali Minerals</span><span>Industrial B2B product discovery</span></div></footer>`;
  }

  const productCard = (p) => `<article class="product-card"><div class="product-visual" aria-hidden="true"></div><span class="eyebrow">${esc(p.category)}</span><h3>${esc(p.name)}</h3><p>${esc(p.shortDescription)}</p><a class="text-link" href="${productUrl(p)}">View product <span aria-hidden="true">→</span></a></article>`;

  const rfq = () => `<aside class="rfq-preview" id="rfq"><span class="eyebrow" style="color:var(--aqua)">Business enquiry</span><h2 class="section-title">Start a quote request</h2><p>This initial form collects only a routing request. Contact details and submission handling are pending verification.</p><form data-rfq><label>Product</label><select><option>Select a material</option>${data.products.map(p => `<option>${esc(p.name)}</option>`).join('')}</select><label>Company email</label><input type="email" placeholder="name@company.com" required><button class="button" type="submit">Request quote</button><div class="rfq-feedback">Thank you. Enquiry submission handling will be connected after verified business contact details are supplied.</div></form></aside>`;

  function home() {
    const featured = data.products.slice(0, 6);
    const industries = data.industries.slice(0, 8);
    document.querySelector('#main').innerHTML = `
      <section class="hero">
        <div class="shell hero-inner">
          <div class="hero-copy">
            <span class="eyebrow">Industrial materials catalogue</span>
            <h1 class="display">Industrial minerals for demanding applications.</h1>
            <p class="lede">A clear path from material discovery to technical discussion and qualified business enquiry.</p>
            <div class="hero-actions">
              <a class="button" href="#materials">Explore products</a>
              <a class="button alt" href="#rfq">Request a quote</a>
            </div>
          </div>
          <div class="hero-aside">
            <span class="eyebrow">Designed for procurement</span>
            <p>Explore materials, map applications, then begin a business conversation with the right context.</p>
          </div>
        </div>
      </section>

      <div class="shell material-strip" id="materials">
        <form class="material-search" data-search>
          <label for="material-search">Find Your Material</label>
          <input id="material-search" placeholder="Search the catalogue" autocomplete="off">
          <button class="button" type="submit">Search catalogue</button>
        </form>
      </div>

      <section>
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Explore by material</span>
              <h2 class="section-title">A catalogue built around clearer decisions.</h2>
            </div>
            <a class="text-link" href="${productsUrl}">View all products →</a>
          </div>
          <div class="category-grid">
            ${data.categories.map((c, i) => `
              <article class="category">
                <span class="category-index">0${i + 1}</span>
                <div>
                  <h3>${c.name}</h3>
                  <p>${c.description}</p>
                </div>
                <a href="${productsUrl}" class="text-link">Explore →</a>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="featured">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Initial catalogue</span>
              <h2 class="section-title">Featured materials</h2>
            </div>
            <p class="lede">Product technical data is displayed only where it has been verified. Detailed information is currently available on request.</p>
          </div>
          <div class="product-grid">
            ${featured.map(productCard).join('')}
          </div>
        </div>
      </section>

      <section id="industries">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Application discovery</span>
              <h2 class="section-title">Industries & applications</h2>
            </div>
            <p class="lede">Initial industry source data, organized for future product-to-application relationships.</p>
          </div>
          <div class="industry-grid">
            ${industries.map((name, i) => `
              <article class="industry">
                <span>${String(i + 1).padStart(2, '0')}</span>
                <h3>${esc(name)}</h3>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="why" id="why">
        <div class="shell">
          <span class="eyebrow" style="color:var(--aqua)">The Deepali approach</span>
          <h2 class="section-title">A more useful industrial sourcing conversation.</h2>
          <div class="why-grid" style="margin-top:2.5rem">
            <article class="why-card">
              <b>01 / Discover</b>
              <h3>Start with the material</h3>
              <p>Find the material category and product that matches your enquiry context.</p>
            </article>
            <article class="why-card">
              <b>02 / Clarify</b>
              <h3>Bring technical context</h3>
              <p>Technical fields are reserved for approved data and can be discussed directly.</p>
            </article>
            <article class="why-card">
              <b>03 / Enquire</b>
              <h3>Move to an RFQ</h3>
              <p>Make a focused business enquiry with application and requirement context.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="resources">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">Documentation</span>
              <h2 class="section-title">Technical resources</h2>
            </div>
            <p class="lede">A document framework ready for approved technical material.</p>
          </div>
          <div class="resource-grid">
            ${['Technical Data Sheets', 'Test Reports', 'Product Catalogue'].map((x, i) => `
              <article class="resource">
                <span>RESOURCE / 0${i + 1}</span>
                <h3>${x}</h3>
                <p>Technical document available on request.</p>
                <a href="#rfq" class="text-link">Request information →</a>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="cta">
        <div class="shell cta-inner">
          <div>
            <span class="eyebrow">Ready when you are</span>
            <h2 class="section-title">Need to discuss a material requirement?</h2>
            <p>Send an enquiry with your product, application, quantity, and delivery context.</p>
          </div>
          <a class="button" href="#rfq">Request a quote</a>
        </div>
      </section>

      <section>
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow">Qualified enquiries</span>
            <h2 class="section-title">Bring the requirements that matter.</h2>
            <p class="lede">Product, intended application, grade or specification requirement, quantity and delivery location are the useful starting points.</p>
          </div>
          ${rfq()}
        </div>
      </section>
    `;
    bindSearch();
    bindRfq();
  }

  function products() {
    document.querySelector('#main').innerHTML = `
      <section class="page-hero">
        <div class="shell">
          <span class="eyebrow">Product catalogue</span>
          <h1 class="display">Materials, organized for the next conversation.</h1>
          <p class="lede">An editable initial catalogue. Technical details remain controlled placeholders until source information is approved.</p>
        </div>
      </section>
      <section class="catalogue">
        <div class="shell">
          <div class="catalogue-top">
            <span class="result-count"><b id="product-count">${data.products.length}</b> PRODUCTS IN INITIAL CATALOGUE</span>
            <input id="catalogue-search" type="search" placeholder="Search materials" aria-label="Search materials">
          </div>
          <div class="product-grid" id="catalogue-grid">
            ${data.products.map(productCard).join('')}
          </div>
        </div>
      </section>
    `;
    document.querySelector('#catalogue-search').addEventListener('input', e => renderFiltered(e.target.value));
  }

  function product() {
    const slug = new URLSearchParams(location.search).get('product');
    const p = data.products.find(x => x.slug === slug) || data.products[0];
    document.title = `${p.name} | Deepali Minerals`;
    document.querySelector('#main').innerHTML = `
      <section>
        <div class="shell">
          <div class="breadcrumbs">
            <a href="${root}/">Home</a> / <a href="${productsUrl}">Products</a> / ${esc(p.name)}
          </div>
          <div class="detail-intro">
            <div>
              <span class="detail-meta">${esc(p.category)}</span>
              <h1 class="display" style="margin-top:.6rem">${esc(p.name)}</h1>
              <p class="lede">${esc(p.description)}</p>
              <div class="detail-actions">
                <a class="button" href="#rfq">Request a quote</a>
                <a class="button alt" href="#rfq">WhatsApp enquiry</a>
              </div>
            </div>
            <div class="product-large-visual" role="img" aria-label="Abstract mineral material visual"></div>
          </div>
        </div>
      </section>

      <section class="featured">
        <div class="shell detail-grid">
          <div class="spec-box">
            <span class="eyebrow">Product information</span>
            <h2>Technical details</h2>
            <table class="spec-table">
              <tbody>
                ${[
                  ['Grade', p.specifications.grade],
                  ['Purity', p.specifications.purity],
                  ['Mesh', p.specifications.mesh],
                  ['Micron', p.specifications.micron],
                  ['Particle size', p.specifications.particleSize]
                ].map(([k, v]) => `<tr><td>${k}</td><td>${v || 'Available on request'}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div class="data-note">
            <strong>Controlled information notice</strong><br>
            Technical specifications, applications, packaging, and document links have not been published because approved source data is pending. Please request product information for the required application.
          </div>
        </div>
      </section>

      <section>
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow">Next step</span>
            <h2 class="section-title">Turn this material into a qualified enquiry.</h2>
            <p class="lede">Include intended use, grade/specification context, quantity, packaging requirement, and delivery location.</p>
          </div>
          ${rfq()}
        </div>
      </section>
    `;
    bindRfq();
  }

  function renderFiltered(term) {
    const results = data.products.filter(p => p.name.toLowerCase().includes(term.toLowerCase()));
    document.querySelector('#catalogue-grid').innerHTML = results.length ? results.map(productCard).join('') : `<div class="empty">No catalogue materials match that search.</div>`;
    document.querySelector('#product-count').textContent = results.length;
  }

  function bindSearch() {
    const form = document.querySelector('[data-search]');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        location.href = `${productsUrl}?search=${encodeURIComponent(form.querySelector('input').value)}`;
      });
    }
  }

  function bindRfq() {
    document.querySelectorAll('[data-rfq]').forEach(f => {
      f.addEventListener('submit', e => {
        e.preventDefault();
        const fb = f.querySelector('.rfq-feedback');
        if (fb) {
          fb.style.display = 'block';
        }
      });
    });
  }

  header();
  footer();
  if (page === 'home') home();
  if (page === 'products') products();
  if (page === 'product') product();

  if (page === 'products') {
    const q = new URLSearchParams(location.search).get('search');
    if (q) {
      const searchInput = document.querySelector('#catalogue-search');
      if (searchInput) {
        searchInput.value = q;
        renderFiltered(q);
      }
    }
  }
})();
