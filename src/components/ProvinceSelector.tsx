import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  Globe2, 
  Sparkles,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { ALL_77_PROVINCES, REGIONS_LIST } from '../data/provinces';

interface ProvinceSelectorProps {
  selectedProvince: string;
  onSelectProvince: (province: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  hotelCount: number;
}

export const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({
  selectedProvince,
  onSelectProvince,
  selectedRegion,
  onSelectRegion,
  hotelCount,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Highlight popular provinces
  const popularProvinces = [
    { name: 'ขอนแก่น', label: 'ขอนแก่น (KKU Pilot)', note: 'ข้อมูลต้นแบบในงานวิจัย' },
    { name: 'เชียงใหม่', label: 'เชียงใหม่', note: 'ยอดนิยมภาคเหนือ' },
    { name: 'กรุงเทพมหานคร', label: 'กทม.', note: 'Urban Pet Friendly' },
    { name: 'ชลบุรี', label: 'ชลบุรี/พัทยา', note: 'ชายหาดใกล้กรุง' },
    { name: 'ประจวบคีรีขันธ์', label: 'ประจวบฯ/หัวหิน', note: 'พูลวิลล่าสุนัข' },
    { name: 'นครราชสีมา', label: 'นครราชสีมา/เขาใหญ่', note: 'โอโซนธรรมชาติ' },
    { name: 'ภูเก็ต', label: 'ภูเก็ต', note: 'เกาะทะเลใต้' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#d2af91]/40 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title & Stats */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#d2af91]/25 text-[#a93f3f] flex items-center justify-center border border-[#d2af91]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#6b5c54] uppercase tracking-wider">
              ขอบเขตพื้นที่วิเคราะห์ (Geographic Scope)
            </div>
            <div className="text-lg font-bold text-[#2b2320] flex items-center gap-2">
              <span>{selectedProvince === 'ทุกจังหวัด' ? 'ภาพรวมทั้งประเทศ (ครบ 77 จังหวัด)' : `จังหวัด${selectedProvince}`}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#d2af91]/30 text-[#a93f3f] border border-[#d2af91]">
                {hotelCount} ที่พักในระบบ
              </span>
            </div>
          </div>
        </div>

        {/* Search & Selector controls */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          {/* Quick All button */}
          <button
            id="select-all-provinces-btn"
            onClick={() => {
              onSelectProvince('ทุกจังหวัด');
              onSelectRegion('ทั้งหมด');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedProvince === 'ทุกจังหวัด'
                ? 'bg-[#a93f3f] text-white shadow-2xs'
                : 'bg-[#fbf7f4] text-[#6b5c54] hover:bg-[#d2af91]/25 border border-[#d2af91]/40'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-current" />
            <span>ทุกจังหวัด (77 จังหวัด)</span>
          </button>

          {/* Select Dropdown for all 77 Provinces */}
          <div className="relative min-w-[220px]">
            <div className="relative">
              <select
                id="province-native-select"
                value={selectedProvince}
                onChange={(e) => onSelectProvince(e.target.value)}
                className="w-full appearance-none pl-9 pr-8 py-2 bg-white hover:bg-[#fbf7f4] border border-[#d2af91]/60 rounded-xl text-xs font-semibold text-[#2b2320] focus:outline-none focus:ring-2 focus:ring-[#a93f3f] cursor-pointer transition-colors"
              >
                <option value="ทุกจังหวัด">-- แสดงทุกจังหวัดทั่วประเทศ (77 จังหวัด) --</option>
                {REGIONS_LIST.map((region) => (
                  <optgroup key={region} label={`📍 ${region}`}>
                    {ALL_77_PROVINCES.filter((p) => p.region === region).map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} ({p.nameEn})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-[#a93f3f] absolute left-3 top-2.5 pointer-events-none" />
              <ChevronDown className="w-4 h-4 text-[#a93f3f] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Region Filter Bar */}
      <div className="mt-4 pt-3.5 border-t border-[#d2af91]/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[#6b5c54] font-medium whitespace-nowrap mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-[#a93f3f]" /> ภาค:
          </span>
          <button
            onClick={() => onSelectRegion('ทั้งหมด')}
            className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedRegion === 'ทั้งหมด'
                ? 'bg-[#a93f3f] text-white shadow-2xs'
                : 'bg-[#fbf7f4] text-[#6b5c54] hover:bg-[#d2af91]/25 border border-[#d2af91]/40'
            }`}
          >
            ทั้งหมด (6 ภาค)
          </button>
          {REGIONS_LIST.map((reg) => (
            <button
              key={reg}
              onClick={() => onSelectRegion(reg)}
              className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#a93f3f] text-white shadow-2xs'
                  : 'bg-[#fbf7f4] text-[#6b5c54] hover:bg-[#d2af91]/25 border border-[#d2af91]/40'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Popular Provinces Fast Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[#6b5c54] font-medium whitespace-nowrap mr-1">เมืองยอดฮิต:</span>
          {popularProvinces.map((item) => (
            <button
              key={item.name}
              onClick={() => onSelectProvince(item.name)}
              title={item.note}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold whitespace-nowrap ${
                selectedProvince === item.name
                  ? 'bg-[#d2af91] text-[#2b2320] shadow-2xs border border-[#a93f3f]'
                  : 'bg-[#fbf7f4] text-[#6b5c54] hover:bg-[#d2af91]/30 border border-[#d2af91]/40'
              }`}
            >
              {item.name === 'ขอนแก่น' ? '⭐ ' : ''}{item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
