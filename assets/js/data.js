/* Content only. Unverified company and technical fields deliberately remain blank. */
window.DeepaliData = {
  company: {
    name: 'Deepali Minerals',
    tagline: 'Industrial materials, clearly connected.',
    phone: '',
    whatsapp: '',
    email: '',
    address: ''
  },
  categories: [
    { name: 'Mineral Powders', description: 'A focused catalogue of mineral-based materials.' },
    { name: 'Functional Chemicals', description: 'Materials for application-led sourcing conversations.' },
    { name: 'Industrial Materials', description: 'Products organized for practical material discovery.' }
  ],
  industries: [
    'Cosmetics', 'Paints', 'Rubber', 'FRP', 'Pharmaceutical', 'Ayurvedic Medicines',
    'Plastic', 'Master Batch', 'Automobile Paints', 'Putty', 'Soap', 'Footwear',
    'Cables', 'PVC', 'Ceramics', 'Paper', 'Pesticides', 'Detergent',
    'Construction', 'Foundary', 'EVA', 'Biofertilizers'
  ],
  products: [
    ['talc', 'Talc', 'Mineral Powders'],
    ['soap-stone', 'Soap Stone', 'Mineral Powders'],
    ['chalk-powder', 'Chalk Powder', 'Mineral Powders'],
    ['hydrated-lime', 'Hydrated Lime', 'Functional Chemicals'],
    ['china-clay', 'China Clay', 'Mineral Powders'],
    ['kaoline', 'Kaoline', 'Mineral Powders'],
    ['marble-powder', 'Marble Powder', 'Mineral Powders'],
    ['quartz-powder', 'Quartz Powder', 'Mineral Powders'],
    ['calcium-carbonate', 'Calcium Carbonate', 'Mineral Powders'],
    ['redoxide', 'Redoxide', 'Functional Chemicals'],
    ['polyester-resin', 'Polyester Resin', 'Functional Chemicals'],
    ['zinc-oxide', 'Zinc Oxide', 'Functional Chemicals'],
    ['zinc-stearates', 'Zinc Stearates', 'Functional Chemicals'],
    ['magnesium-carbonate', 'Magnesium Carbonate', 'Mineral Powders'],
    ['dolomite-powder', 'Dolomite Powder', 'Mineral Powders'],
    ['silica', 'Silica', 'Industrial Materials']
  ].map(([slug, name, category]) => ({
    id: slug,
    slug,
    name,
    category,
    shortDescription: 'Product information is being prepared for technical review.',
    description: 'A controlled product overview will be published once approved source information is available.',
    applications: [],
    industries: [],
    specifications: { purity: '', grade: '', mesh: '', micron: '', particleSize: '' },
    packaging: [],
    images: [],
    documents: { tds: '', testReport: '', certificate: '' },
    enquiryEnabled: true
  }))
};

window.DEEPALI_DATA = window.DeepaliData;
