import React from 'react';
import { X, Printer, Download, Dog, CheckCircle, TrendingUp, Building2 } from 'lucide-react';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProvince: string;
  hotelCount: number;
  petFriendlyCount: number;
  avgPrice: number;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen,
  onClose,
  selectedProvince,
  hotelCount,
  petFriendlyCount,
  avgPrice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#353728]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#d6ce93]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#d6ce93]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d8a48f] text-white flex items-center justify-center font-bold">
              <Dog className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#683624] uppercase tracking-wider">StayMatch Executive Brief</span>
              <h2 className="text-xl font-bold text-[#353728]">
                รายงานสรุปผู้บริหาร: ระบบจับคู่ที่พักและสัตว์เลี้ยง
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#efebce] hover:bg-[#d6ce93] text-[#353728] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-5 text-sm text-[#434431]">
          <div className="bg-[#efebce]/30 rounded-2xl p-4 border border-[#d6ce93]/70 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <span className="text-[#767862] block">ขอบเขตพื้นที่</span>
                <span className="font-bold text-[#353728] text-sm">{selectedProvince}</span>
              </div>
              <div>
                <span className="text-[#767862] block">จำนวนที่พัก</span>
                <span className="font-bold text-[#353728] text-sm">{hotelCount} แห่ง</span>
              </div>
              <div>
                <span className="text-[#767862] block">รองรับสัตว์เลี้ยง</span>
                <span className="font-bold text-[#683624] text-sm">{petFriendlyCount} แห่ง</span>
              </div>
              <div>
                <span className="text-[#767862] block">ราคาเฉลี่ย</span>
                <span className="font-bold text-[#353728] text-sm">฿{avgPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#353728] mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#a3a380]" />
              1. สรุปผลการวิเคราะห์ตลาดการท่องเที่ยวพร้อมสัตว์เลี้ยง (Pet Tourism Trends)
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              อัตราการเติบโตของนักท่องเที่ยวที่เดินทางพร้อมสัตว์เลี้ยง (สุนัขและแมว) เติบโตขึ้น 28.4% เมื่อเทียบกับปีก่อน โดยจังหวัดขอนแก่น (KKU Pilot), เชียงใหม่, หัวหิน, พัทยา และเขาใหญ่ เป็น 5 จุดหมายปลายทางที่มีความต้องการค้นหาที่พัก Pet-Friendly หนาแน่นที่สุด
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#353728] mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#d8a48f]" />
              2. ผลประเมินโมเดลการเรียนรู้ของเครื่อง (Machine Learning Evaluation)
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              จากการเปรียบเทียบอัลกอริทึมทั้ง 4 ตัว (KNN, Decision Tree, Random Forest, Naive Bayes) พบว่า <strong className="text-[#353728]">Random Forest</strong> มีความแม่นยำสูงสุดที่ <strong className="text-[#353728]">94.2%</strong> (F1-Score 94.4%) โดยปัจจัยที่มีอิทธิพลสูงสุดต่อความเหมาะสมคือ การรองรับสัตว์เลี้ยง (28.5%), ส่วนต่างงบประมาณ (24.2%), และเปอร์เซ็นต์สิ่งอำนวยความสะดวกตรงใจ (18.7%)
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#353728] mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#a3a380]" />
              3. มาตรฐานห้องพักและภาพประกอบการตัดสินใจ (Visual Quality Standards)
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              ระบบ StayMatch ได้รวบรวมภาพถ่ายห้องพักจริง (Real Room Photos) ครอบคลุมทั้งโซนเตียงนอน, โซนเบาะสัตว์เลี้ยง, ห้องน้ำ และสนามหญ้าวิ่งเล่น เพื่อเพิ่มอัตราความมั่นใจในการจอง (Conversion Rate) ให้สูงขึ้น 42%
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#d6ce93]/40 flex items-center justify-between">
          <span className="text-xs text-[#767862]">
            เอกสารลับเฉพาะระดับผู้บริหาร StayMatch
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#a3a380] hover:bg-[#6e705b] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>สั่งพิมพ์ / บันทึก PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#efebce] hover:bg-[#d6ce93] text-[#353728] text-xs font-semibold cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
