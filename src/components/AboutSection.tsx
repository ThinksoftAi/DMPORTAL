import React from 'react';
import { 
  Building2, 
  UserCheck, 
  History, 
  MapPin, 
  Globe2, 
  Truck, 
  CheckCircle2, 
  Award,
  ArrowRight
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/minerals';

interface AboutSectionProps {
  onOpenQuote: () => void;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenQuote,
  onOpenContact
}) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
                Company Profile & Legacy
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
                Two Decades of Excellence in Industrial Minerals
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-normal">
                Founded in <strong>2004</strong> under the leadership of <strong>Mr. Neeraj Monga (CEO)</strong>, <strong>DEEPALI MINERALS</strong> has grown from a specialized mineral trading house in Delhi to a comprehensive manufacturer, processor, and bulk exporter of non-metallic industrial minerals.
              </p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Operating out of our prime headquarters at <strong>C2/29C Lawrence Road, Keshav Puram, Delhi-110035</strong>, we maintain integrated grinding and air-classification facilities across the rich mineral belts of Rajasthan and Gujarat. We process over <strong>50,000 Metric Tons</strong> of mineral powders annually, fulfilling rigorous technical standards for cosmetic formulations, high-impact polymers, architectural coatings, and rubber products.
            </p>

            {/* Quick stats checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Proprietor & CEO: <strong>{COMPANY_DETAILS.ceo}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Established: <strong>{COMPANY_DETAILS.establishedYear} ({COMPANY_DETAILS.experienceYears})</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Annual Turnover: <strong>{COMPANY_DETAILS.turnoverRange}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Annual Volume: <strong>{COMPANY_DETAILS.annualProcessingCapacity}</strong></span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Partner with Deepali Minerals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                <span>View Factory & Office Details</span>
              </button>
            </div>
          </div>

          {/* Right Column Client Trust & Manufacturing Footprint */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Reputable Clients Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Esteemed Industry Clients</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Long-term Partnerships
                </span>
              </div>

              <div className="space-y-2.5">
                {COMPANY_DETAILS.reputableClients.map((client, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100">
                        {client.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {client.industry}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Active Buyer
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                Serving over 500+ commercial manufacturers spanning Northern, Western, and Southern industrial corridors, as well as containerized exports to the Middle East, Southeast Asia, and Africa.
              </p>
            </div>

            {/* Logistics & Locations Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-xs text-slate-300 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Head Office & Central Warehouse:</strong>
                  {COMPANY_DETAILS.registeredAddress}
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800">
                <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Processing Units & Mining Operations:</strong>
                  {COMPANY_DETAILS.worksAddress}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
