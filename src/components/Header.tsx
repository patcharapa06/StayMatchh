import React from 'react';
import { 
  Building2, 
  Dog, 
  Sparkles, 
  Download, 
  Calendar
} from 'lucide-react';

interface HeaderProps {
  selectedProvince: string;
  totalHotelsCount: number;
  onExportReport: () => void;
  onNavigateToMatching?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedProvince,
  totalHotelsCount,
  onExportReport,
  onNavigateToMatching
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#d2af91]/40 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-[#a93f3f] flex items-center justify-center text-white shadow-sm">
              <Dog className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#d2af91]/25 text-[#a93f3f] border border-[#d2af91]/60">
                  StayMatch Analytics
                </span>
                <span className="text-xs text-[#6b5c54] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#a93f3f] animate-pulse"></span>
                  ระบบออนไลน์ (CRISP-DM Mode)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#2b2320] tracking-tight flex items-center gap-2">
                แดชบอร์ดผู้บริหาร: ระบบจับคู่ที่พักและสัตว์เลี้ยง
              </h1>
            </div>
          </div>

          {/* Quick Info & Actions */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {onNavigateToMatching && (
              <button
                onClick={onNavigateToMatching}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d2af91]/30 hover:bg-[#d2af91]/50 text-[#a93f3f] border border-[#d2af91] text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#a93f3f]" />
                <span>🎯 ระบบจับคู่ที่พัก</span>
              </button>
            )}

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#fbf7f4] border border-[#d2af91]/40 text-xs text-[#6b5c54]">
              <Calendar className="w-3.5 h-3.5 text-[#a93f3f]" />
              <span>ไตรมาส Q3 2026</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d2af91]/20 border border-[#d2af91]/60 text-xs font-semibold text-[#2b2320]">
              <Building2 className="w-3.5 h-3.5 text-[#a93f3f]" />
              <span>
                {selectedProvince === 'ทุกจังหวัด' 
                  ? 'ครอบคลุม 77 จังหวัดทั่วไทย' 
                  : `จังหวัด${selectedProvince}`}
              </span>
            </div>

            <button
              onClick={onExportReport}
              id="export-report-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#a93f3f] hover:bg-[#8c3232] active:scale-98 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>พิมพ์รายงานสรุปผู้บริหาร</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
