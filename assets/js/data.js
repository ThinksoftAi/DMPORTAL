/**
 * Deepali Minerals B2B Portal - Centralized Product & Master Data Store
 * Phase 3: Product Catalogue + Technical Material Library + B2B Buyer Experience
 * Strict Technical Governance: Information not verified is marked "Available on request" or "Technical data available on request."
 */

(function () {
  'use strict';

  const company = {
    name: 'DEEPALI MINERALS',
    legalName: 'DEEPALI MINERALS',
    constitution: 'Proprietorship',
    ceo: 'Mr. Neeraj Monga (CEO)',
    tagline: 'Industrial materials, clearly connected.',
    establishedYear: 2004,
    headquarters: 'C2/29C Lawrence Road, Keshav Puram, Delhi-110035',
    phonePrimary: '9810516065',
    phoneSecondary: '9810715129',
    phoneOffice: '9810715129',
    whatsappNumber: '+919810516065',
    emailSales: 'info@deepaliminerals.in',
    emailInquiry: 'info@deepaliminerals.in',
    gstNumber: '07AIMPM0458Q1ZL',
    businessHours: 'Monday – Saturday: 9:00 AM – 7:30 PM IST',
    targetDomain: 'https://deepaliminerals.in'
  };

  const categories = [
    { id: 'mineral-powders', name: 'Mineral Powders', description: 'A focused catalogue of mineral-based materials.' },
    { id: 'functional-chemicals', name: 'Functional Chemicals', description: 'Materials for application-led sourcing conversations.' },
    { id: 'industrial-materials', name: 'Industrial Materials', description: 'Products organized for practical material discovery.' }
  ];

  const industries = [
    'Cosmetics', 'Paints', 'Rubber', 'FRP', 'Pharmaceutical', 'Ayurvedic Medicines',
    'Plastic', 'Master Batch', 'Automobile Paints', 'Putty', 'Soap', 'Footwear',
    'Cables', 'PVC', 'Ceramics', 'Paper', 'Pesticides', 'Detergent',
    'Construction', 'Foundary', 'EVA', 'Biofertilizers'
  ];

  const products = [
    {
      id: 'talc',
      slug: 'talc',
      name: 'Talc',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Natural hydrated magnesium silicate with platey lamellar crystal morphology, high slip, and chemical inertness.',
      description: 'Hydrated magnesium silicate powder processed for industrial fillers, plastic compounding, paints, and cosmetic grades. Sourced and processed at our Lawrence Road, Delhi facility with controlled particle classification.',
      applications: [
        'Cosmetic face powders, body powders, blushes and calamine lotions',
        'Polypropylene (PP), PE and polymer masterbatch compounding',
        'Industrial anti-corrosive primers and architectural finishes',
        'Rubber goods and EVA sheet dusting parting agent',
        'Ceramic vitreous body and wall tile glazes'
      ],
      industries: ['Cosmetics', 'Plastic', 'Master Batch', 'Paints', 'Rubber', 'Paper', 'Ceramics', 'Soap'],
      specifications: {
        grade: 'Cosmetic USP & Industrial Micro grades',
        purity: 'Technical data available on request.',
        mesh: '300 to 1250 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'High whiteness grades available',
        moisture: 'Technical data available on request.',
        bulkDensity: 'Available on request',
        asbestosStatus: 'Negative / Asbestos-Free tested for cosmetic batches'
      },
      packaging: ['25 Kg Bags', '50 Kg PP Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['soap-stone', 'chalk-powder', 'calcium-carbonate'],
      enquiryEnabled: true
    },
    {
      id: 'soap-stone',
      slug: 'soap-stone',
      name: 'Soap Stone',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Steatite talcose mineral powder valued for softness, thermal stability, and electrical insulation properties.',
      description: 'Soapstone / Steatite mineral powder processed for industrial applications requiring high lubricity, thermal endurance, and anti-adhesion characteristics.',
      applications: [
        'Cable sheathing lubricant and parting agent',
        'Foundry refractory mold wash and casting release dusting',
        'Ceramic insulators, spark plug bodies, and porcelain fixtures',
        'Functional filler for domestic cleaners and paints'
      ],
      industries: ['Rubber', 'Foundary', 'Ceramics', 'Paints', 'Cables'],
      specifications: {
        grade: 'Commercial Soapstone Powder',
        purity: 'Technical data available on request.',
        mesh: '200 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: 'Available on request',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg PP Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['talc', 'chalk-powder', 'marble-powder'],
      enquiryEnabled: true
    },
    {
      id: 'chalk-powder',
      slug: 'chalk-powder',
      name: 'Chalk Powder',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Fine soft natural chalk powder used as an anti-tack dusting agent and cost-effective functional extender.',
      description: 'Naturally occurring soft chalk mineral processed into fine particle gradations to prevent tackiness during vulcanization and storage in rubber and polymer processing.',
      applications: [
        'Rubber sheets, tire inner tubes, and molded goods dusting',
        'Power cable cores and wiring parting agent',
        'Extender for primer paints and domestic whitening powders',
        'Filler for school writing chalk and craft materials'
      ],
      industries: ['Rubber', 'Footwear', 'Cables', 'Paints', 'Plastic'],
      specifications: {
        grade: 'French Chalk & Whitening Chalk grades',
        purity: 'Technical data available on request.',
        mesh: '300 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: 'Available on request',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg PP Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'talc', 'marble-powder'],
      enquiryEnabled: true
    },
    {
      id: 'hydrated-lime',
      slug: 'hydrated-lime',
      name: 'Hydrated Lime',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'High available calcium hydroxide Ca(OH)2 powder for chemical synthesis, effluent treatment (ETP), and construction.',
      description: 'Refined calcium hydroxide slaked from high-grade quicklime, offering high chemical reactivity, rapid slaking rate, and alkaline buffering capacity.',
      applications: [
        'Industrial effluent treatment (ETP) and wastewater neutralization',
        'Chemical synthesis, calcium stearate, and calcium soap manufacture',
        'Sugar juice clarification and metallurgical fluxing',
        'Mortars, plasters, and road subgrade stabilization',
        'Agricultural soil amendment and biofertilizer enrichment'
      ],
      industries: ['Construction', 'Paper', 'Detergent', 'Biofertilizers', 'Paints'],
      specifications: {
        grade: 'Chemical & Water Treatment Grade',
        purity: 'Available Ca(OH)2 > 90% (Available on request)',
        mesh: '200 to 400 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: '< 1.5% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Moisture-Resistant Bags', '50 Kg HDPE Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'dolomite-powder'],
      enquiryEnabled: true
    },
    {
      id: 'china-clay',
      slug: 'china-clay',
      name: 'China Clay',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Hydrous aluminum silicate kaolin refined through systematic levigation for ceramic casting, paper, and coatings.',
      description: 'Systematically levigated kaolin clay characterized by fine particle size, high plasticity, chemical inertness, and good dielectric insulation properties.',
      applications: [
        'Sanitaryware, tableware, and ceramic casting slips',
        'Emulsion paints, primers, and protective wall finishes',
        'Reinforcing filler for power cable insulation (XLPE/PVC)',
        'Paper coating and loading filler for sheet opacity',
        'FRP resin composite filler'
      ],
      industries: ['Ceramics', 'Paints', 'Rubber', 'Paper', 'Cables', 'FRP'],
      specifications: {
        grade: 'Levigated & Industrial Grade',
        purity: 'Technical data available on request.',
        mesh: '300 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: 'Technical data available on request.',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg PP Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['kaoline', 'silica', 'talc'],
      enquiryEnabled: true
    },
    {
      id: 'kaoline',
      slug: 'kaoline',
      name: 'Kaoline',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'High-brightness calcined and pharmaceutical kaolin clay refined for opacity, purity, and low abrasion index.',
      description: 'Calcined and micronized kaolin clay processed for strict brightness requirements, titanium dioxide extension in paints, and pharmaceutical formulations.',
      applications: [
        'Pharmaceutical suspensions and excipient carrier',
        'Cosmetic face masks, calamine lotions, and skin protectants',
        'Calcined coating pigment for high-opacity architectural paints',
        'Porcelain bodies, glazes, and refractory ceramics'
      ],
      industries: ['Pharmaceutical', 'Cosmetics', 'Paints', 'Ceramics', 'Paper'],
      specifications: {
        grade: 'Calcined & Pharma/Cosmetic Grade',
        purity: 'Technical data available on request.',
        mesh: '400 to 500 Mesh',
        micron: 'Micro-fine gradations',
        particleSize: 'Available on request',
        whiteness: 'High whiteness grades available',
        moisture: '< 0.5% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['china-clay', 'talc', 'magnesium-carbonate'],
      enquiryEnabled: true
    },
    {
      id: 'marble-powder',
      slug: 'marble-powder',
      name: 'Marble Powder',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Crushed high-whiteness marble mineral powder for wall putty, cultured marble, and decorative cement flooring.',
      description: 'Pure crystalline calcium carbonate derived from selected high-whiteness marble stone, offering high density, weather resistance, and brilliant natural whiteness.',
      applications: [
        'Cement wall putty, skim coats, and exterior texture finishes',
        'Cultured marble casting, vanity tops, and terrazzo flooring',
        'Tile adhesives, joint grouts, and construction chemicals',
        'Bulk filler for fiberglass composite (FRP) resins'
      ],
      industries: ['Construction', 'Putty', 'Paints', 'Ceramics', 'FRP'],
      specifications: {
        grade: 'Super White Marble Powder',
        purity: 'Technical data available on request.',
        mesh: '200 to 400 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'High natural brightness',
        moisture: '< 0.3% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'dolomite-powder', 'quartz-powder'],
      enquiryEnabled: true
    },
    {
      id: 'quartz-powder',
      slug: 'quartz-powder',
      name: 'Quartz Powder',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'High-purity crystalline silicon dioxide powder offering Mohs hardness 7, chemical inertness, and thermal endurance.',
      description: 'Milled quartz rock powder characterized by extreme hardness, low thermal expansion coefficient, and superior electrical resistance across demanding industrial matrices.',
      applications: [
        'Vitrified tile bodies, sanitaryware, and porcelain glazes',
        'Foundry casting mold sands and refractory coatings',
        'Heavy-duty anti-skid epoxy floorings and industrial grouts',
        'Engineered quartz stone slabs and artificial granite'
      ],
      industries: ['Ceramics', 'Foundary', 'Paints', 'Construction', 'FRP'],
      specifications: {
        grade: 'Micronized Optical Quartz',
        purity: 'SiO2 content available on request',
        mesh: '200 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: '< 0.2% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['silica', 'marble-powder', 'china-clay'],
      enquiryEnabled: true
    },
    {
      id: 'calcium-carbonate',
      slug: 'calcium-carbonate',
      name: 'Calcium Carbonate',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Precipitated (PCC), Ground (GCC), and Surface-Coated Calcium Carbonate for rigid PVC, cables, and polymers.',
      description: 'Extensively engineered calcium carbonate powders supporting high filler loadings, impact modification, smooth surface finish, and cost optimization in polymer compounding.',
      applications: [
        'Rigid PVC pipes, conduit fittings, window profiles, and trunking',
        'Polymer masterbatches (PP/PE matrix filler concentrates)',
        'Power cable insulation and wiring sheathing compounds',
        'Architectural emulsion paints, primers, and wall putties',
        'Rubber footwear soles, mats, and conveyor belts'
      ],
      industries: ['Plastic', 'PVC', 'Master Batch', 'Cables', 'Paints', 'Rubber', 'Paper'],
      specifications: {
        grade: 'PCC, GCC & Stearic Coated Grades',
        purity: 'CaCO3 content available on request',
        mesh: '300 to 1250 Mesh',
        micron: 'Superfine micronized options',
        particleSize: 'Available on request',
        whiteness: 'High whiteness up to 98%+',
        moisture: '< 0.3% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Paper/HDPE Bags', '50 Kg PP Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['talc', 'marble-powder', 'dolomite-powder'],
      enquiryEnabled: true
    },
    {
      id: 'redoxide',
      slug: 'redoxide',
      name: 'Redoxide',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'Natural and synthetic iron oxide red pigment (Fe2O3) offering strong tinting power and anti-corrosive protection.',
      description: 'Iron oxide red mineral pigment processed for excellent opacity, weather resistance, UV stability, and rust-inhibitive performance in metal protective coatings.',
      applications: [
        'Anti-corrosive structural steel primers and automotive primers',
        'Coloring cement flooring tiles, paving blocks, and terrazzo',
        'Plastics, masterbatches, and rubber compounding pigment'
      ],
      industries: ['Paints', 'Automobile Paints', 'Construction', 'Ceramics', 'Plastic'],
      specifications: {
        grade: 'Natural Hematite & Synthetic Red Oxide',
        purity: 'Fe2O3 content available on request',
        mesh: '300 to 400 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'N/A (Deep Brick Red)',
        moisture: '< 1.0% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Multiwall Paper Bags', '50 Kg HDPE Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['zinc-oxide', 'calcium-carbonate'],
      enquiryEnabled: true
    },
    {
      id: 'polyester-resin',
      slug: 'polyester-resin',
      name: 'Polyester Resin',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'Unsaturated polyester resins formulated for mineral compounding in composites, FRP laminates, and gelcoats.',
      description: 'Thermosetting polymer resin system tailored for optimal wetting and dispersion with mineral fillers such as quartz, talc, and marble powder in composite manufacturing.',
      applications: [
        'Fiberglass reinforced plastics (FRP) laminates, tanks, and pipes',
        'Automotive body repair fillers and metal puttys',
        'Artificial stone castings, sink vanity tops, and decorative moldings'
      ],
      industries: ['FRP', 'Automobile Paints', 'Construction'],
      specifications: {
        grade: 'General Purpose & Mineral-Filled Resin Grade',
        purity: 'Technical data available on request.',
        mesh: 'N/A (Liquid / Binder Matrix)',
        micron: 'N/A',
        particleSize: 'N/A',
        whiteness: 'N/A',
        moisture: 'N/A',
        bulkDensity: 'Specific gravity available on request'
      },
      packaging: ['35 Kg Carboys', '225 Kg Metal Barrels'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['quartz-powder', 'marble-powder', 'talc'],
      enquiryEnabled: true
    },
    {
      id: 'zinc-oxide',
      slug: 'zinc-oxide',
      name: 'Zinc Oxide',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'High-purity White Seal and Active Rubber Grade Zinc Oxide (ZnO) for vulcanization kinetics and personal care.',
      description: 'Refined zinc oxide produced via pyrometallurgical French process, serving as the essential inorganic activator in elastomer compounding and rubber vulcanization.',
      applications: [
        'Tire, tube, and conveyor belt vulcanization activator',
        'EVA footwear slipper sheets, soles, and molded articles',
        'Cosmetic creams, lotions, barrier ointments, and calamine',
        'Ceramic glazes, frits, and anti-corrosive primers'
      ],
      industries: ['Rubber', 'Footwear', 'EVA', 'Cosmetics', 'Ceramics', 'Paints', 'Pharmaceutical'],
      specifications: {
        grade: 'White Seal & Active Rubber Grade',
        purity: 'ZnO assay available on request',
        mesh: '325 to 500 Mesh',
        micron: 'Micro-fine active surface area',
        particleSize: 'Available on request',
        whiteness: 'High whiteness powder',
        moisture: '< 0.3% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Multiwall Paper Bags with PE liner', '50 Kg HDPE Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['zinc-stearates', 'magnesium-carbonate', 'talc'],
      enquiryEnabled: true
    },
    {
      id: 'zinc-stearates',
      slug: 'zinc-stearates',
      name: 'Zinc Stearates',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'Fine hydrophobic metal soap functioning as an internal lubricant, release agent, and heat stabilizer.',
      description: 'Premium zinc stearate powder synthesized from refined stearic acid, offering low moisture content, high clear-melt clarity, and exceptional polymer dispersion.',
      applications: [
        'Internal and external lubricant for PVC pipes and masterbatches',
        'Sanding sealer additive for wood finishes and lacquers',
        'Anti-tack release dusting agent for rubber compounding'
      ],
      industries: ['Plastic', 'Master Batch', 'PVC', 'Rubber', 'Paints', 'Cosmetics'],
      specifications: {
        grade: 'Polymer & Coating Grade',
        purity: 'Technical data available on request.',
        mesh: '200 to 325 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Snow white powder',
        moisture: '< 1.0% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['20 Kg Paper Bags', '25 Kg Laminated Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['zinc-oxide', 'calcium-carbonate', 'talc'],
      enquiryEnabled: true
    },
    {
      id: 'magnesium-carbonate',
      slug: 'magnesium-carbonate',
      name: 'Magnesium Carbonate',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Basic Magnesium Carbonate in light and heavy grades for translucent rubber reinforcing and cosmetic powders.',
      description: 'Basic Magnesium Carbonate offering ultra-low bulk density, high liquid absorbency, and good reinforcing properties in elastomers and personal care formulations.',
      applications: [
        'Translucent rubber compounds, slipper sheets, and EVA soles',
        'Cosmetic face powders, compacts, and perfumes carrier',
        'Sports, rock-climbing, and gymnastics athletic grip chalk',
        'Thermal pipe insulation compounds'
      ],
      industries: ['Rubber', 'EVA', 'Cosmetics', 'Pharmaceutical', 'Footwear'],
      specifications: {
        grade: 'Light Basic & Heavy Grade',
        purity: 'MgO equivalent available on request',
        mesh: '300 to 400 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Ultra-white powder',
        moisture: '< 1.5% Max',
        bulkDensity: 'Light grade ~ 0.12 - 0.15 g/cm³'
      },
      packaging: ['15 Kg Paper Bags (High volume)', '25 Kg Laminated Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['talc', 'zinc-oxide', 'dolomite-powder'],
      enquiryEnabled: true
    },
    {
      id: 'dolomite-powder',
      slug: 'dolomite-powder',
      name: 'Dolomite Powder',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Double carbonate of calcium and magnesium CaMg(CO3)2 for wall putty, texture paints, and ceramics.',
      description: 'Natural crystalline dolomite mineral powder distinguished by mechanical hardness, chemical buffering action, weatherability, and high bulk density.',
      applications: [
        'Exterior texture paints, architectural coatings, and primers',
        'Cement wall putty, skim coats, and tile adhesives',
        'Ceramic tile glazes and glass batch melting flux',
        'Bulk filler for plastic and rubber formulations'
      ],
      industries: ['Paints', 'Putty', 'Construction', 'Ceramics', 'Plastic', 'Biofertilizers'],
      specifications: {
        grade: 'Superfine & Micronized Dolomite',
        purity: 'CaCO3 & MgCO3 assay available on request',
        mesh: '300 to 1250 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: '94% - 97%',
        moisture: '< 0.3% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg HDPE Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'marble-powder', 'hydrated-lime'],
      enquiryEnabled: true
    },
    {
      id: 'silica',
      slug: 'silica',
      name: 'Silica',
      category: 'Industrial Materials',
      status: 'source-catalogue',
      shortDescription: 'Crystalline silicon dioxide SiO2 powder offering hardness, chemical inertness, and thermal stability.',
      description: 'Refined silica mineral powder derived from vein quartz deposits, engineered for superior electrical resistance, thermal shock endurance, and mechanical durability.',
      applications: [
        'Ceramic glazes, sanitaryware bodies, and porcelain tiles',
        'Heavy-duty epoxy coatings and self-leveling floors',
        'Foundry casting molding sand and refractory washes',
        'Abrasive formulations and electrical cable fillers'
      ],
      industries: ['Ceramics', 'Foundary', 'Paints', 'Construction', 'Cables'],
      specifications: {
        grade: 'Micronized Industrial Silica',
        purity: 'SiO2 content available on request',
        mesh: '200 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: '< 0.2% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['quartz-powder', 'china-clay', 'marble-powder'],
      enquiryEnabled: true
    }
  ];

  window.DeepaliData = {
    company: company,
    categories: categories,
    industries: industries,
    products: products,
    getProductBySlug: function (slug) {
      if (!slug) return null;
      var clean = String(slug).toLowerCase().trim();
      return products.find(function (p) { return p.slug === clean || p.id === clean; }) || null;
    },
    getProductsByCategory: function (catName) {
      if (!catName || catName === 'all' || catName === 'All') return products;
      return products.filter(function (p) { return p.category.toLowerCase() === catName.toLowerCase(); });
    },
    getProductsByIndustry: function (industryName) {
      if (!industryName || industryName === 'all' || industryName === 'All') return products;
      var target = String(industryName).toLowerCase().trim();
      return products.filter(function (p) {
        return p.industries.some(function (ind) { return ind.toLowerCase() === target; });
      });
    },
    searchProducts: function (query) {
      if (!query || String(query).trim() === '') return products;
      var q = String(query).toLowerCase().trim();
      return products.filter(function (p) {
        return p.name.toLowerCase().indexOf(q) !== -1 ||
          p.category.toLowerCase().indexOf(q) !== -1 ||
          p.shortDescription.toLowerCase().indexOf(q) !== -1 ||
          p.applications.some(function (app) { return app.toLowerCase().indexOf(q) !== -1; }) ||
          p.industries.some(function (ind) { return ind.toLowerCase().indexOf(q) !== -1; });
      });
    },
    getRelatedProducts: function (slug, limit) {
      var current = products.find(function (p) { return p.slug === slug || p.id === slug; });
      var count = limit || 3;
      if (!current) return products.slice(0, count);
      var related = [];
      if (current.related && current.related.length) {
        current.related.forEach(function (relSlug) {
          var found = products.find(function (p) { return p.slug === relSlug; });
          if (found && related.indexOf(found) === -1) related.push(found);
        });
      }
      if (related.length < count) {
        var sameCat = products.filter(function (p) { return p.id !== current.id && p.category === current.category && related.indexOf(p) === -1; });
        related = related.concat(sameCat);
      }
      return related.slice(0, count);
    },
    getIndustrySummary: function () {
      return industries.map(function (ind) {
        var matchingProds = products.filter(function (p) {
          return p.industries.some(function (item) { return item.toLowerCase() === ind.toLowerCase(); });
        });
        return {
          name: ind,
          products: matchingProds,
          count: matchingProds.length
        };
      });
    },
    getCommonApplications: function () {
      return [
        { term: 'PVC', label: 'Rigid PVC & Profiles' },
        { term: 'Wall Putty', label: 'Wall Putty & Textures' },
        { term: 'Cosmetic', label: 'Cosmetic Powders' },
        { term: 'Rubber', label: 'Rubber Compounding' },
        { term: 'Ceramic', label: 'Ceramic Glazes & Bodies' },
        { term: 'Cable', label: 'Cable Sheathing & Wires' },
        { term: 'Master Batch', label: 'Polymer Masterbatches' },
        { term: 'Primers', label: 'Anti-corrosive Primers' },
        { term: 'Foundry', label: 'Foundry & Refractory' },
        { term: 'Effluent', label: 'Effluent Treatment (ETP)' }
      ];
    },
    getDiscoveryQuestions: function () {
      return [
        { id: 'material', text: 'What material do you need?' },
        { id: 'manufacturing', text: 'What are you manufacturing?' },
        { id: 'industry', text: 'Which industry are you in?' },
        { id: 'application', text: 'What application is the material for?' },
        { id: 'filler', text: 'Do you need a filler or extender?' },
        { id: 'white', text: 'Do you need a white mineral?' },
        { id: 'micronized', text: 'Do you need a fine/micronized powder?' },
        { id: 'particle', text: 'Do you need a specific particle size?' },
        { id: 'plastics', text: 'Do you need a material for plastics?' },
        { id: 'paints', text: 'Do you need a material for paints/coatings?' },
        { id: 'rubber', text: 'Do you need a material for rubber?' },
        { id: 'cosmetics', text: 'Do you need a material for cosmetics?' },
        { id: 'pharma', text: 'Do you need a material for pharmaceutical applications?' },
        { id: 'pvc', text: 'Do you need a material for PVC?' },
        { id: 'ceramics', text: 'Do you need a material for ceramics?' },
        { id: 'construction', text: 'Do you need a material for construction?' },
        { id: 'paper', text: 'Do you need a material for paper?' },
        { id: 'cables', text: 'Do you need a material for cables?' },
        { id: 'custom', text: 'I have a specific requirement' }
      ];
    },
    searchByRequirement: function (text) {
      if (!text || String(text).trim() === '') return [];
      var clean = String(text).toLowerCase().trim();
      var stopWords = ['i', 'need', 'a', 'an', 'the', 'for', 'in', 'and', 'or', 'of', 'to', 'with', 'looking', 'want', 'require', 'material', 'materials', 'product', 'products'];
      var rawTokens = clean.split(/[^a-z0-9+#.-]+/);
      var tokens = rawTokens.filter(function (t) { return t.length > 1 && stopWords.indexOf(t) === -1; });
      if (!tokens.length) tokens = rawTokens.filter(function (t) { return t.length > 0; });

      var scored = products.map(function (p) {
        var score = 0;
        var matchedTerms = [];
        var nameLower = p.name.toLowerCase();
        var catLower = p.category.toLowerCase();
        var descLower = (p.shortDescription + ' ' + p.description).toLowerCase();
        var appsLower = (p.applications || []).join(' ').toLowerCase();
        var indsLower = (p.industries || []).join(' ').toLowerCase();
        var specsLower = JSON.stringify(p.specifications || {}).toLowerCase();

        // Exact phrase boost
        if (nameLower.indexOf(clean) !== -1) { score += 20; matchedTerms.push(p.name); }
        if (indsLower.indexOf(clean) !== -1) { score += 15; matchedTerms.push('Industry match'); }
        if (appsLower.indexOf(clean) !== -1) { score += 15; matchedTerms.push('Application match'); }

        // Token matches (with stem matching for plurals)
        tokens.forEach(function (token) {
          var stem = token.endsWith('s') && token.length > 3 ? token.slice(0, -1) : token;
          var matchToken = function (target) {
            return target.indexOf(token) !== -1 || (stem && target.indexOf(stem) !== -1);
          };

          if (matchToken(nameLower)) { score += 10; matchedTerms.push(token); }
          else if (matchToken(indsLower)) { score += 7; matchedTerms.push(token); }
          else if (matchToken(appsLower)) { score += 6; matchedTerms.push(token); }
          else if (matchToken(catLower)) { score += 4; matchedTerms.push(token); }
          else if (matchToken(descLower)) { score += 3; matchedTerms.push(token); }
          else if (matchToken(specsLower)) { score += 2; matchedTerms.push(token); }
        });

        // Heuristics for natural language keywords
        if ((clean.indexOf('white') !== -1 || clean.indexOf('bright') !== -1) && (p.specifications.whiteness || '').length > 0 && p.specifications.whiteness !== 'N/A') {
          score += 4; matchedTerms.push('Whiteness');
        }
        if ((clean.indexOf('fine') !== -1 || clean.indexOf('micron') !== -1 || clean.indexOf('mesh') !== -1) && (p.specifications.mesh || '').length > 0 && p.specifications.mesh !== 'N/A') {
          score += 4; matchedTerms.push('Micron/Mesh');
        }
        if ((clean.indexOf('filler') !== -1 || clean.indexOf('extender') !== -1) && (descLower.indexOf('filler') !== -1 || descLower.indexOf('extender') !== -1)) {
          score += 4; matchedTerms.push('Functional filler');
        }

        return {
          product: p,
          score: score,
          matches: matchedTerms.filter(function (val, idx, self) { return self.indexOf(val) === idx; })
        };
      });

      var matches = scored.filter(function (item) { return item.score > 0; });
      matches.sort(function (a, b) { return b.score - a.score; });
      return matches.map(function (item) { return item.product; });
    }
  };

  // Backwards compatibility alias
  window.DEEPALI_DATA = window.DeepaliData;

})();
