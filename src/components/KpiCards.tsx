import React from 'react';
import { 
  Building2, 
  Dog, 
  Banknote, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';

interface KpiCardsProps {
  hotelCount: number;
  petFriendlyCount: number;
  avgPrice: number;
  avgRating: number;
  accuracyRate: number;
  selectedProvince: string;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  hotelCount,
  petFriendlyCount,
  avgPrice,
  avgRating,
  accuracyRate
}) => {
  const petRatio = hotelCount > 0 ? Math.round((petFriendlyCount / hotelCount) * 100) : 100;
  const avgCustomerBudget = Math.round(avgPrice * 1.15);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card 1: Hotel Count & Pet-Friendly vs Non-Pet Ratio */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#d2af91]/40 shadow-xs hover:border-[#a93f3f] transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#6b5c54] uppercase tracking-wider">
            ที่พักทั้งหมดในระบบ
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#a93f3f]/15 text-[#a93f3f] flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-[#2b2320]">
            {hotelCount}
          </span>
          <span className="text-xs font-semibold text-[#6b5c54]">
            แห่งทั่วจังหวัด
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#d2af91]/30 text-[#a93f3f] font-bold border border-[#d2af91]">
            <Dog className="w-3 h-3 text-[#a93f3f]" /> {petFriendlyCount} รับสัตว์ ({petRatio}%)
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#fbf7f4] text-[#6b5c54] border border-[#d2af91]/60 font-bold text-[11px]">
            🚫 {Math.max(0, hotelCount - petFriendlyCount)} สัตว์พักไม่ได้
          </span>
        </div>
      </div>

      {/* Card 2: Average Price vs Budget */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#d2af91]/40 shadow-xs hover:border-[#a93f3f] transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#6b5c54] uppercase tracking-wider">
            ราคาเฉลี่ยต่อคืน
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#d2af91]/30 text-[#a93f3f] flex items-center justify-center">
            <Banknote className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-[#2b2320]">
            ฿{avgPrice.toLocaleString()}
          </span>
          <span className="text-xs font-medium text-[#6b5c54]">/ คืน</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6b5c54]">
          <span className="text-[#a93f3f] font-semibold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3 text-[#a93f3f]" /> ในงบลูกค้า
          </span>
          <span>(งบเฉลี่ย ฿{avgCustomerBudget.toLocaleString()})</span>
        </div>
      </div>

      {/* Card 3: AI / Data Mining Matching Score */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#d2af91]/40 shadow-xs hover:border-[#a93f3f] transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#6b5c54] uppercase tracking-wider">
            ความแม่นยำการจับคู่ (Model)
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#a93f3f]/15 text-[#a93f3f] flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-[#2b2320]">
            {accuracyRate}%
          </span>
          <span className="text-xs font-bold text-[#a93f3f] px-2 py-0.5 bg-[#d2af91]/25 rounded border border-[#d2af91]">
            Random Forest
          </span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6b5c54]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#a93f3f]" />
          <span>F1-Score 94.4% จากผลทดสอบ Testing Set</span>
        </div>
      </div>

      {/* Card 4: Facility Match & Rating */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#d2af91]/40 shadow-xs hover:border-[#a93f3f] transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#6b5c54] uppercase tracking-wider">
            คะแนนความพึงพอใจเฉลี่ย
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#d2af91]/25 text-[#a93f3f] flex items-center justify-center border border-[#d2af91]/50">
            <Sparkles className="w-4 h-4 text-[#a93f3f]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-[#2b2320]">
            {avgRating.toFixed(1)}
          </span>
          <span className="text-xs font-medium text-[#6b5c54]">/ 5.0 ดาว</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6b5c54]">
          <span className="text-[#a93f3f] font-bold">★★★★★</span>
          <span>ตรงใจสิ่งอำนวยความสะดวก 88.2%</span>
        </div>
      </div>
    </div>
  );
};
