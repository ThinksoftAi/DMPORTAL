import React from 'react';
import { 
  Layers, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS, MINERALS_DATA } from '../data/minerals';

interface FooterProps {
  onSelectMineral: (mineralId: string) => void;
  onOpenQuote: () => void;
  onOpenSample: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectMineral,
  onOpenQuote,
  onOpenSample
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top Banner Ribbon */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold font-heading text-white">
              Ready to Optimize Your Industrial Mineral Sourcing?
            </h3>
            <p className="text-slate-400 text-xs">
              Order laboratory testing samples or request proforma factory quotations directly from Delhi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenSample()}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              Request Free Sample (500g)
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-amber-500/15"
            >
              Instant RFQ Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
              <Layers className="w-5 h-5 text-slate-950 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                DEEPALI <span className="text-amber-500">MINERALS</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                Proprietor: {COMPANY_DETAILS.ceo}
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Leading processor, manufacturer, and bulk supplier of non-metallic industrial minerals and functional chemical extenders since 2004. Supplying cosmetic, polymer, paint, rubber, cable, and ceramic manufacturing facilities across India and worldwide.
          </p>

          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{COMPANY_DETAILS.registeredAddress}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{COMPANY_DETAILS.phonePrimary} / {COMPANY_DETAILS.phoneOffice}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{COMPANY_DETAILS.emailSales}</span>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">
            Quick Navigation
          </h4>
          <ul className="space-y-2">
            {[
              { name: 'Mineral Products Catalog', id: 'products' },
              { name: 'Grade & Mesh Finder', id: 'finder' },
              { name: 'Industries Served', id: 'industries' },
              { name: 'Quality Lab & Testing', id: 'quality' },
              { name: 'About Deepali Minerals', id: 'about' },
              { name: 'Commercial Desk Contact', id: 'contact' }
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="hover:text-amber-400 transition-colors text-slate-400 text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Mineral Products */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">
            Core Products
          </h4>
          <ul className="space-y-1.5">
            {MINERALS_DATA.slice(0, 6).map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => {
                    scrollTo('products');
                    onSelectMineral(m.id);
                  }}
                  className="hover:text-amber-400 transition-colors text-slate-400 text-left truncate block max-w-full"
                >
                  {m.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliances & Operations */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">
            Compliance & Units
          </h4>
          <div className="space-y-2 text-slate-400 text-[11px]">
            <div>
              <span className="text-slate-500 block">GST Number:</span>
              <span className="font-mono text-slate-300 font-bold">{COMPANY_DETAILS.gstNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Certification:</span>
              <span className="text-slate-300">ISO 9001:2015 & Asbestos-Free</span>
            </div>
            <div>
              <span className="text-slate-500 block">Mining & Milling Hubs:</span>
              <span className="text-slate-300">Delhi • Rajasthan • Gujarat</span>
            </div>
            <div>
              <span className="text-slate-500 block">Working Hours:</span>
              <span className="text-slate-300">Mon - Sat: 9:00 AM - 7:30 PM IST</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Copyright */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong>Deepali Minerals</strong>. All Rights Reserved. Manufactured and processed in New Delhi, India.
          </p>

          <div className="flex items-center gap-4">
            <span>Proprietor: Mr. Neeraj Monga</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
